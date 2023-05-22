import styled from 'styled-components';
import Image from 'next/image';
import { wrapper, userLogin } from 'redux/store';
import cookies from 'next-cookies';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { handleRedirect } from 'state';
import { userApi } from 'api';
import Head from 'next/head';

const Container = styled.div`
  ${(props) => props.theme.columnCenter};
  width: 100vw;
  max-width: 100%;
`;

const MainImage = styled.div`
  @media only screen and (min-width: 600px) {
    width: 375px;
    height: 180px;
  }
  position: relative;
  width: 313px;
  height: 126px;
  margin-top: 30px;
`;

const TextContainer = styled.div`
  ${(props) => props.theme.columnCenter};
`;

const TextSection = styled.div`
  ${(props) => props.theme.flexCenter};
  font-size: 20px;
  margin: 5px 0;
`;

const Text = styled.div``;

const HighLighted = styled.div`
  color: ${(props) => props.theme.mainColor};
`;

const PriceContainer = styled.div`
  @media only screen and (min-width: 600px) {
    width: 600px;
  }
  ${(props) => props.theme.columnCenter};
  width: 100%;
  margin: 70px 0;
`;

const Tag = styled.div`
  ${(props) => props.theme.flexCenter};
  width: 67px;
  height: 24px;
  border-radius: 2px;
  background: linear-gradient(134deg, #e25387 8%, #cc217c 108%);
  font-size: 13px;
  margin-bottom: 12px;
`;

const Title = styled.div`
  font-size: 32px;
  font-weight: 300;
  line-height: 1.4;
  font-family: 'Cafe24Oneprettynight';
`;

const InfoSection = styled.div`
  ${(props) => props.theme.columnCenter};
  width: 100%;
  margin: 20px 0 55px 0;
`;

const Info = styled.div`
  font-size: 14px;
  font-weight: 300;
  line-height: 1.7;
  opacity: 0.6;
`;

const PriceSection = styled.div`
  ${(props) => props.theme.columnCenter};
  width: 100%;
  padding: 24px;
  background-color: rgba(255, 255, 255, 0.04);
  border: solid 1px rgba(255, 255, 255, 0.08);
  margin: 8px 0;
`;

const PriceInfo = styled.div`
  ${(props) => props.theme.flexBetweenCenter};
  width: 100%;
  margin: 8px 0;
`;

const PriceValue = styled.div`
  ${(props) => props.theme.flexCenter};
  font-size: 16px;
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.15);
  margin: 15px 0;
`;

const AccountSection = styled.div`
  ${(props) => props.theme.flexBetweenCenter};
  width: 100%;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.04);
  border: solid 1px rgba(255, 255, 255, 0.08);
  margin: 8px 0;
  font-size: 14px;
  font-weight: 500;
`;

const Account = styled.div``;

const CopyBtn = styled.div`
  color: ${(props) => props.theme.mainColor};
  cursor: pointer;
`;

const InfoText = styled.div`
  ${(props) => props.theme.flexStartCenter};
  width: 100%;
  font-size: 12px;
  font-weight: 300;
  line-height: 1.7;
  opacity: 0.6;
`;

const NoticeImage = styled.div`
  @media only screen and (min-width: 600px) {
    width: 375px;
    height: 180px;
  }
  position: relative;
  width: 100%;
  height: 120px;
  margin-bottom: 20px;
`;

const ImageContainer = styled.div`
  ${(props) => props.theme.columnCenter};
  margin: 60px 0;
`;

const ImageTitle = styled.div`
  font-size: 14px;
  opacity: 0.6;
  margin-bottom: 20px;
`;

const ImageSection = styled.div`
  ${(props) => props.theme.columnCenter};
  width: 180px;
  height: 240px;
  padding: 7.9px 7.7px 13.1px 8px;
  border-radius: 4px;
  box-shadow: 0 8px 20px 0 rgba(226, 83, 135, 0.16);
  background-color: #e25387;
  padding: 8px;
`;

const ShotImage = styled.div`
  position: relative;
  width: 164px;
  height: 164px;
  margin-bottom: 13px;
`;

const LogoImage = styled.div`
  position: relative;
  width: 120px;
  height: 40px;
`;

const Matched = () => {
  return (
    <Container>
      <Head>
        <title>매칭완료 | 장르는로맨스</title>
        <meta
          name="description"
          content="장르는 로맨스, 매칭이 완료되었습니다."
        />
        <link rel="canonical" href="https://www.genreisromance.site/matched" />
      </Head>
      <MainImage>
        <Image
          src="/Matched/congratulations.png"
          alt="장르는 로맨스 매칭완료"
          layout="fill"
          objectFit="cover"
        />
      </MainImage>
      <TextContainer>
        <TextSection>
          <Text>축하합니다!</Text>
        </TextSection>
        <TextSection>
          <Text>두 분의</Text>
          <HighLighted style={{ marginLeft: '5px' }}>매칭</HighLighted>
          <Text>이 성사되었습니다.</Text>
        </TextSection>
      </TextContainer>
      <PriceContainer>
        <Tag>티켓결제</Tag>
        <Title>로맨스 찍을 준비</Title>
        <Title>되셨나요?</Title>
        <InfoSection>
          <Info>6시간 이내 입금이 확인되지 않을 경우</Info>
          <Info>매칭이 취소됩니다.</Info>
        </InfoSection>
        <PriceSection>
          <PriceInfo>
            <PriceValue>영화티켓</PriceValue>
            <PriceValue>15,000원</PriceValue>
          </PriceInfo>
          <PriceInfo>
            <PriceValue>매칭비</PriceValue>
            <PriceValue>20,000원</PriceValue>
          </PriceInfo>
          <PriceInfo>
            <PriceValue>보증금</PriceValue>
            <PriceValue>10,000원</PriceValue>
          </PriceInfo>
          <Line />
          <PriceInfo>
            <PriceValue>총 금액</PriceValue>
            <PriceValue>
              <div
                style={{
                  fontSize: '24px',
                  color: '#e25384',
                  marginRight: '5px',
                }}
              >
                45,000
              </div>
              원
            </PriceValue>
          </PriceInfo>
        </PriceSection>
        <AccountSection>
          <Account>302-1364-8126-11 농협 전유찬</Account>
          <CopyBtn
            onClick={() => {
              navigator.clipboard.writeText('302-1364-8126-11 농협 전유찬');
              alert('복사 되었습니다.');
            }}
          >
            복사
          </CopyBtn>
        </AccountSection>
        <InfoText>
          <AiOutlineInfoCircle style={{ marginRight: '3px' }} />
          보증금은 두 분의 만남 성사 이후 전액 환급됩니다.
        </InfoText>
      </PriceContainer>
      <NoticeImage>
        <Image
          src="/Matched/notice.png"
          alt="매칭 공지사항"
          layout="fill"
          objectFit="cover"
        />
      </NoticeImage>
      <TextContainer>
        <TextSection>
          <Text>보증금 환급을 위해</Text>
        </TextSection>
        <TextSection>
          <HighLighted>인증샷</HighLighted>
          <Text>을 꼭 업로드 해주세요!</Text>
        </TextSection>
      </TextContainer>
      <ImageContainer>
        <ImageTitle>인증샷 예시</ImageTitle>
        <ImageSection>
          <ShotImage>
            <Image
              src="/Photo/shot_ex.jpg"
              alt="장르는 로맨스 인증샷 예시"
              layout="fill"
              objectFit="cover"
            />
          </ShotImage>
          <LogoImage>
            <Image
              src="/Photo/shot_logo.png"
              alt="장르는 로맨스 인증샷 로고"
              layout="fill"
              objectFit="cover"
            />
          </LogoImage>
        </ImageSection>
      </ImageContainer>
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

export default Matched;
