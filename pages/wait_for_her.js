import styled from 'styled-components';
import Image from 'next/image';
import { wrapper, userLogin } from 'redux/store';
import cookies from 'next-cookies';
import { handleRedirect } from 'state';
import { userApi } from 'api';
import Head from 'next/head';

const Container = styled.div`
  ${(props) => props.theme.columnCenter};
  justify-content: center;
  width: 100vw;
  height: 100vh;
  max-width: 100%;
  margin-top: -65px;
`;

const LoadingImage = styled.div`
  @media only screen and (min-width: 600px) {
    width: 600px;
    height: 300px;
  }
  position: relative;
  width: 100%;
  height: 180px;
`;

const Text = styled.div`
  font-size: 16px;
  font-weight: 300;
  margin-top: 15px;
  opacity: 0.7;
`;

const SubText = styled.div`
  font-size: 13px;
  font-weight: 300;
  margin-top: 15px;
  opacity: 0.7;
`;

const Wait = () => (
  <Container>
    <Head>
      <title>그녀의 답변을 기다리는 중입니다. | 장르는로맨스</title>
      <meta name='description' content='그녀의 답변을 기다리는 중입니다.' />
      <link
        rel='canonical'
        href='https://www.genreisromance.site/wait_for_her'
      />
    </Head>
    <LoadingImage>
      <Image
        src='/Loader/loading.png'
        alt='Loading Image'
        layout='fill'
        objectFit='cover'
      />
    </LoadingImage>
    <Text>그녀의 답변을 기다리는 중입니다.</Text>
    <SubText>상태 업데이트 시 문자로 안내드리겠습니다.</SubText>
  </Container>
);

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
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }
  } else {
    store.dispatch(
      userLogin({ logged: false, token: null, user_pk: null, sex: null })
    );
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: { token: user_data && user_data.token ? user_data.token : null },
  };
});

export default Wait;
