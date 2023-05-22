import { useState } from 'react';
import styled from 'styled-components';
import Ticket from './Ticket';
import Proof from './Proof';
import Profile from './Profile';
import { AiOutlineDelete } from 'react-icons/ai';
import { adminApi } from 'api';

const Container = styled.div`
  @media only screen and (max-width: 768px) {
    width: 250px;
    height: 180px;
  }
  ${(props) => props.theme.columnCenter}
  box-shadow: 1px 4px 12px 1px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  width: 250px;
  height: 200px;
  margin: 20px 15px;
  font-size: 12px;
  opacity: ${(props) => (props.movieProp ? 0.5 : 1)};
`;

const Icon = styled.div`
  ${(props) => props.theme.flexBetweenCenter};
  align-items: flex-end;
  width: 100%;
  height: 15%;
  padding-right: 10px;
  font-size: 20px;
`;

const Created = styled.div`
  font-size: 12px;
  margin-left: 25px;
  border-bottom: 1px solid #333333;
  padding-bottom: 2px;
`;

const Content = styled.div`
  ${(props) => props.theme.flexCenter}
  width: 100%;
  height: 65%;
`;

const Info = styled.div`
  ${(props) => props.theme.columnCenter}
  width: 50%;
`;

const State = styled.div`
  display: ${(props) => (props.typeProp ? 'block' : 'none')};
  color: ${(props) => props.theme.adminMainColor};
  margin-top: 20px;
  margin-bottom: -5px;
  font-weight: bold;
`;

const InfoDot = styled.div`
  display: ${(props) => (props.typeProp ? 'block' : 'none')};
  background-color: ${(props) => (props.answer ? '#00ed03' : 'red')};
  width: 7px;
  height: 7px;
  border-radius: 50%;
  margin-bottom: 15px;
`;

const Gender = styled.div`
  margin-bottom: 30px;
  opacity: 0.7;
`;

const Name = styled.div`
  cursor: pointer;
  :hover {
    opacity: 0.7;
    transition: opacity 0.3s ease-in-out;
  }
`;

const Btn = styled.div`
  ${(props) => props.theme.flexCenter}
  background-color: ${(props) => props.theme.adminMainColor};
  border-radius: 0 0 10px 10px;
  width: 100%;
  height: 20%;
  color: ${(props) => props.theme.whiteColor};
  cursor: pointer;
  :hover {
    opacity: 0.7;
    transition: opacity 0.3s ease-in-out;
  }
`;

const TableList = ({
  id,
  type,
  maleId,
  maleName,
  maleProfile,
  maleProof,
  maleState,
  malePhoneNum,
  femaleId,
  femaleName,
  femaleProfile,
  femaleProof,
  femaleState,
  femalePhoneNum,
  created,
  movie,
  submitTicket,
  resubmitTicket,
  cancelTicket,
  deleteMatch,
}) => {
  // profile popup
  const [profilePopup, setProfilePopup] = useState({
    type: null,
    state: false,
  });

  const profileData = [
    {
      id: 0,
      title: '#인생.영화는',
      content:
        profilePopup.type === 'male'
          ? maleProfile.best_movie
          : femaleProfile.best_movie,
    },
    {
      id: 1,
      title: '#저란.사람은',
      content:
        profilePopup.type === 'male'
          ? maleProfile.about_me
          : femaleProfile.about_me,
    },
    {
      id: 2,
      title: '#제.이상형은',
      content:
        profilePopup.type === 'male'
          ? maleProfile.ideal_type
          : femaleProfile.ideal_type,
    },
    {
      id: 3,
      title: '#부끄럽지만.제매력은',
      content:
        profilePopup.type === 'male'
          ? maleProfile.my_appeal
          : femaleProfile.my_appeal,
    },
    {
      id: 4,
      title: '#이.영화.어떠세요',
      content:
        profilePopup.type === 'male'
          ? maleProfile.movie_suggest
          : femaleProfile.movie_suggest,
    },
    {
      id: 5,
      title: '#안녕하세요',
      content:
        profilePopup.type === 'male'
          ? maleProfile.greeting
          : femaleProfile.greeting,
    },
  ];

  const openProfile = (type) => setProfilePopup({ type, state: true });

  const closeProfile = () => setProfilePopup({ type: null, state: false });

  const sendReminder = async (phoneNum) => {
    if (confirm('리마인드 메세지를 전송하시겠습니다?')) {
      await adminApi.sendReminder(phoneNum);
      alert('리마인드 메세지가 전송되었습니다.');
    } else {
      alert('전송이 취소되었습니다.');
    }
  };

  // ticket popup
  const [ticketPopup, setTicketPopup] = useState(false);

  const [ticketInfo, setTicketInfo] = useState([
    {
      id: 0,
      previewURL: null,
      image: null,
      seat: '',
    },
    {
      id: 1,
      previewURL: null,
      image: null,
      seat: '',
    },
  ]);

  const getPreTicket = async (maleId, femaleId) => {
    const { data } = await adminApi.getPreTicket(maleId, femaleId);
    setTicketInfo([
      {
        id: 0,
        previewURL: data.male_ticket.ticket,
        image: null,
        seat: data.male_ticket.partner_seat,
      },
      {
        id: 1,
        previewURL: data.female_ticket.ticket,
        image: null,
        seat: data.female_ticket.partner_seat,
      },
    ]);
  };

  const openTicket = () => setTicketPopup(true);

  const closeTicket = () => setTicketPopup(false);

  const handleImage = (e) => {
    const id = e.target.id;
    let reader = new FileReader();
    let file = e.target.files[0];

    if (file) {
      reader.onloadend = () =>
        setTicketInfo(
          ticketInfo.map((t) => ({
            ...t,
            previewURL: `ticket${t.id}` === id ? reader.result : t.previewURL,
            image: `ticket${t.id}` === id ? file : t.image,
          }))
        );
      reader.readAsDataURL(file);
    }
  };

  const handleSeat = (e, id) => {
    const seat = e.target.value;
    setTicketInfo(
      ticketInfo.map((t) => ({
        ...t,
        seat: t.id === id ? seat : t.seat,
      }))
    );
  };

  // proof popup
  const [proofPopup, setProofPopup] = useState(false);

  const openProof = () => setProofPopup(true);

  const closeProof = () => setProofPopup(false);

  return (
    <>
      <Container movieProp={type === '매칭 완료' && !movie}>
        <Icon>
          <Created>매칭 날짜: {created.substring(0, 10)}</Created>
          <AiOutlineDelete
            onClick={() => deleteMatch(id)}
            style={{ cursor: 'pointer' }}
          />
        </Icon>
        <State typeProp={type === '매칭 대기중'}>
          {maleState === 'arrive_proposal_m'
            ? '남자가 제안 수락중'
            : maleState === 'wait_answer_m'
            ? '여자가 제안 수락중'
            : maleState === 'arrive_movie_m'
            ? '남자가 영화제안 수락중'
            : // 여자가 영화제안 수락중 = maleState : wait_movie_m
              '여자가 영화제안 수락중'}
        </State>
        <Content>
          <Info>
            <InfoDot
              typeProp={type === '매칭 대기중'}
              answer={
                maleState === 'wait_answer_m' || maleState === 'wait_movie_m'
              }
            />
            <Gender>남자 이름</Gender>
            <Name onClick={() => openProfile('male')}>{maleName}</Name>
          </Info>
          <Info>
            <InfoDot
              typeProp={type === '매칭 대기중'}
              answer={
                maleState !== 'wait_answer_m' && maleState !== 'wait_movie_m'
              }
            />
            <Gender>여자 이름</Gender>
            <Name onClick={() => openProfile('female')}>{femaleName}</Name>
          </Info>
        </Content>
        {type === '매칭 대기중' && (
          <Btn
            onClick={() =>
              sendReminder(
                maleState === 'wait_answer_m' || maleState === 'wait_movie_m'
                  ? femalePhoneNum
                  : malePhoneNum
              )
            }
          >
            리마인드 메세지
          </Btn>
        )}
        {type === '매칭 완료' && (
          <Btn onClick={() => openTicket()}>티켓 전송</Btn>
        )}
        {type === '티켓 발급 완료' && (
          <Btn
            onClick={() => {
              openTicket();
              getPreTicket(maleId, femaleId);
            }}
          >
            티켓 재전송
          </Btn>
        )}
        {type === '영화 관람 완료' && <Btn onClick={openProof}>정보 확인</Btn>}
      </Container>
      {ticketPopup && (
        <Ticket
          type={type}
          id={id}
          month={movie?.month}
          date={movie?.date}
          place={movie?.place}
          title={movie?.title}
          dayTime={movie?.day_time}
          hour={movie?.hour}
          minute={movie?.minute}
          movie={movie}
          maleId={maleId}
          femaleId={femaleId}
          closeTicket={closeTicket}
          ticketInfo={ticketInfo}
          handleImage={handleImage}
          handleSeat={handleSeat}
          submitTicket={submitTicket}
          resubmitTicket={resubmitTicket}
          cancelTicket={cancelTicket}
        />
      )}
      {proofPopup && (
        <Proof
          month={movie.month}
          date={movie.date}
          place={movie.place}
          title={movie.title}
          dayTime={movie?.day_time}
          hour={movie.hour}
          minute={movie.minute}
          maleProof={maleProof}
          femaleProof={femaleProof}
          closeProof={closeProof}
        />
      )}
      {profilePopup.state && (
        <Profile
          photo={
            profilePopup.type === 'male'
              ? maleProfile.photo
              : femaleProfile.photo
          }
          profileData={profileData}
          closeProfile={closeProfile}
        />
      )}
    </>
  );
};

export default TableList;
