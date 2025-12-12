import dynamic from 'next/dynamic';
export default dynamic(() => import('../../components/AdminNewPostPage'), { ssr: false });
