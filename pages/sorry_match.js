import styled from 'styled-components';
import Image from 'next/image';
import { useRouter } from 'next/router';
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

const TextSection = styled.div`
  ${(props) => props.theme.flexCenter};
  font-size: 20px;
  margin-bottom: 20px;
`;

const Text = styled.div``;

const Highlighted = styled.div`
  color: ${(props) => props.theme.mainColor};
`;

const Info = styled.div`
  font-size: 14px;
  opacity: 0.6;
  line-height: 1.7;
`;

const CancelBtn = styled.div`
  ${(props) => props.theme.flexCenter};
  width: 150px;
  height: 40px;
  border-radius: 58px;
  box-shadow: 0 2px 12px 0 rgba(255, 57, 131, 0.32);
  background: #ffffff;
  color: #333333;
  font-size: 15px;
  font-weight: 500;
  margin-top: 50px;
  cursor: pointer;
`;

const SorryMatch = ({ token }) => {
  const router = useRouter();

  const cancelMatch = async () => {
    if (confirm('매칭을 취소하시겠습니까?')) {
      await userApi.cancelMatch(token);
      alert('매칭이 취소되었습니다.');
      router.push('/');
    }
  };

  return (
    <Container>
      <Head>
        <title>매칭실패 | 장르는로맨스</title>
        <meta
          name='description'
          content='아쉽게도 매칭이 성사되지 않았습니다.'
        />
        <link
          rel='canonical'
          href='https://www.genreisromance.site/sorry_match'
        />
      </Head>
      <LoadingImage>
        <Image
          src='/sorry.png'
          alt='Loading Image'
          layout='fill'
          objectFit='cover'
        />
      </LoadingImage>
      <TextSection>
        <Highlighted>새로운 로맨스</Highlighted>
        <Text>를 찾고 있습니다.</Text>
      </TextSection>
      <Info>상태 업데이트 시 문자로 안내드리겠습니다.</Info>
      <CancelBtn onClick={cancelMatch}>취소하기</CancelBtn>
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

export default SorryMatch;
