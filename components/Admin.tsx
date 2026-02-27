import React, { useState, useEffect } from 'react';
import { Lock, Upload, Image as ImageIcon, X, Check, FileText } from 'lucide-react';
import { translations } from '../constants/translations';

const defaultItems = translations.KR.services.items;

function loadServiceItems(): Record<string, { title: string; desc: string }> {
    try {
        const saved = localStorage.getItem('serviceItems');
        const overrides = saved ? JSON.parse(saved) : {};
        return Object.fromEntries(
            Object.entries(defaultItems).map(([key, item]) => [
                key,
                { title: overrides[key]?.title ?? item.title, desc: overrides[key]?.desc ?? item.desc }
            ])
        );
    } catch {
        return Object.fromEntries(
            Object.entries(defaultItems).map(([key, item]) => [key, { title: item.title, desc: item.desc }])
        );
    }
}

const Admin: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Image Cards Data
    const imageCards = [
        { title: '메인 비주얼', file: 'main_visual.jpg' },
        { title: '원장님 프로필', file: 'director_main.jpg' },
    ];

    // Service Items State
    const [serviceItems, setServiceItems] = useState<Record<string, { title: string; desc: string }>>(loadServiceItems);

    const handleServiceChange = (key: string, field: 'title' | 'desc', value: string) => {
        setServiceItems(prev => ({
            ...prev,
            [key]: { ...prev[key], [field]: value }
        }));
    };

    const saveServiceItems = () => {
        localStorage.setItem('serviceItems', JSON.stringify(serviceItems));
        window.dispatchEvent(new CustomEvent('serviceItemsUpdated'));
        alert('시술 내용이 저장되었습니다!');
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (username === '1' && password === '1') {
            setIsAuthenticated(true);
            setError('');
        } else {
            setError('아이디 또는 비밀번호가 올바르지 않습니다.');
        }
    };

    const handleUpload = async (file: File, targetFileName: string) => {
        const formData = new FormData();
        formData.append('fileName', targetFileName);
        formData.append('image', file);

        try {
            const response = await fetch('http://localhost:3001/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                alert(`${targetFileName} 업로드 성공! 새로고침하면 적용됩니다.`);
            } else {
                alert('업로드 실패');
            }
        } catch (error) {
            alert('서버 오류: npm run server가 실행 중인지 확인하세요.');
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
                <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md relative">
                    <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                        <X size={24} />
                    </button>

                    <div className="text-center mb-8">
                        <div className="mx-auto w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center mb-4">
                            <Lock className="text-violet-400" size={20} />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900">관리자 로그인</h2>
                        <p className="text-gray-500 text-sm mt-2">이미지 관리 시스템에 접속합니다.</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">아이디</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-400 focus:border-transparent outline-none transition-all"
                                placeholder="ID"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">비밀번호</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-400 focus:border-transparent outline-none transition-all"
                                placeholder="Password"
                            />
                        </div>
                        {error && <p className="text-red-500 text-xs text-center">{error}</p>}
                        <button
                            type="submit"
                            className="w-full bg-slate-900 text-white py-3 rounded-lg font-bold hover:bg-slate-800 transition-colors"
                        >
                            로그인
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-50 bg-[#f8fafc] overflow-y-auto">
            {/* Admin Header */}
            <header className="bg-slate-900 text-white shadow-md sticky top-0 z-10">
                <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Lock className="text-violet-400" size={18} />
                        <h1 className="text-lg font-bold">Admin Dashboard</h1>
                    </div>
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-colors"
                    >
                        나가기
                    </button>
                </div>
            </header>

            <main className="container mx-auto px-6 py-12 max-w-6xl">

                {/* 시술 내용 관리 */}
                <div className="mb-12">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <FileText className="text-violet-500" size={22} />
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900">시술 내용 관리</h2>
                                <p className="text-gray-500 text-sm">각 시술의 제목과 설명을 수정할 수 있습니다.</p>
                            </div>
                        </div>
                        <button
                            onClick={saveServiceItems}
                            className="px-6 py-2.5 bg-violet-500 text-white rounded-lg text-sm font-bold hover:bg-violet-600 transition-colors flex items-center gap-2 shadow-lg shadow-violet-500/20"
                        >
                            <Check size={16} />
                            전체 저장
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.entries(serviceItems).map(([key, item]) => (
                            <div key={key} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                <div className="px-5 py-3 bg-gradient-to-r from-violet-50 to-purple-50 border-b border-violet-100 flex items-center gap-2">
                                    <span className="w-6 h-6 rounded-full bg-violet-500 text-white text-[11px] font-bold flex items-center justify-center flex-shrink-0">{key}</span>
                                    <span className="text-xs font-semibold text-violet-700 truncate">{defaultItems[key as keyof typeof defaultItems]?.title}</span>
                                </div>
                                <div className="p-5 space-y-3">
                                    <div>
                                        <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">제목</label>
                                        <input
                                            type="text"
                                            value={item.title}
                                            onChange={(e) => handleServiceChange(key, 'title', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-slate-800 font-medium focus:ring-2 focus:ring-violet-400 focus:border-transparent outline-none transition-all"
                                            placeholder="시술 제목"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">내용 (HTML)</label>
                                        <textarea
                                            value={item.desc}
                                            onChange={(e) => handleServiceChange(key, 'desc', e.target.value)}
                                            rows={10}
                                            className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-xs text-slate-600 focus:ring-2 focus:ring-violet-400 focus:border-transparent outline-none transition-all resize-y leading-relaxed font-mono bg-slate-50"
                                            placeholder={`<h2>시술 소개</h2>\n<p>시술 설명을 입력하세요.</p>\n\n<h2>시술 효과</h2>\n<ul>\n  <li>효과 1</li>\n  <li>효과 2</li>\n</ul>\n\n<h2>자주 묻는 질문</h2>\n<details>\n  <summary>질문을 입력하세요</summary>\n  <div class="answer"><p>답변을 입력하세요</p></div>\n</details>`}
                                        />
                                        <div className="mt-2 flex flex-wrap gap-2">
                                            {[
                                                { tag: '<h2>', label: '제목' },
                                                { tag: '<p>', label: '단락' },
                                                { tag: '<ul><li>', label: '목록' },
                                                { tag: '<strong>', label: '강조' },
                                                { tag: '<details>', label: 'Q&A' },
                                            ].map(({ tag, label }) => (
                                                <span key={tag} className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded font-mono">{tag} <span className="text-slate-400">{label}</span></span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 flex justify-end">
                        <button
                            onClick={saveServiceItems}
                            className="px-8 py-3 bg-violet-500 text-white rounded-lg text-sm font-bold hover:bg-violet-600 transition-colors flex items-center gap-2 shadow-lg shadow-violet-500/20"
                        >
                            <Check size={16} />
                            전체 저장
                        </button>
                    </div>
                </div>

                {/* 이미지 관리 */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-slate-900 mb-1">이미지 관리</h2>
                    <p className="text-gray-500 text-sm mb-6">각 섹션에 표시될 이미지를 업로드하세요. 파일명은 자동으로 변환되어 저장됩니다.</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {imageCards.map((card, index) => (
                            <ImageUploadCard key={index} title={card.title} fileName={card.file} onUpload={handleUpload} />
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

const ImageUploadCard: React.FC<{
    title: string;
    fileName: string;
    onUpload: (file: File, targetFileName: string) => Promise<void>;
}> = ({ title, fileName, onUpload }) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [timestamp, setTimestamp] = useState(Date.now());
    const [imageError, setImageError] = useState(false);

    const currentImageUrl = `/images/${fileName}?t=${timestamp}`;

    useEffect(() => {
        setImageError(false);
    }, [timestamp]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
            setImageError(false);
        }
    };

    const handleUploadClick = async () => {
        if (selectedFile) {
            await onUpload(selectedFile, fileName);
            setTimestamp(Date.now());
            setPreview(null);
            setSelectedFile(null);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                <h3 className="font-bold text-gray-800">{title}</h3>
                <span className="text-xs text-gray-400 font-mono bg-gray-200 px-2 py-0.5 rounded">{fileName}</span>
            </div>

            <div className="p-6 space-y-4">
                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden relative group flex items-center justify-center">
                    {preview ? (
                        <img src={preview} alt={title} className="w-full h-full object-cover" />
                    ) : !imageError ? (
                        <img src={currentImageUrl} alt={title} className="w-full h-full object-cover" onError={() => setImageError(true)} />
                    ) : (
                        <div className="flex flex-col items-center justify-center text-gray-400 gap-2">
                            <ImageIcon size={32} />
                            <span className="text-xs">이미지 없음</span>
                        </div>
                    )}
                    {preview && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-xs">
                            New Preview
                        </div>
                    )}
                </div>

                <div className="space-y-3">
                    <input
                        type="file"
                        accept="image/*"
                        id={`file-${fileName}`}
                        className="hidden"
                        onChange={handleFileChange}
                    />
                    <label
                        htmlFor={`file-${fileName}`}
                        className="w-full flex items-center justify-center gap-2 py-2.5 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 text-sm font-medium hover:border-violet-400 hover:text-violet-600 cursor-pointer transition-colors"
                    >
                        <ImageIcon size={16} />
                        {selectedFile ? selectedFile.name : '이미지 선택'}
                    </label>

                    <button
                        onClick={handleUploadClick}
                        disabled={!selectedFile}
                        className={`w-full py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all ${selectedFile
                            ? 'bg-slate-900 text-white hover:bg-slate-800 shadow-lg shadow-violet-600/10'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            }`}
                    >
                        {selectedFile ? <Upload size={16} /> : <Lock size={16} />}
                        {selectedFile ? '업로드 & 적용' : '파일을 선택하세요'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Admin;
