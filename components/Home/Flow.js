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
  ${(props) => props.theme.flexCenter};
  font-size: 36px;
  font-weight: 400;
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
  ${(props) => props.theme.flexCenter};
  font-size: 16px;
  line-height: 26px;
`;

const Text = styled.div`
  opacity: 0.6;
`;

const HighLighted = styled.div`
  color: ${(props) => props.theme.mainColor};
`;

const MovieImage = styled.div`
  @media only screen and (min-width: 600px) {
    width: 448px;
    height: 220px;
  }
  position: relative;
  width: 313px;
  height: 154px;
  margin: 50px 0 40px 0;
`;

const StepSection = styled.div`
  ${(props) => props.theme.columnCenter};
  margin: 20px 0;
`;

const StepImage = styled.div`
  position: relative;
  width: 100px;
  height: 25px;
  margin-bottom: 15px;
`;

const StepText = styled.div`
  font-size: 16px;
  font-weight: 300;
  margin: 5px 0;
`;

const ArrowImage = styled.div`
  position: relative;
  width: 35px;
  height: 35px;
  margin-top: 30px;
`;

const DateImage = styled.div`
  @media only screen and (min-width: 600px) {
    width: 448px;
    height: 220px;
  }
  position: relative;
  width: 313px;
  height: 154px;
`;

const Flow = () => {
  const steps = [
    {
      id: 0,
      stepImg: '/Home/Flow/step1_main.png',
      text: [
        { id: 0, content: '영화 취향을 담은 지원서를' },
        { id: 1, content: '작성해주세요.' },
      ],
    },
    {
      id: 1,
      stepImg: '/Home/Flow/step2_main.png',
      text: [
        { id: 0, content: '저희가 당신과 잘 어울리는' },
        { id: 1, content: '상대를 찾아드려요.' },
      ],
    },
    {
      id: 2,
      stepImg: '/Home/Flow/step3_main.png',
      text: [
        { id: 0, content: '두 분 모두 데이트에 동의하시면,' },
        { id: 1, content: '티켓을 예매해드려요.' },
      ],
    },
  ];

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
      <Title>영화관에서</Title>
      <Title>설레는 첫 만남</Title>
      <TextContainer>
        <TextSection>
          <Text>장르는 로맨스가</Text>
        </TextSection>
        <TextSection>
          <HighLighted>설레는 영화데이트</HighLighted>
          <Text>를 선사해드려요.</Text>
        </TextSection>
      </TextContainer>
      <MovieImage>
        <Image
          src='/Home/Flow/movie_main.png'
          alt='장르는 로맨스 Movie'
          layout='fill'
          objectFit='cover'
        />
      </MovieImage>
      {steps &&
        steps.map((s) => (
          <StepSection key={s.id}>
            <StepImage>
              <Image
                src={s.stepImg}
                alt={`Step${s.id}`}
                layout='fill'
                objectFit='cover'
              />
            </StepImage>
            {s.text &&
              s.text.map((t) => <StepText key={t.id}>{t.content}</StepText>)}
            <ArrowImage>
              <Image
                src='/Home/arrow_main.png'
                alt='Arrow Image'
                layout='fill'
                objectFit='cover'
              />
            </ArrowImage>
          </StepSection>
        ))}
      <StepSection>
        <StepImage>
          <Image
            src='/Home/Flow/step4_main.png'
            alt='Step4'
            layout='fill'
            objectFit='cover'
          />
        </StepImage>
        <DateImage>
          <Image
            src='/Home/Flow/date_main.png'
            alt='장르는 로맨스 데이트'
            layout='fill'
            objectFit='cover'
          />
        </DateImage>
        <StepText>영화관에서 설레는 첫 인사를 나누세요</StepText>
      </StepSection>
    </Container>
  );
};

export default Flow;
