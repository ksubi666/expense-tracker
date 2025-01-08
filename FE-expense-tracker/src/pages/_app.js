import Layout from '@/components/Layout/Layout';
import '@/styles/globals.css';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const Routes = ['/dashboard', '/records'];
  const isRoutes = Routes.includes(router.pathname);
  useEffect(() => {
    const user = localStorage.getItem('user');

    if (!user) router.push('/sign-in');
  }, []);
  return isRoutes ? (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  ) : (
    <Component {...pageProps} />
  );
}
