import styled from 'styled-components';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { wrapper, userLogin } from 'redux/store';
import { userApi } from 'api';
import cookies from 'next-cookies';
import { AiOutlineCheck, AiOutlineInfoCircle } from 'react-icons/ai';
import { handleRedirect } from 'state';
import Head from 'next/head';

const Container = styled.div`
  ${(props) => props.theme.columnCenter};
  width: 100vw;
  max-width: 100%;
`;

const TitleSection = styled.div`
  @media only screen and (min-width: 600px) {
    ${(props) => props.theme.columnCenter};
  }
  ${(props) => props.theme.columnStartCenter};
  width: 100%;
  margin-bottom: 40px;
`;

const Tag = styled.div`
  ${(props) => props.theme.flexCenter};
  width: 79px;
  height: 24px;
  border-radius: 2px;
  background: linear-gradient(134deg, #e25387 8%, #cc217c 108%);
  font-size: 13px;
  margin-bottom: 12px;
`;

const Title = styled.div`
  font-size: 32px;
  line-height: 1.38;
`;

const TextContainer = styled.div`
  ${(props) => props.theme.columnCenter};
  margin: 20px 0;
`;

const TextSection = styled.div`
  ${(props) => props.theme.flexCenter};
  font-size: 14px;
  line-height: 26px;
`;

const Text = styled.div`
  opacity: 0.6;
`;

const HighLighted = styled.span`
  color: ${(props) => props.theme.mainColor};
`;

const TicketContainer = styled.div`
  ${(props) => props.theme.columnCenter};
  width: 100%;
  margin: 20px 0;
`;

const TicketSection = styled.div`
  @media only screen and (min-width: 600px) {
    width: 430px;
    height: 175px;
  }
  position: relative;
  width: 313px;
  height: 120px;
  cursor: pointer;
`;

const TicketTagSection = styled.div`
  @media only screen and (min-width: 600px) {
    width: 170px;
    height: 33px;
    top: 30px;
    right: 20px;
  }
  position: absolute;
  width: 150px;
  height: 17px;
  top: 20px;
  right: 10px;
`;

const TicketTag = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const TicketInfoSection = styled.div`
  @media only screen and (min-width: 600px) {
    top: 70px;
  }
  ${(props) => props.theme.flexCenter};
  position: absolute;
  top: 40px;
  left: 5%;
  width: 90%;
`;

const TicketCheck = styled.div`
  ${(props) => props.theme.flexCenter};
  width: 30px;
  height: 30px;
  border-radius: 50%;
  color: #333333;
  background-color: ${(props) => (props.selectProp ? '#e25387' : 'white')};
  margin-right: 20px;
  margin-left: 10px;
`;

const TicketInfo = styled.div`
  ${(props) => props.theme.columnStartCenter};
  width: calc(100% - 60px);
`;

const TicketTitle = styled.div`
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 15px;
  font-family: 'Cafe24Oneprettynight';
`;

const TicketDetail = styled.div`
  @media only screen and (min-width: 600px) {
    font-size: 14px;
  }
  font-size: 12px;
`;

const InfoText = styled.div`
  @media only screen and (min-width: 600px) {
    width: 400px;
  }
  ${(props) => props.theme.flexStartCenter};
  width: 100%;
  padding: 2px 5px;
  font-size: 14px;
  opacity: 0.7;
`;

const BtnSection = styled.div`
  @media only screen and (min-width: 600px) {
    width: 600px;
    margin-top: 90px;
  }
  ${(props) => props.theme.flexCenter};
  width: 100%;
  margin-top: 45px;
`;

const Btn = styled.div`
  ${(props) => props.theme.flexCenter};
  width: 46%;
  margin: 0 2%;
  height: 55px;
  border-radius: 40px;
  font-size: 18px;
  background: ${(props) =>
    props.btnProp === 'reject'
      ? 'rgba(255, 255, 255, 0.1)'
      : 'linear-gradient(73deg, #f7215d 11%, #c52180 105%)'};
  cursor: pointer;
`;

const ArriveMovieF = ({ token }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [movieOptions, setMovieOptions] = useState(null);

  const router = useRouter();

  const submitMovie = async () => {
    const movie_data = {
      respond: 'yes',
      movie: Object.values(movieOptions)[selectedOption],
    };
    if (selectedOption === null) {
      alert('영화를 선택해주세요.');
    } else {
      if (confirm('수락하시겠습니까?')) {
        await userApi.answerMovie(token, movie_data);
        alert('수락하였습니다.');
        router.push('/');
      }
    }
  };

  const reject = async () => {
    const movie_data = {
      respond: 'no',
    };
    if (confirm('거절하시겠습니까?')) {
      await userApi.answerMovie(token, movie_data);
      alert('거절하였습니다.');
      router.push('/');
    }
  };

  const getMovies = async () => {
    try {
      const { data } = await userApi.getMovieOptions(token);
      setMovieOptions(data);
    } catch {
      alert('Error');
    }
  };

  const handleSelect = (index) => {
    setSelectedOption(index);
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <Container>
      <Head>
        <title>받은 제안 | 장르는로맨스</title>
        <meta
          name="description"
          content="장르는 로맨스의 받은 제안 페이지입니다."
        />
        <link
          rel="canonical"
          href="https://www.genreisromance.site/arrive_movie_f"
        />
      </Head>
      <TitleSection>
        <Tag>그의 제안</Tag>
        <Title>상대가 보낸 티켓 중</Title>
        <Title>선택해주세요!</Title>
      </TitleSection>
      <TextContainer>
        <TextSection>
          <Text>
            상대가 가능한 티켓이 없어
            <HighLighted style={{ marginLeft: '3px' }}>새로운 제안</HighLighted>
            을 보내왔습니다.
          </Text>
        </TextSection>
        <TextSection>
          <Text>가능한 일정이 없을 경우 다음에 보기를 선택해주세요.</Text>
        </TextSection>
      </TextContainer>
      <TicketContainer>
        {movieOptions &&
          Object.values(movieOptions)?.map((m, index) => (
            <TicketSection key={index} onClick={() => handleSelect(index)}>
              <Image
                src={
                  index === selectedOption
                    ? '/ArriveMovieM/ticket_colored.png'
                    : '/ArriveMovieM/ticket.png'
                }
                alt="장르는 로맨스 제안 티켓"
                layout="fill"
                objectFit="cover"
              />
              <TicketTagSection>
                <TicketTag>
                  <Image
                    src={'/ArriveMovieM/ticket_tag.png'}
                    alt="장르는 로맨스 제안 티켓"
                    layout="fill"
                    objectFit="cover"
                  />
                </TicketTag>
              </TicketTagSection>
              <TicketInfoSection>
                <TicketCheck selectProp={index === selectedOption}>
                  <AiOutlineCheck size={18} />
                </TicketCheck>
                <TicketInfo>
                  <TicketTitle>
                    {index + 1}. {m.title}
                  </TicketTitle>
                  <TicketDetail>
                    {m.place} / {m.month}월 {m.date}일 /{' '}
                    {m.day_time === 'over' ? '오후' : '오전'} {m.hour}시{' '}
                    {m.minute}분
                  </TicketDetail>
                </TicketInfo>
              </TicketInfoSection>
            </TicketSection>
          ))}
      </TicketContainer>
      <InfoText>
        <AiOutlineInfoCircle size={16} style={{ marginRight: '5px' }} />
        다음에 보기를 선택할 경우 이후 매칭 시 시간이
      </InfoText>
      <InfoText style={{ paddingLeft: '24px' }}>
        오래 걸릴 수 있습니다.
      </InfoText>
      <BtnSection>
        <Btn btnProp={'reject'} onClick={reject}>
          다음에 보기
        </Btn>
        <Btn btnProp={''} onClick={submitMovie}>
          수락하기
        </Btn>
      </BtnSection>
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

export default ArriveMovieF;
