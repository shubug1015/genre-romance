import styled from 'styled-components';
import Image from 'next/image';

const Container = styled.div`
  ${(props) => props.theme.columnCenter};
  padding: ${(props) => props.theme.mainPadding};
`;

const HeartImage = styled.div`
  @media only screen and (min-width: 600px) {
    width: 448px;
    height: 40px;
  }
  position: relative;
  width: 313px;
  height: 30px;
  margin-bottom: 20px;
`;

const Title = styled.div`
  @media only screen and (min-width: 600px) {
    font-size: 36px;
  }
  ${(props) => props.theme.flexCenter};
  font-size: 36px;
  line-height: 1.04;
  letter-spacing: -0.46px;
  margin: 7px 0;
  font-family: 'Cafe24Oneprettynight';
`;

const TextContainer = styled.div`
  ${(props) => props.theme.columnCenter};
  margin: 20px 0;
`;

const TextSection = styled.div`
  @media only screen and (min-width: 600px) {
    font-size: 17px;
  }
  ${(props) => props.theme.flexCenter};
  font-size: 14px;
  line-height: 26px;
`;

const Text = styled.div`
  opacity: 0.6;
`;

const HighLighted = styled.div`
  color: ${(props) => props.theme.mainColor};
`;

const ChatImage = styled.div`
  @media only screen and (min-width: 600px) {
    width: 448px;
    height: 220px;
  }
  position: relative;
  width: 313px;
  height: 154px;
  margin: 50px 0 40px 0;
`;

const ImageTitle = styled.div`
  @media only screen and (min-width: 600px) {
    font-size: 17px;
  }
  font-size: 14px;
`;

const ArrowImage = styled.div`
  position: relative;
  width: 35px;
  height: 35px;
  margin: 15px 0;
`;

const DetailSection = styled.div`
  ${(props) => props.theme.columnCenter};
`;

const DetailTitle = styled.div`
  font-size: 24px;
  font-weight: 500;
  letter-spacing: -0.14px;
  color: ${(props) => props.theme.mainColor};
  margin: 15px 0;
`;

const DetailText = styled.div`
  font-size: 14px;
  opacity: 0.6;
  margin: 5px 0;
`;

const Intro = () => {
  return (
    <Container>
      <HeartImage>
        <Image
          src='/Home/heart_main.png'
          alt='Heart Image'
          layout='fill'
          objectFit='cover'
        />
      </HeartImage>
      <Title>최근에 어떤 영화 </Title>
      <Title>보셨어요?</Title>
      <TextContainer>
        <TextSection>
          <Text>어색한 분위기 속, 소개팅 상대에게</Text>
        </TextSection>
        <TextSection>
          <HighLighted style={{ marginRight: '3px' }}>
            가장 많이 하는 질문
          </HighLighted>
          <Text>중 하나에요.</Text>
        </TextSection>
      </TextContainer>
      <ChatImage>
        <Image
          src='/Home/Intro/chat_main.png'
          alt='Chat Image'
          layout='fill'
          objectFit='cover'
        />
      </ChatImage>
      <ImageTitle>영화의 감상을 나누고 취향을 공유하는 순간</ImageTitle>
      <ArrowImage>
        <Image
          src='/Home/arrow_main.png'
          alt='Arrow Image'
          layout='fill'
          objectFit='cover'
        />
      </ArrowImage>
      <DetailSection>
        <DetailTitle>이 사람, 더 알고싶다!</DetailTitle>
        <DetailText>설렘을 느끼게 되고 그렇게 자연스레</DetailText>
        <DetailText>두번째, 세번째 만남이 성사돼요.</DetailText>
      </DetailSection>
    </Container>
  );
};

export default Intro;
