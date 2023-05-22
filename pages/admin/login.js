import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { wrapper, adminLogin } from 'redux/store';
import cookies from 'next-cookies';
import Login from 'components/Admin/Login';
import Head from 'next/head';

const Home = () => {
  const [adminData, setAdminData] = useState({
    id: '',
    pw: '',
  });

  const router = useRouter();

  const loginFunc = {
    handleId: (e) => {
      const id = e.target.value;
      setAdminData({
        ...adminData,
        id,
      });
    },

    handlePw: (e) => {
      const pw = e.target.value;
      setAdminData({
        ...adminData,
        pw,
      });
    },

    handleSubmit: async (e) => {
      e.preventDefault();
      try {
        await axios.post('/api/adminLogin', {
          id: adminData.id,
          pw: adminData.pw,
        });
        router.push('/admin');
      } catch {
        alert('아이디 및 비밀번호가 일치하지 않습니다.');
      }
    },
  };

  return (
    <>
      <Head>
        <title>로그인 | 관리자</title>
      </Head>
      <Login {...adminData} {...loginFunc} />
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((ctx) => {
  const { admin_token: token } = cookies(ctx);
  const store = ctx.store;

  if (token && token.length > 0) {
    store.dispatch(adminLogin({ logged: true, token }));
    return {
      redirect: {
        destination: '/admin',
        permanent: false,
      },
    };
  }
});

export default Home;
