import { useState, useEffect } from 'react';
import { wrapper, adminLogin } from 'redux/store';
import cookies from 'next-cookies';
import { adminApi } from 'api';
import MatchedUsers from 'components/Admin/MatchedUsers/MatchedUsers';
import Head from 'next/head';

const Home = () => {
  const [userData, setUserData] = useState({
    pre: [],
    ready: [],
    ongoing: [],
    fin: [],
    selectedState: {
      type: '매칭 대기중',
      data: [],
    },
    loading: true,
  });

  const [open, setOpen] = useState(false);

  const toggleOpen = () => setOpen(!open);

  const selectState = (type, data) => {
    setUserData({
      ...userData,
      selectedState: {
        type,
        data,
      },
    });
    setOpen(false);
  };

  const submitTicket = async (
    ticketInfo,
    movie,
    maleId,
    femaleId,
    closeTicket
  ) => {
    if (confirm('티켓을 전송하시겠습니까?')) {
      try {
        if (!ticketInfo[0].image || !ticketInfo[1].image) {
          alert('티켓 사진을 업로드해주세요.');
        } else if (!ticketInfo[0].seat || !ticketInfo[1].seat) {
          alert('상대방 좌석을 입력해주세요.');
        } else {
          const maleData = new FormData();
          const femaleData = new FormData();

          maleData.append('movie', JSON.stringify(movie));
          maleData.append('user_id', maleId);
          maleData.append('ticket', ticketInfo[0].image);
          maleData.append('partner_seat', ticketInfo[0].seat);

          femaleData.append('movie', JSON.stringify(movie));
          femaleData.append('user_id', femaleId);
          femaleData.append('ticket', ticketInfo[1].image);
          femaleData.append('partner_seat', ticketInfo[1].seat);

          await adminApi.sendTicket(maleData);
          await adminApi.sendTicket(femaleData);

          const { data } = await adminApi.getMatchedUsers();

          const pre = data.filter((d) => d.state === 'pre');
          const ready = data.filter((d) => d.state === 'ready');
          const ongoing = data.filter((d) => d.state === 'ongoing');
          const fin = data.filter((d) => d.state === 'fin');

          setUserData({
            ...userData,
            pre,
            ready,
            ongoing,
            fin,
            selectedState: {
              type: '매칭 완료',
              data: ready,
            },
          });

          closeTicket();

          alert('티켓이 전송되었습니다.');
        }
      } catch {
        alert('Error');
      }
    } else {
      alert('티켓이 전송이 취소되었습니다.');
    }
  };

  const resubmitTicket = async (ticketInfo, maleId, femaleId, closeTicket) => {
    if (confirm('티켓을 재전송하시겠습니까?')) {
      try {
        if (!ticketInfo[0].image || !ticketInfo[1].image) {
          alert('티켓 사진을 업로드해주세요.');
        } else if (!ticketInfo[0].seat || !ticketInfo[1].seat) {
          alert('상대방 좌석을 입력해주세요.');
        } else {
          const maleData = new FormData();
          const femaleData = new FormData();

          maleData.append('user_id', maleId);
          maleData.append('ticket', ticketInfo[0].image);
          maleData.append('partner_seat', ticketInfo[0].seat);

          femaleData.append('user_id', femaleId);
          femaleData.append('ticket', ticketInfo[1].image);
          femaleData.append('partner_seat', ticketInfo[1].seat);

          await adminApi.resendTicket(maleData);
          await adminApi.resendTicket(femaleData);

          const { data } = await adminApi.getMatchedUsers();

          const pre = data.filter((d) => d.state === 'pre');
          const ready = data.filter((d) => d.state === 'ready');
          const ongoing = data.filter((d) => d.state === 'ongoing');
          const fin = data.filter((d) => d.state === 'fin');

          setUserData({
            ...userData,
            pre,
            ready,
            ongoing,
            fin,
            selectedState: {
              type: '티켓 발급 완료',
              data: ongoing,
            },
          });

          closeTicket();

          alert('티켓이 재전송되었습니다.');
        }
      } catch {
        alert('Error');
      }
    } else {
      alert('티켓이 재전송이 취소되었습니다.');
    }
  };

  const cancelTicket = async (match_id, closeTicket) => {
    if (confirm('매진처리 하시겠습니까?')) {
      try {
        await adminApi.cancelTicket({ match_id });

        const { data } = await adminApi.getMatchedUsers();

        const pre = data.filter((d) => d.state === 'pre');
        const ready = data.filter((d) => d.state === 'ready');
        const ongoing = data.filter((d) => d.state === 'ongoing');
        const fin = data.filter((d) => d.state === 'fin');

        setUserData({
          ...userData,
          pre,
          ready,
          ongoing,
          fin,
          selectedState: {
            type: '매칭 완료',
            data: ready,
          },
        });

        closeTicket();

        alert('매진처리 되었습니다.');
      } catch {
        alert('Error');
      }
    } else {
      alert('매진처리가 취소되었습니다.');
    }
  };

  const deleteMatch = async (match_id) => {
    if (confirm('매칭을 삭제 하시겠습니까?')) {
      try {
        await adminApi.deleteMatch(match_id);

        const { data } = await adminApi.getMatchedUsers();
        const pre = data.filter((d) => d.state === 'pre');
        const ready = data.filter((d) => d.state === 'ready');
        const ongoing = data.filter((d) => d.state === 'ongoing');
        const fin = data.filter((d) => d.state === 'fin');

        setUserData({
          ...userData,
          pre,
          ready,
          ongoing,
          fin,
          selectedState: {
            type: '매칭 완료',
            data: ready,
          },
        });

        alert('매칭이 삭제되었습니다.');
      } catch {
        alert('Error');
      }
    } else {
      alert('매칭 삭제가 취소되었습니다.');
    }
  };

  const getData = async () => {
    try {
      const { data } = await adminApi.getMatchedUsers();
      const pre = data.filter((d) => d.state === 'pre');
      const ready = data.filter((d) => d.state === 'ready');
      const ongoing = data.filter((d) => d.state === 'ongoing');
      const fin = data.filter((d) => d.state === 'fin');
      setUserData({
        ...userData,
        pre,
        ready,
        ongoing,
        fin,
        selectedState: {
          type: '매칭 대기중',
          data: pre,
        },
        loading: false,
      });
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
        <title>매칭 관리 | 관리자</title>
      </Head>
      <MatchedUsers
        {...userData}
        open={open}
        toggleOpen={toggleOpen}
        selectState={selectState}
        submitTicket={submitTicket}
        resubmitTicket={resubmitTicket}
        cancelTicket={cancelTicket}
        deleteMatch={deleteMatch}
      />
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (ctx) => {
  const { admin_token: token } = cookies(ctx);
  const store = ctx.store;

  await adminApi.updateMatch();

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
