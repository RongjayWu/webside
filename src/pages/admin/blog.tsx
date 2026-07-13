import dynamic from 'next/dynamic';
export default dynamic(() => import('../../components/Admin/AdminNewPostPage'), { ssr: false });
