
import React, { useState, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Upload, FileText, Image, Type, Tag, CheckCircle2, Link as LinkIcon, User } from 'lucide-react';
import JoditEditor from 'jodit-react';
import { supabase } from '../supabaseClient';
<<<<<<< HEAD
import { calculators } from '../data/calculators';
=======
>>>>>>> 07dd0a11ae9f46469c2ac6c1ac6bcd9d788fc742

export function UploadBlog() {
  useScrollReveal();
  const navigate = useNavigate();
  const editor = useRef(null);

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState('Loan Calculators');
  const [authorBio, setAuthorBio] = useState('');
  const [isUploading, setIsUploading] = useState(false);

<<<<<<< HEAD
  const categories = [...new Set(calculators.map(c => c.category))];

=======
>>>>>>> 07dd0a11ae9f46469c2ac6c1ac6bcd9d788fc742
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    setSlug(newTitle.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''));
  };
  
  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSlug(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl || !title || !slug || !content || !authorBio) {
      alert('Please fill in all fields: Title, Slug, Image URL, Author Bio, and Content.');
      return;
    }

    setIsUploading(true);

    try {
      const { error } = await supabase
        .from('posts')
        .insert([{ 
            title,
            slug,
            content,
            image_url: imageUrl,
            category,
            author_bio: authorBio,
            excerpt: content.substring(0, 160)
        }]);

      if (error) {
        throw error;
      }

      alert('Blog post published successfully!');
      navigate('/blog');

    } catch (error: any) {
      console.error('Supabase error details:', error);

      const errorMessage = `Error publishing post. Supabase returned an error.\n\nMessage: ${error.message}\n\nDetails: ${error.details}\n\nCode: ${error.code}`;
      alert(errorMessage);

    } finally {
      setIsUploading(false);
    }
  };

  const config = useMemo(
		() => ({
			readonly: false,
			placeholder: 'Start typings...',
      height: '400px',
		}),
		[]
	);

  const inputClass = "block w-full rounded-xl border-0 px-4 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-primary sm:text-sm";

  return (
    <div className="bg-white overflow-hidden">
      {/* Hero */}
      <section className="relative py-16 lg:py-20 overflow-hidden bg-gray-800">
        <div className="relative mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-4 py-1.5 text-sm text-brand-accent font-medium backdrop-blur-sm mb-6">
            <Upload className="h-4 w-4" />
            Admin Panel
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight tracking-tight">
            Upload Blog Post
          </h1>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
            Create and publish new financial articles for the FinovaCalc blog.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <form onSubmit={handleSubmit} className="reveal bg-white rounded-3xl shadow-lg border border-gray-100 p-8 lg:p-12 space-y-8">
            {/* Blog Title */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-2">
                <Type className="h-4 w-4 text-brand-primary" /> Blog Title
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={handleTitleChange}
                className={inputClass}
                placeholder="Enter your blog title"
                disabled={isUploading}
              />
            </div>

            {/* Slug */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-2">
                <FileText className="h-4 w-4 text-brand-primary" /> Slug
              </label>
              <input 
                type="text" 
                required 
                value={slug} 
                onChange={handleSlugChange} 
                className={inputClass}
                placeholder="a-url-friendly-slug"
                disabled={isUploading}
              />
               <p className="mt-2 text-xs text-gray-400">
                💡 Tip: The slug is auto-generated from the title, but you can edit it for a custom URL.
              </p>
            </div>

            {/* Category */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-2">
                <Tag className="h-4 w-4 text-brand-primary" /> Category
              </label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className={inputClass} disabled={isUploading}>
<<<<<<< HEAD
                {categories.map(cat => <option key={cat}>{cat}</option>)}
=======
                <option>Loan Calculators</option>
                <option>Investment & Savings</option>
>>>>>>> 07dd0a11ae9f46469c2ac6c1ac6bcd9d788fc742
              </select>
            </div>

            {/* Author Bio */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-2">
                <User className="h-4 w-4 text-brand-primary" /> Author Bio
              </label>
              <textarea
                required
                value={authorBio}
                onChange={(e) => setAuthorBio(e.target.value)}
                className={inputClass}
                placeholder="Tell us a little about the author"
                disabled={isUploading}
                rows={3}
              />
            </div>

            {/* Image URL Input */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-2">
                <LinkIcon className="h-4 w-4 text-brand-primary" /> Featured Image URL
              </label>
              <input
                type="url"
                required
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className={inputClass}
                placeholder="https://example.com/image.jpg"
                disabled={isUploading}
              />
               {imageUrl && (
                <div className="mt-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Image Preview:</p>
                  <img src={imageUrl} alt="Image Preview" className="rounded-xl border border-gray-200 w-full h-auto max-h-64 object-cover" />
                </div>
              )}
            </div>

            {/* Full Content */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-2">
                <FileText className="h-4 w-4 text-brand-primary" /> Full Content
              </label>
              <JoditEditor
              	ref={editor}
                value={content}
                config={config}
                onBlur={newContent => setContent(newContent)}
                // @ts-ignore
                disabled={isUploading}
              />
              <p className="mt-2 text-xs text-gray-400">
                💡 Tip: The excerpt (short description) will be auto-generated from the first 160 characters of your content.
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-brand-primary px-8 py-4 text-base font-bold text-white shadow-lg hover:bg-brand-dark hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 disabled:bg-gray-400 disabled:shadow-none disabled:translate-y-0"
              disabled={isUploading}
            >
              {isUploading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Publishing...
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-5 w-5" />
                  Publish Blog Post
                </>
              )}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
