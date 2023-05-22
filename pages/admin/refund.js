import { useState, useEffect } from 'react';
import { wrapper, adminLogin } from 'redux/store';
import cookies from 'next-cookies';
import { adminApi } from 'api';
import Refund from 'components/Admin/Refund/Refund';
import Head from 'next/head';

const Home = () => {
  const [userData, setUserData] = useState({
    data: [],
    checkedList: [],
    loading: true,
  });

  const checkAllUser = (e) =>
    e.target.checked
      ? setUserData({
          ...userData,
          checkedList: userData.data.map((d) => d.id),
        })
      : setUserData({ ...userData, checkedList: [] });

  const checkUser = (e, id) =>
    e.target.checked
      ? setUserData({ ...userData, checkedList: [...userData.checkedList, id] })
      : setUserData({
          ...userData,
          checkedList: userData.checkedList.filter((c) => c !== id),
        });

  const submitRefund = async () => {
    if (confirm('보증금 환급처리를 하시겠습니까?')) {
      try {
        await adminApi.refundUsers({ user_list: userData.checkedList });
        const { data } = await adminApi.getRefundUsers();
        setUserData({ ...userData, data, checkedList: [] });
        alert('보증금 환급처리가 완료되었습니다.');
      } catch {
        alert('Error');
      }
    } else {
      alert('보증금 환급처리가 취소되었습니다.');
    }
  };

  const getData = async () => {
    try {
      const { data } = await adminApi.getRefundUsers();
      setUserData({ ...userData, data, loading: false });
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
        <title>보증금 환급 | 관리자</title>
      </Head>
      <Refund
        {...userData}
        checkAllUser={checkAllUser}
        checkUser={checkUser}
        submitRefund={submitRefund}
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
