import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { wrapper, userLogin } from 'redux/store';
import cookies from 'next-cookies';
import Head from 'next/head';
import MyPage from 'components/MyPage';
import { userApi } from 'api';

const Home = ({ token, user_id, name, gender, phoneNum, id }) => {
  const router = useRouter();

  const [check, setCheck] = useState({
    check: false,
    pw: '',
  });

  const [userData, setUserData] = useState({
    user_id,
    name,
    gender,
    phoneNum,
    id,
    updatedPw: '',
    updatedPwRe: '',
    checkUpdatedPw: null,
  });

  const mypageFunc = {
    handlePw: (e) => {
      const pw = e.target.value;
      setCheck({ ...check, pw });
    },

    checkPw: async (e) => {
      e.preventDefault();
      try {
        await userApi.checkPw({ pw: check.pw }, token);
        setCheck({ ...check, check: true });
      } catch {
        alert('비밀번호가 일치하지 않습니다.');
      }
    },

    handleUpdatedPw: (e) => {
      const updatedPw = e.target.value;
      checkUpdatedPw(updatedPw);
    },

    handleUpdatedPwRe: (e) => {
      const updatedPwRe = e.target.value;
      setUserData({
        ...userData,
        updatedPwRe,
      });
    },

    handleSubmit: async (e) => {
      e.preventDefault();
      if (
        userData.updatedPw.length === 0 ||
        userData.checkUpdatedPw !== '사용 가능한 비밀번호입니다.' ||
        userData.updatedPw !== userData.updatedPwRe
      ) {
        alert('비밀번호를 확인해주세요.');
      } else {
        if (confirm('비밀번호를 변경하시겠습니까?')) {
          try {
            await userApi.changePw(
              { user_id: userData.user_id, pw: userData.updatedPw },
              token
            );
            alert('비밀번호가 변경되었습니다.');
            router.push('/mypage');
          } catch {
            alert('Error');
          }
        } else {
          alert('취소되었습니다.');
        }
      }
    },
  };

  const checkUpdatedPw = (updatedPw) => {
    if (updatedPw.length < 8 || updatedPw.length > 20) {
      setUserData({
        ...userData,
        updatedPw,
        checkUpdatedPw: '비밀번호는 8~20 자리를 사용해야 합니다.',
      });
      return false;
    }

    const chk_num = updatedPw.search(/[0-9]/g);
    const chk_eng = updatedPw.search(/[a-z]/gi);

    if (chk_num < 0 || chk_eng < 0) {
      setUserData({
        ...userData,
        updatedPw,
        checkUpdatedPw: '비밀번호는 영문자와 숫자를 혼용하여야 합니다.',
      });
      return false;
    }

    if (/(\w)\1\1\1/.test(updatedPw)) {
      setUserData({
        ...userData,
        updatedPw,
        checkUpdatedPw: '비밀번호에 같은 문자를 4번 이상 사용하실 수 없습니다.',
      });
      return false;
    }

    setUserData({
      ...userData,
      updatedPw,
      checkUpdatedPw: '사용 가능한 비밀번호입니다.',
    });
    return true;
  };

  return (
    <>
      <Head>
        <title>마이페이지 | 장르는로맨스</title>
        <meta name='description' content='장르는 로맨스의 로그인입니다.' />
        <link rel='canonical' href='https://www.genreisromance.site/login' />
      </Head>
      <MyPage {...check} {...userData} {...mypageFunc} />
    </>
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
        data: {
          id: user_id,
          name,
          sex: gender,
          phone_number: phoneNum,
          username: id,
        },
      } = await userApi.getInfo(token);

      return { props: { user_id, token, name, gender, phoneNum, id } };
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
});

export default Home;
