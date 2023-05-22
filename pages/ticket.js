import styled from 'styled-components';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { wrapper, userLogin } from 'redux/store';
import { userApi } from 'api';
import cookies from 'next-cookies';
import { handleRedirect } from 'state';
import {
  AiOutlineDownload,
  AiOutlineInfoCircle,
  AiOutlineClose,
} from 'react-icons/ai';
import Head from 'next/head';

const Container = styled.div`
  ${(props) => props.theme.columnCenter};
  width: 100vw;
  max-width: 100%;
`;

const Text = styled.div`
  @media only screen and (min-width: 600px) {
    font-size: 30px;
    margin-bottom: 60px;
  }
  font-size: 20px;
  margin-bottom: 20px;
  font-family: 'Cafe24Oneprettynight';
`;

const TicketSection = styled.div`
  @media only screen and (min-width: 600px) {
    width: 490px;
    height: 591px;
    margin-bottom: 20px;
  }
  ${(props) => props.theme.columnCenter};
  position: relative;
  width: 100%;
  height: 110vw;
  margin-bottom: 70px;
`;

const ContentContainer = styled.div`
  @media only screen and (min-width: 600px) {
    width: 80%;
    top: 27px;
  }
  ${(props) => props.theme.columnCenter};
  position: absolute;
  top: 10px;
  width: 90%;
`;

const TitleImage = styled.div`
  @media only screen and (min-width: 600px) {
    margin-bottom: 30px;
  }
  position: relative;
  width: 100%;
  height: 64px;
`;

const ContentSection = styled.div`
  ${(props) => props.theme.flexCenter};
  width: 100%;
`;

const TicketImage = styled.div`
  @media only screen and (min-width: 600px) {
    width: 180px;
    height: 300px;
  }
  position: relative;
  width: 100px;
  height: 167px;
  border: solid 2px #e25387;
  margin-right: 28px;
  cursor: pointer;
`;

const ContentDetail = styled.div`
  ${(props) => props.theme.columnStartCenter};
`;

const DetailTitle = styled.div`
  @media only screen and (min-width: 600px) {
    font-size: 25px;
    margin-bottom: 20px;
  }
  font-size: 18px;
  margin-bottom: 12px;
`;

const DetailInfo = styled.div`
  @media only screen and (min-width: 600px) {
    font-size: 17px;
  }
  font-size: 11px;
  line-height: 1.7;
  opacity: 0.6;
`;

const DetailSeat = styled.div`
  @media only screen and (min-width: 600px) {
    font-size: 20px;
    margin-top: 40px;
  }
  font-size: 14px;
  font-weight: 500;
  margin-top: 23px;
  margin-bottom: 15px;
`;

const DetailSeatNum = styled.div`
  @media only screen and (min-width: 600px) {
    font-size: 35px;
  }
  font-size: 24px;
  font-weight: bold;
`;

const SaveSection = styled.div`
  @media only screen and (min-width: 600px) {
    bottom: 40px;
  }
  ${(props) => props.theme.flexCenter};
  position: absolute;
  bottom: 20px;
  width: 80%;
  color: ${(props) => props.theme.mainColor};
`;

const SaveText = styled.div`
  @media only screen and (min-width: 600px) {
    font-size: 22px;
  }
  font-size: 18px;
  margin-left: 10px;
  cursor: pointer;
`;

const InfoText = styled.div`
  @media only screen and (min-width: 600px) {
    width: 490px;
  }
  ${(props) => props.theme.flexStartCenter};
  width: 100%;
  padding: 2px 5px;
  font-size: 14px;
  opacity: 0.6;
`;

const Btn = styled.div`
  @media only screen and (min-width: 600px) {
    width: 490px;
    margin-top: 70px;
  }
  ${(props) => props.theme.flexCenter};
  width: 100%;
  height: 56px;
  font-size: 18px;
  font-weight: 500;
  border-radius: 40px;
  background-color: rgba(255, 255, 255, 0.98);
  margin-top: 25px;
  color: #121212;
  cursor: pointer;
`;

const BigImageSection = styled.div`
  position: absolute;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  width: 300px;
  height: 533px;
`;

const BigImage = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const CloseImage = styled.div`
  ${(props) => props.theme.flexCenter};
  position: absolute;
  top: 5px;
  right: 5px;
  width: 30px;
  height: 30px;
  z-index: 90;
  background-color: #333333;
  color: #ffffff;
  cursor: pointer;
`;

const Ticket = ({ token }) => {
  const [data, setData] = useState(null);

  const [open, setOpen] = useState(false);

  const imageUrl = data?.ticket;

  const getTicket = async () => {
    try {
      const { data } = await userApi.getTicket(token);
      setData(data);
    } catch {
      alert('Error');
    }
  };

  useEffect(() => {
    getTicket();
  }, []);

  // const saveTicket = () => {
  //   fetch(imageUrl, {
  //     method: 'GET',
  //     headers: {},
  //   })
  //     .then((response) => {
  //       response.arrayBuffer().then(function (buffer) {
  //         const url = window.URL.createObjectURL(new Blob([buffer]));
  //         const link = document.createElement('a');
  //         link.href = url;
  //         link.setAttribute('download', '장르는 로맨스 티켓.jpg'); //or any other extension
  //         document.body.appendChild(link);
  //         link.click();
  //       });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  return (
    <Container>
      <Head>
        <title>티켓확인 | 장르는로맨스</title>
        <meta
          name="description"
          content="장르는 로맨스의 티켓확인 페이지입니다."
        />
        <link rel="canonical" href="https://www.genreisromance.site/ticket" />
      </Head>
      <Text>티켓을 확인해주세요.</Text>
      <TicketSection>
        <Image
          src="/Ticket/ticket_outline.png"
          alt="장르는 로맨스 티켓 Outline"
          layout="fill"
          objectFit="cover"
        />
        {data && (
          <>
            <ContentContainer>
              <TitleImage>
                <Image
                  src="/Ticket/ticket_title.png"
                  alt="장르는 로맨스 티켓 Title"
                  layout="fill"
                  objectFit="cover"
                />
              </TitleImage>
              <ContentSection>
                <TicketImage onClick={() => setOpen(true)}>
                  <Image
                    src={data.ticket}
                    alt="장르는 로맨스 티켓"
                    layout="fill"
                    objectFit="contain"
                  />
                </TicketImage>
                <ContentDetail>
                  <DetailTitle>{data.movie.title}</DetailTitle>
                  <DetailInfo>{data.movie.place}</DetailInfo>
                  <DetailInfo>
                    {data.movie.month}월 {data.movie.date}일 /{' '}
                    {data.movie.day_time === 'over' ? '오후' : '오전'}{' '}
                    {data.movie.hour}시 {data.movie.minute}분
                  </DetailInfo>
                  <DetailSeat>상대좌석</DetailSeat>
                  <DetailSeatNum>{data.partner_seat}</DetailSeatNum>
                </ContentDetail>
              </ContentSection>
            </ContentContainer>
            <SaveSection>
              <AiOutlineDownload size={25} />
              <SaveText onClick={() => setOpen(true)}>티켓 캡처하기</SaveText>
            </SaveSection>
          </>
        )}
      </TicketSection>
      <InfoText>
        <AiOutlineInfoCircle size={16} style={{ marginRight: '5px' }} />
        매칭과 티켓 예매가 완료되었기 때문에 비용은
      </InfoText>
      <InfoText style={{ paddingLeft: '24px' }}>
        환불되지 않을 수 있습니다.
      </InfoText>
      <Btn onClick={() => window.open('http://pf.kakao.com/_bMSUT/chat')}>
        취소 문의하기
      </Btn>
      {open ? (
        <BigImageSection>
          <BigImage>
            <CloseImage onClick={() => setOpen(false)}>
              <AiOutlineClose size={25} />
            </CloseImage>
            <Image
              src={data.ticket}
              alt="장르는 로맨스 티켓"
              layout="fill"
              objectFit="contain"
            />
          </BigImage>
        </BigImageSection>
      ) : null}
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

export default Ticket;
