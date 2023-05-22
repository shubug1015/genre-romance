import { useState, useEffect } from 'react';
import { wrapper, adminLogin } from 'redux/store';
import cookies from 'next-cookies';
import { adminApi } from 'api';
import Users from 'components/Admin/Users/Users';

const Home = () => {
  const [userData, setUserData] = useState({
    data: [],
    loading: true,
  });

  const submitFilter = async (filter) => {
    setUserData({ ...userData, loading: true });

    const filtered =
      filter.firstAge.length === 0 &&
      filter.lastAge.length === 0 &&
      filter.place.length === 0
        ? 'n'
        : 'y';
    try {
      const { data } = await adminApi.getFilteredAllUsers(
        filtered,
        filter.firstAge,
        filter.lastAge,
        filter.place
      );

      setUserData({ ...userData, data, loading: false });
    } catch {
      alert('Error');
    }
  };

  const getData = async () => {
    try {
      const { data } = await adminApi.getAllUsers();
      setUserData({ ...userData, data, loading: false });
    } catch {
      alert('Error');
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return <Users getData={getData} submitFilter={submitFilter} {...userData} />;
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
