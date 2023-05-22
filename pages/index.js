import styled from 'styled-components';
import { wrapper, userLogin } from 'redux/store';
import cookies from 'next-cookies';
import Main from 'components/Home/Main';
import Intro from 'components/Home/Intro';
import Flow from 'components/Home/Flow';
import BoxOffice from 'components/Home/BoxOffice';
import Footer from 'components/Home/Footer';
import { userApi } from 'api';
import { handleRedirect } from 'state';
import Head from 'next/head';

const Container = styled.div`
  width: 100vw;
  max-width: 100%;
`;

const Home = () => {
  return (
    <Container>
      <Head>
        <title>영화같은 첫 만남, 장르는 로맨스</title>
        <meta
          name='description'
          content='어색한 첫만남 대신 영화관에서의 첫만남으로 시작하는 로맨틱 소개팅, 영화 데이트 매칭 서비스 <장르는 로맨스>'
        />
        <link rel='canonical' href='https://www.genreisromance.site/' />
        <meta
          name='keywords'
          content='소개팅, 데이트, 영화관 소개팅, 소개팅어플, 영화추천, 직장인 소개팅, 대학생 소개팅'
        />
        <meta property='og:type' content='website' />
        <meta property='og:site_name' content='장르는 로맨스' />
        <meta
          property='og:title'
          content='영화관 소개팅 서비스, 장르는 로맨스'
        />
        <meta
          property='og:description'
          content='어색한 첫만남 대신 영화관에서의 첫만남으로 시작하는 로맨틱 소개팅, 영화 데이트 매칭 서비스 <장르는 로맨스>'
        />
        <meta
          property='og:image'
          content='https://www.genreisromance.site/ogImage.jpg'
        />
        <meta property='og:url' content='https://www.genreisromance.site/' />
      </Head>
      <Main />
      <Intro />
      <Flow />
      <BoxOffice />
      <Footer />
    </Container>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (ctx) => {
  const { user_data } = cookies(ctx);
  const store = ctx.store;

  if (user_data) {
    const { token, user_pk, sex } = user_data;

    if (token && user_pk && sex) {
      store.dispatch(userLogin({ logged: true, token, user_pk, sex }));

      const {
        data: { state, match_cancel, movie_cancel, payment_cancel },
      } = await userApi.getState(token);

      const destination = handleRedirect(
        state,
        match_cancel,
        movie_cancel,
        payment_cancel
      );

      if (ctx.resolvedUrl !== destination) {
        return {
          redirect: {
            destination,
            permanent: false,
          },
        };
      }
    } else {
      store.dispatch(
        userLogin({ logged: false, token: null, user_pk: null, sex: null })
      );
    }
  } else {
    store.dispatch(
      userLogin({ logged: false, token: null, user_pk: null, sex: null })
    );
  }
});

export default Home;
