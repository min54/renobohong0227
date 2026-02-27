import React, { useEffect, useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface BlogPost {
  title: string;
  link: string;
  pubDate: string;
  description: string;
}

const BlogSection: React.FC = () => {
  const { t } = useLanguage();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/api/blog')
      .then(r => r.json())
      .then(data => { setPosts(data.slice(0, 6)); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const formatDate = (str: string) => {
    const d = new Date(str);
    if (isNaN(d.getTime())) return '';
    return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
  };

  return (
    <section className="bg-white py-24">
      <div className="container mx-auto px-6 max-w-6xl">

        {/* 헤더 */}
        <div className="flex items-end justify-between mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-violet-50 border border-violet-100 rounded-full">
              <span className="text-violet-500 text-xs font-semibold tracking-widest uppercase">Naver Blog</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
              {t.blog.title1} <span className="text-violet-500">{t.blog.title2}</span>
            </h2>
          </div>
          <a
            href="https://blog.naver.com/rebelleamie"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 text-sm text-slate-400 hover:text-violet-500 transition-colors font-medium"
          >
            {t.blog.viewAll} <ExternalLink size={14} />
          </a>
        </div>

        {/* 카드 그리드 */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="rounded-2xl border border-slate-100 p-5 animate-pulse space-y-3">
                <div className="h-3 bg-slate-100 rounded w-1/3"></div>
                <div className="h-4 bg-slate-100 rounded w-full"></div>
                <div className="h-4 bg-slate-100 rounded w-3/4"></div>
                <div className="h-3 bg-slate-100 rounded w-full"></div>
                <div className="h-3 bg-slate-100 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <p className="text-center text-slate-400 py-16">{t.blog.error}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {posts.map((post, i) => (
              <a
                key={i}
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-2xl border border-slate-100 hover:border-violet-200 hover:shadow-lg hover:shadow-violet-500/10 transition-all duration-300 p-5 flex flex-col gap-3"
              >
                <p className="text-xs text-slate-400 font-medium">{formatDate(post.pubDate)}</p>
                <h3 className="text-sm font-bold text-slate-800 leading-snug line-clamp-2 group-hover:text-violet-600 transition-colors">
                  {post.title}
                </h3>
                {post.description && (
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-3 mt-auto">
                    {post.description}
                  </p>
                )}
                <div className="flex items-center gap-1 text-xs text-violet-400 font-medium mt-1">
                  <span>{t.blog.readMore}</span>
                  <ExternalLink size={11} />
                </div>
              </a>
            ))}
          </div>
        )}

        {/* 모바일 전체보기 버튼 */}
        <div className="md:hidden mt-8 text-center">
          <a
            href="https://blog.naver.com/rebelleamie"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-violet-200 rounded-full text-sm text-violet-500 font-semibold hover:bg-violet-50 transition-colors"
          >
            {t.blog.viewAll} <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
