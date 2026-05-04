// Fix for "Cannot set property fetch of #<Window> which has only a getter"
if (typeof window !== "undefined") {
  const originalFetch = window.fetch;
  try {
    Object.defineProperty(window, "fetch", {
      configurable: true,
      enumerable: true,
      get() {
        return originalFetch;
      },
      set(newFetch) {
        // Just ignore the assignment to prevent the TypeError
        // Console log if we want to know what's overriding it
        console.warn("Something tried to override window.fetch, ignoring.");
      }
    });
  } catch (e) {
    console.error("Failed to redefine window.fetch", e);
  }
}
