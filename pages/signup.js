import { useState } from 'react';
import { useRouter } from 'next/router';
import { signUpApi } from 'api';
import { wrapper, userLogin } from 'redux/store';
import cookies from 'next-cookies';
import SignUp from 'components/SignUp';
import Head from 'next/head';

const Home = () => {
  const router = useRouter();

  const [signUpData, setSignUpData] = useState({
    name: '',
    gender: 'female',
    place: '',
    age: '',
    id: '',
    pw: '',
    pwRe: '',
    phoneNum: '',
    certification: '',
    checkId: null,
    checkPw: null,
    checkPhoneNum: false,
    checkCertification: null,
  });

  const signUpFunc = {
    handleName: (e) => {
      const name = e.target.value;
      setSignUpData({ ...signUpData, name });
    },

    handleGender: (gender) => {
      setSignUpData({ ...signUpData, gender });
    },

    handlePlace: (place) => {
      setSignUpData({ ...signUpData, place });
    },

    handleAge: (age) => {
      setSignUpData({ ...signUpData, age });
    },

    handleId: async (e) => {
      const id = e.target.value;
      setSignUpData({ ...signUpData, id, checkId: null });
    },

    handlePw: (e) => {
      const pw = e.target.value;
      checkPw(pw);
    },

    handlePwRe: (e) => {
      const pwRe = e.target.value;
      setSignUpData({ ...signUpData, pwRe });
    },

    handlePhoneNum: (e) => {
      const phoneNum = e.target.value;
      setSignUpData({ ...signUpData, phoneNum });
    },

    handleCertification: async (e) => {
      const certification = e.target.value;
      setSignUpData({ ...signUpData, certification, checkCertification: null });
      // checkCertification(certification);
    },

    sendCertification: async (phone_number) => {
      if (phone_number.length > 0) {
        try {
          const { data } = await signUpApi.sendCertification({ phone_number });
          if (data === 'have_account_already') {
            alert('이미 가입된 핸드폰 번호입니다.');
          } else {
            setSignUpData({ ...signUpData, checkPhoneNum: true });
          }
        } catch {
          alert('Error');
        }
      } else {
        alert('핸드폰 번호를 입력해주세요');
      }
    },

    handleSubmit: async () => {
      if (signUpData.name.length === 0) {
        alert('이름을 입력해주세요.');
      } else if (
        signUpData.id.length === 0 ||
        signUpData.checkId !== '사용 가능한 아이디입니다.'
      ) {
        alert('아이디를 확인해주세요.');
      } else if (signUpData.place.length === 0) {
        alert('지역을 선택해주세요.');
      } else if (signUpData.age.length === 0) {
        alert('나이를 선택해주세요.');
      } else if (
        signUpData.pw.length === 0 ||
        signUpData.checkPw !== '사용 가능한 비밀번호입니다.' ||
        signUpData.pw !== signUpData.pwRe
      ) {
        alert('비밀번호를 확인해주세요.');
      }
      // else if (
      //   signUpData.certification.length === 0 ||
      //   signUpData.checkCertification !== '인증되었습니다.'
      // ) {
      //   alert('인증번호를 확인해주세요.');
      // }
      else {
        try {
          await signUpApi.signUp({
            name: signUpData.name,
            sex: signUpData.gender,
            place: signUpData.place,
            age: signUpData.age,
            username: signUpData.id,
            password: signUpData.pw,
            phone_number: signUpData.phoneNum,
          });
          alert('회원가입이 완료되었습니다.');
          router.push('/login');
        } catch {
          alert('Error');
        }
      }
    },

    checkIdFunc: async (id) => {
      try {
        if (id.length < 4 || id.length > 16) {
          setSignUpData({
            ...signUpData,
            id,
            checkId: '아이디는 4~16 자리를 사용해야 합니다.',
          });
          return false;
        }

        const { data } = await signUpApi.checkId({ id });

        if (data === 'used_id') {
          setSignUpData({
            ...signUpData,
            id,
            checkId: '사용중인 아이디입니다.',
          });
          return false;
        }

        setSignUpData({
          ...signUpData,
          id,
          checkId: '사용 가능한 아이디입니다.',
        });
        return true;
      } catch {
        alert('Error');
      }
    },

    checkCertificationFunc: async (certification) => {
      if (signUpData.phoneNum.length > 0 && signUpData.checkPhoneNum) {
        try {
          if (certification.length === 0) {
            setSignUpData({
              ...signUpData,
              certification,
              checkCertification: '인증번호를 입력해주세요.',
            });
            return false;
          }

          const { data } = await signUpApi.checkCertification({
            phone_number: signUpData.phoneNum,
            code: certification.length > 0 ? certification : -1,
          });

          if (data === 'wrong_code') {
            setSignUpData({
              ...signUpData,
              certification,
              checkCertification: '인증번호가 일치하지 않습니다.',
            });
            return false;
          }

          setSignUpData({
            ...signUpData,
            certification,
            checkCertification: '인증되었습니다.',
          });
          return true;
        } catch {
          alert('Error');
        }
      } else {
        alert('핸드폰 인증이 필요합니다.');
      }
    },
  };

  // const checkId = async (id) => {
  //   try {
  //   if (id.length < 4 || id.length > 16) {
  //     setSignUpData({
  //       ...signUpData,
  //       id,
  //       checkId: '아이디는 4~16 자리를 사용해야 합니다.',
  //     });
  //     return false;
  //   }
  //     const { data } = await signUpApi.checkId({ id });
  //     if (data === 'used_id') {
  //       setSignUpData({
  //         ...signUpData,
  //         id,
  //         checkId: '사용중인 아이디입니다.',
  //       });
  //       return false;
  //     }
  //     setSignUpData({
  //       ...signUpData,
  //       id,
  //       checkId: '사용 가능한 아이디입니다.',
  //     });
  //     return true;
  //   } catch {
  //     alert('Error');
  //   }
  // };

  const checkPw = (pw) => {
    if (pw.length < 8 || pw.length > 20) {
      setSignUpData({
        ...signUpData,
        pw,
        checkPw: '비밀번호는 8~20 자리를 사용해야 합니다.',
      });
      return false;
    }

    const chk_num = pw.search(/[0-9]/g);
    const chk_eng = pw.search(/[a-z]/gi);

    if (chk_num < 0 || chk_eng < 0) {
      setSignUpData({
        ...signUpData,
        pw,
        checkPw: '비밀번호는 영문자와 숫자를 혼용하여야 합니다.',
      });
      return false;
    }

    if (/(\w)\1\1\1/.test(pw)) {
      setSignUpData({
        ...signUpData,
        pw,
        checkPw: '비밀번호에 같은 문자를 4번 이상 사용하실 수 없습니다.',
      });
      return false;
    }

    setSignUpData({
      ...signUpData,
      pw,
      checkPw: '사용 가능한 비밀번호입니다.',
    });
    return true;
  };

  // const checkCertification = async (certification) => {
  //   if (signUpData.phoneNum.length > 0 && signUpData.checkPhoneNum) {
  //     try {
  //       if (certification.length === 0) {
  //         setSignUpData({
  //           ...signUpData,
  //           certification,
  //           checkCertification: '인증번호를 입력해주세요.',
  //         });
  //         return false;
  //       }

  //       const { data } = await signUpApi.checkCertification({
  //         phone_number: signUpData.phoneNum,
  //         code: certification.length > 0 ? certification : -1,
  //       });

  //       if (data === 'wrong_code') {
  //         setSignUpData({
  //           ...signUpData,
  //           certification,
  //           checkCertification: '인증번호가 일치하지 않습니다.',
  //         });
  //         return false;
  //       }

  //       setSignUpData({
  //         ...signUpData,
  //         certification,
  //         checkCertification: '인증되었습니다.',
  //       });
  //       return true;
  //     } catch {
  //       alert('Error');
  //     }
  //   } else {
  //     alert('핸드폰 인증이 필요합니다.');
  //   }
  // };

  return (
    <>
      <Head>
        <title>회원가입 | 장르는로맨스</title>
        <meta name="description" content="장르는 로맨스의 회원가입입니다." />
        <link rel="canonical" href="https://www.genreisromance.site/signup" />
      </Head>
      <SignUp {...signUpData} {...signUpFunc} />
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
