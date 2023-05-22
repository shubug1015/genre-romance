import { useState, useEffect } from 'react';
import { wrapper, adminLogin } from 'redux/store';
import cookies from 'next-cookies';
import { adminApi } from 'api';
import MatchUsers from 'components/Admin/MatchUsers/MatchUsers';
import Head from 'next/head';

const Home = () => {
  const [userData, setUserData] = useState({
    male: [],
    female: [],
    checkedMaleId: null,
    checkedFemaleId: null,
    loading: true,
  });

  const matchUsers = async () => {
    if (confirm('매칭을 진행하시겠습니까?')) {
      try {
        const { data } = await adminApi.matchUsers({
          male_id: userData.checkedMaleId,
          female_id: userData.checkedFemaleId,
        });
        if (data === 'already_matched') {
          alert('매칭 이력이 존재하는 회원입니다.');
        } else {
          const {
            data: { male, female },
          } = await adminApi.getUsers();
          setUserData({
            ...userData,
            male,
            female,
            checkedMaleId: null,
            checkedFemaleId: null,
          });
          alert('매칭이 완료 되었습니다.');
        }
      } catch {
        alert('Error');
      }
    } else {
      alert('매칭이 취소되었습니다.');
    }
  };

  const checkMale = (id) => {
    setUserData({ ...userData, checkedMaleId: id });
  };

  const checkFemale = (id) => {
    setUserData({ ...userData, checkedFemaleId: id });
  };

  const rejectUser = async (id) => {
    if (confirm('지원을 취소하시겠습니까?')) {
      await adminApi.rejectUser({ user_id: id });
      alert('지원 취소가 완료되었습니다.');
      try {
        const {
          data: { male, female },
        } = await adminApi.getUsers();
        setUserData({ ...userData, male, female, loading: false });
      } catch {
        alert('Error');
      }
    }
  };

  const submitFilter = async (maleFilter, femaleFilter) => {
    setUserData({ ...userData, loading: true });

    const maleFiltered =
      maleFilter.firstAge.length === 0 &&
      maleFilter.lastAge.length === 0 &&
      maleFilter.place.length === 0
        ? 'n'
        : 'y';
    const femaleFiltered =
      femaleFilter.firstAge.length === 0 &&
      femaleFilter.lastAge.length === 0 &&
      femaleFilter.place.length === 0
        ? 'n'
        : 'y';

    try {
      const {
        data: { male, female },
      } = await adminApi.getFilteredUsers(
        maleFiltered,
        maleFilter.firstAge,
        maleFilter.lastAge,
        maleFilter.place,
        femaleFiltered,
        femaleFilter.firstAge,
        femaleFilter.lastAge,
        femaleFilter.place
      );

      setUserData({ ...userData, male, female, loading: false });
    } catch {
      alert('Error');
    }
  };

  const getData = async () => {
    try {
      const {
        data: { male, female },
      } = await adminApi.getUsers();
      setUserData({ ...userData, male, female, loading: false });
    } catch {
      alert('Error');
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Head>
        <title>회원 매칭 | 관리자</title>
      </Head>
      <MatchUsers
        {...userData}
        checkMale={checkMale}
        checkFemale={checkFemale}
        matchUsers={matchUsers}
        rejectUser={rejectUser}
        submitFilter={submitFilter}
      />
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((ctx) => {
  const { admin_token: token } = cookies(ctx);
  const store = ctx.store;

  if (token && token.length > 0) {
    store.dispatch(adminLogin({ logged: true, token }));
    return { props: { logged: true } };
  } else {
    return {
      redirect: {
        destination: '/admin/login',
        permanent: false,
      },
    };
  }
});

export default Home;
