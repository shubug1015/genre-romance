import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { wrapper, userLogin } from 'redux/store';
import cookies from 'next-cookies';
import Login from 'components/Login';
import Head from 'next/head';

const Home = () => {
  const router = useRouter();

  const [loginData, setLoginData] = useState({
    id: '',
    pw: '',
  });

  const loginFunc = {
    handleId: (e) => {
      const id = e.target.value;
      setLoginData({
        ...loginData,
        id,
      });
    },
    handlePw: (e) => {
      const pw = e.target.value;
      setLoginData({
        ...loginData,
        pw,
      });
    },
    handleSubmit: async (e) => {
      e.preventDefault();
      try {
        await axios.post('/api/userLogin', {
          id: loginData.id,
          pw: loginData.pw,
        });
        router.push('/');
      } catch {
        alert('아이디 및 비밀번호가 일치하지 않습니다.');
      }
    },
  };

  return (
    <>
      <Head>
        <title>로그인 | 장르는로맨스</title>
        <meta name='description' content='장르는 로맨스의 로그인입니다.' />
        <link rel='canonical' href='https://www.genreisromance.site/login' />
      </Head>
      <Login {...loginData} {...loginFunc} />
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((ctx) => {
  const { user_data } = cookies(ctx);
  const store = ctx.store;

  if (user_data) {
    const { token, user_pk, sex } = user_data;

    if (token && user_pk && sex) {
      store.dispatch(userLogin({ logged: true, token, user_pk, sex }));
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
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
