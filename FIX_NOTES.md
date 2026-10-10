# Refresh fix — ProResumeLab (v2)

Symptom: pehli load pe sab theek, lekin **page refresh ke baad** data load nahi
hota — `/settings` pe "Fetching your documents..." hamesha dikhta rehta hai aur
`/blog` blank aa jaata hai.

## Asli wajah (root cause)

`supabase.auth.onAuthStateChange(...)` ka callback **async** tha aur uske andar
Supabase ke auth/DB methods (`buildUserData`, `getAuthenticatedUser`) await ho
rahe the. Supabase (GoTrueClient) refresh ke waqt apna internal lock pakde rehta
hai; callback ke andar hi Supabase call karne se **deadlock** ho jaata hai.
Result: session restore adhoora reh jaata hai, aur uske baad ki har request
kabhi settle nahi hoti -> UI infinite "Fetching..." pe atka rehta hai.

Pehli load pe ye nahi hota kyunki tab login flow se state set hoti hai; sirf
refresh (INITIAL_SESSION) pe callback chalta hai, is liye bug sirf refresh pe.

## Kya change hua

1. `App.tsx`
   - `onAuthStateChange` callback ko **sync** kar diya; saara async kaam alag
     microtask (`void (async () => {...})()`) me bhej diya. Ye deadlock khatam
     karta hai.
   - Callback ke andar se (no-op) verification auth-call hata diya.

2. `services/supabase.ts`
   - `createClient` me `global.fetch` wrapper add kiya jo **har request pe 15s
     hard timeout** lagata hai. Ab koi request hamesha ke liye hang nahi hogi —
     timeout pe reject hoke page error + Retry dikha dega (infinite spinner
     nahi).
   - `ensureAuthReady()` add (pehle session restore hone tak wait karta hai,
     max ~4s). Ye RLS-protected tables ka "refresh pe empty result" issue bhi
     fix karta hai.
   - `getAuthenticatedUser()` ab `ensureAuthReady()` await karta hai aur optional
     args safely accept karta hai.

3. `services/resumeService.ts`
   - `getResumes`, `getResumeById`, `saveResume`, `deleteResume` — sab
     `ensureAuthReady()` ke baad query karte hain.

4. `services/blogService.ts`
   - Public reads (`getPosts`, `getPostById`, `getRecentPosts`) ab auth pe wait
     **nahi** karte (blog public hai, is liye /blog turant load hoga).
   - `savePost` / `deletePost` (admin) `ensureAuthReady()` ke baad chalte hain.

5. `pages/Builder.tsx`, `pages/Profile.tsx`, `pages/Admin.tsx`
   - Data fetch se pehle `ensureAuthReady()`.

6. `public/_redirects` (naya)
   - `/*  /index.html  200` — Netlify pe kisi bhi route ko refresh karne pe 404
     na aaye (SPA fallback).

## Redeploy

```
npm install
npm run build
netlify deploy --dir=dist --prod --site="f51e4469-d758-46df-93d9-6e7f221bd792"
```

Local test ke liye: `npm run dev` chalao, phir browser me `/settings` aur
`/blog` kholke **Ctrl+Shift+R** (hard refresh) karo — data aana chahiye.
