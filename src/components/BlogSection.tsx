import React, { useState } from "react";
import { 
  BookOpen, 
  Search, 
  Clock, 
  User, 
  Tag, 
  Sparkles, 
  PlusCircle, 
  X, 
  CheckCircle2, 
  ArrowRight, 
  Share2, 
  MessageSquare,
  CalendarCheck
} from "lucide-react";
import { INITIAL_BLOG_POSTS } from "../data/blogData";
import { BlogPost } from "../types";
import { AudioAssistant } from "./AudioAssistant";

interface BlogSectionProps {
  onOpenBooking: (serviceName?: string) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ onOpenBooking }) => {
  const [posts, setPosts] = useState<BlogPost[]>(INITIAL_BLOG_POSTS);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  
  // Modal states
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [postSuccessMessage, setPostSuccessMessage] = useState<string>("");

  // New Post Form State
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState<BlogPost["category"]>("Energy Saving");
  const [newAuthor, setNewAuthor] = useState("");
  const [newTeaser, setNewTeaser] = useState("");
  const [newContent, setNewContent] = useState("");

  const categories = ["All", "Energy Saving", "AC Repair", "Duct & Air Quality", "Buying Guide"];

  const filteredPosts = posts.filter((post) => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.teaser.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim() || !newAuthor.trim()) return;

    const newPost: BlogPost = {
      id: `blog-user-${Date.now()}`,
      title: newTitle,
      slug: newTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      category: newCategory,
      author: newAuthor,
      authorRole: "HVAC Specialist & Contributor",
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      readTime: "3 min read",
      teaser: newTeaser || newContent.slice(0, 120) + "...",
      content: newContent,
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80",
      tags: [newCategory, "Dubai AC", "Maintenance"],
      audioText: `${newTitle}. ${newTeaser || newContent.slice(0, 150)}`,
      featured: false
    };

    setPosts([newPost, ...posts]);
    setPostSuccessMessage("Blog post published successfully!");
    
    // Reset Form
    setNewTitle("");
    setNewTeaser("");
    setNewContent("");
    setNewAuthor("");

    setTimeout(() => {
      setShowCreateModal(false);
      setPostSuccessMessage("");
    }, 1800);
  };

  return (
    <section id="blog" className="py-16 lg:py-24 bg-slate-50 border-t border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-sky-600" /> Dubai HVAC & Cooling Journal
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              AC Maintenance & Energy Saving Blog
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Expert advice, DEWA bill-saving guides, and step-by-step HVAC troubleshooting tips directly from Dubai's top certified cooling engineers.
            </p>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-xs shadow-md transition-all shrink-0 hover:scale-[1.02] active:scale-95"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Publish New Blog Post</span>
          </button>
        </div>

        {/* Filter & Search Toolbar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Categories */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? "bg-slate-900 text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search blog articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-sky-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Blog Posts Bento / Card Grid */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 text-slate-500 text-sm">
            No blog articles found matching your criteria. Try resetting search filters.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className={`bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group ${
                  post.featured ? "md:col-span-2 lg:col-span-2 bg-gradient-to-br from-slate-900 to-sky-950 text-white border-slate-800" : ""
                }`}
              >
                <div>
                  {/* Article Image Container */}
                  <div className="relative h-48 sm:h-56 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-sky-600 text-white shadow-md">
                        {post.category}
                      </span>
                      {post.featured && (
                        <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-orange-500 text-white shadow-md">
                          Featured
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-3">
                    <div className={`flex items-center gap-3 text-[11px] ${post.featured ? "text-slate-300" : "text-slate-500"}`}>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-sky-400" /> {post.readTime}
                      </span>
                      <span>•</span>
                      <span>{post.date}</span>
                    </div>

                    <h3 
                      onClick={() => setActiveArticle(post)}
                      className={`text-lg sm:text-xl font-bold cursor-pointer hover:text-sky-500 transition-colors line-clamp-2 ${
                        post.featured ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {post.title}
                    </h3>

                    <p className={`text-xs sm:text-sm line-clamp-3 leading-relaxed ${
                      post.featured ? "text-slate-300" : "text-slate-600"
                    }`}>
                      {post.teaser}
                    </p>
                  </div>
                </div>

                {/* Footer with Author and Read Button */}
                <div className={`px-6 pb-6 pt-2 flex items-center justify-between border-t ${
                  post.featured ? "border-slate-800" : "border-slate-100"
                }`}>
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-sky-500/20 text-sky-400 border border-sky-400/30 flex items-center justify-center font-bold text-xs shrink-0">
                      <User className="w-4 h-4" />
                    </div>
                    <div>
                      <p className={`text-xs font-bold leading-tight ${post.featured ? "text-white" : "text-slate-900"}`}>
                        {post.author}
                      </p>
                      <p className={`text-[10px] ${post.featured ? "text-slate-400" : "text-slate-500"}`}>
                        {post.authorRole}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveArticle(post)}
                    className="inline-flex items-center gap-1 text-xs font-extrabold text-sky-500 hover:text-sky-400 transition-colors"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>

      {/* ARTICLE READER MODAL */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 relative my-auto animate-in zoom-in-95 duration-200">
            
            {/* Sticky Header with Close Button */}
            <div className="sticky top-0 bg-white/90 backdrop-blur-md px-6 py-4 border-b border-slate-100 flex items-center justify-between z-10">
              <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-sky-100 text-sky-800">
                {activeArticle.category}
              </span>
              <button
                onClick={() => setActiveArticle(null)}
                className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Article Content */}
            <div className="p-6 sm:p-8 space-y-6">
              
              <div className="space-y-3">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                  {activeArticle.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1 border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-sky-600" />
                    <span className="font-bold text-slate-800">{activeArticle.author}</span>
                    <span className="text-slate-400">({activeArticle.authorRole})</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span>{activeArticle.readTime}</span>
                  </div>
                  <span>•</span>
                  <span>{activeArticle.date}</span>
                </div>
              </div>

              {/* Cover Image */}
              <div className="rounded-2xl overflow-hidden h-64 sm:h-80 w-full border border-slate-200">
                <img
                  src={activeArticle.image}
                  alt={activeArticle.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Audio Assistant Voice Reader */}
              <div className="p-4 bg-sky-50 border border-sky-200 rounded-2xl">
                <AudioAssistant
                  variant="full"
                  textToSpeak={activeArticle.audioText || activeArticle.teaser}
                  buttonLabel="Listen to Article with AI Voice"
                />
              </div>

              {/* Article Main Text Body */}
              <div className="prose prose-slate max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-4">
                {activeArticle.content.split('\n\n').map((paragraph, index) => {
                  const trimmed = paragraph.trim();
                  if (trimmed.startsWith('### ')) {
                    return (
                      <h3 key={index} className="text-lg font-bold text-slate-900 pt-2">
                        {trimmed.replace('### ', '')}
                      </h3>
                    );
                  }
                  return <p key={index}>{trimmed}</p>;
                })}
              </div>

              {/* Article Footer CTA */}
              <div className="p-6 bg-slate-900 text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
                <div>
                  <h4 className="font-extrabold text-base text-white">Need Professional AC Service?</h4>
                  <p className="text-xs text-slate-300">Schedule a technician visit to resolve your cooling issues today.</p>
                </div>
                <button
                  onClick={() => {
                    setActiveArticle(null);
                    onOpenBooking("AC Repair Dubai");
                  }}
                  className="px-5 py-3 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs rounded-xl shadow-md shrink-0 flex items-center gap-2"
                >
                  <CalendarCheck className="w-4 h-4" />
                  <span>Book Technician Now</span>
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* CREATE NEW BLOG POST MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative my-auto animate-in zoom-in-95 duration-200">
            
            <button
              onClick={() => setShowCreateModal(false)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-2">
              Publish a New HVAC Blog Post
            </h3>
            <p className="text-xs text-slate-600 mb-6">
              Share cooling tips, AC maintenance advice, or energy-saving guides with Dubai residents.
            </p>

            {postSuccessMessage ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-base">{postSuccessMessage}</h4>
                <p className="text-xs">Your article is now live on the blog menu!</p>
              </div>
            ) : (
              <form onSubmit={handleCreatePost} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Article Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 5 Common Causes of AC Water Leakage in Dubai Homes"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none bg-slate-50"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Category *</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none bg-slate-50"
                    >
                      <option value="Energy Saving">Energy Saving</option>
                      <option value="AC Repair">AC Repair</option>
                      <option value="Duct & Air Quality">Duct & Air Quality</option>
                      <option value="Buying Guide">Buying Guide</option>
                      <option value="Maintenance Tips">Maintenance Tips</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Author Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Eng. Tariq Al-Mansoori"
                      value={newAuthor}
                      onChange={(e) => setNewAuthor(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none bg-slate-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Short Teaser Summary</label>
                  <input
                    type="text"
                    placeholder="Brief 1-2 sentence overview of the article..."
                    value={newTeaser}
                    onChange={(e) => setNewTeaser(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none bg-slate-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Article Content *</label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Write your article content here. Use ### for subheadings..."
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none bg-slate-50"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-xs rounded-xl shadow-md"
                  >
                    Publish Post
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </section>
  );
};
