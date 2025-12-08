import React from "react";
import { useRouter } from 'next/router';
import { useState } from 'react';
import dynamic from 'next/dynamic';
const AdminLoginModal = dynamic(() => import('./AdminLoginModal'), { ssr: false });

export default function Footer() {
  const year = new Date().getFullYear();
  const router = typeof window !== 'undefined' ? require('next/router').useRouter() : null;
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  // CSR 階段判斷是否在管理員模式
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsAdmin(window.location.pathname.startsWith('/admin'));
    }
  }, []);

  // 管理員模式下顯示回首頁，否則顯示 Admin 並觸發登入
  const handleAdminClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAdmin) {
      setShowLogin(true);
    } else {
      router && router.push('/');
    }
  };

  const handleLoginSuccess = () => {
    setShowLogin(false);
    router && router.push('/admin');
  };

  return (
    <footer className="w-full text-center py-4 text-sm text-gray-500 dark:text-gray-400 bg-transparent mt-8 relative z-20">
      <span>
        © {year} 吳榮傑. All rights reserved. |  
        {isAdmin ? (
          <a href="/" className="hover:text-blue-500" style={{textDecoration: 'none'}} onClick={handleAdminClick}> Back to Index</a>
        ) : (
          <a href="/admin" className="hover:text-blue-500" style={{textDecoration: 'none'}} onClick={handleAdminClick}> Admin</a>
        )}
      </span>
      {/* 管理員登入彈窗 */}
      {showLogin && (
        <AdminLoginModal open={showLogin} onClose={() => setShowLogin(false)} onSuccess={handleLoginSuccess} />
      )}
    </footer>
  );
}
