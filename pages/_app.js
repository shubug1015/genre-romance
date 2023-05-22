import { useState, useEffect, useRef } from 'react';
import Router, { useRouter } from 'next/router';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import Theme from 'styles/Theme';
import GlobalStyles from 'styles/GlobalStyles';
import AdminGlobalStyles from 'styles/AdminGlobalStyles';
import { wrapper } from 'redux/store';
import ga from 'ga';
import AdminHeader from 'components/Admin/Header';
import AdminSideBar from 'components/Admin/SideBar';
import Header from 'components/Header';
import Loader from 'components/Loader';
import 'styles/calendar.css';

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const location = router.pathname;

  const admin = location.includes('admin');

  Router.onRouteChangeStart = () =>
    !location.includes('admin') && setLoading(true);

  Router.onRouteChangeComplete = () =>
    !location.includes('admin') && setLoading(false);

  const isMount = useRef(true);
  useEffect(() => {
    if (!location.includes('admin')) {
      if (isMount.current) {
        ga.initGA();
        ga.logPageView(router.asPath);
        isMount.current = false;
      } else {
        ga.logPageView(router.asPath);
      }
    }
  }, [router.asPath]);

  useEffect(() => {
    import('react-facebook-pixel')
      .then((x) => x.default)
      .then((ReactPixel) => {
        ReactPixel.init('726405272030466');
        ReactPixel.pageView();

        router.events.on('routeChangeComplete', () => {
          ReactPixel.pageView();
        });
      });
  }, [router.events]);
  return (
    <>
      <Head>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'
        />
      </Head>
      <ThemeProvider theme={Theme}>
        {admin ? (
          <>
            <AdminGlobalStyles />
            <AdminHeader />
            <AdminSideBar />
          </>
        ) : (
          <>
            <GlobalStyles />
            <Header />
          </>
        )}
        {loading ? <Loader /> : <Component {...pageProps} />}
      </ThemeProvider>
    </>
  );
}

export default wrapper.withRedux(MyApp);
