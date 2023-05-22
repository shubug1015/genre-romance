import styled from 'styled-components';
import Image from 'next/image';

const Container = styled.div`
  ${(props) => props.theme.columnCenter};
  justify-content: center;
  width: 100vw;
  height: 100vh;
  max-width: 100%;
  margin-top: -65px;
`;

const LoadingImage = styled.div`
  @media only screen and (min-width: 600px) {
    width: 600px;
    height: 300px;
  }
  position: relative;
  width: 100%;
  height: 180px;
`;

const TextSection = styled.div`
  ${(props) => props.theme.flexCenter};
  font-size: 20px;
  margin-bottom: 20px;
`;

const Text = styled.div``;

const Highlighted = styled.div`
  color: ${(props) => props.theme.mainColor};
`;

const Info = styled.div`
  font-size: 14px;
  opacity: 0.6;
  line-height: 1.7;
`;

const Sorry1 = () => (
  <Container>
    <LoadingImage>
      <Image
        src='/sorry.png'
        alt='Loading Image'
        layout='fill'
        objectFit='cover'
      />
    </LoadingImage>
    <TextSection>
      <Highlighted>새로운 로맨스</Highlighted>
      <Text>를 찾고 있습니다.</Text>
    </TextSection>
    <Info>죄송합니다. 두 분의 입금이 확인되지</Info>
    <Info>않아 매칭이 취소되었습니다.</Info>
  </Container>
);

export default Sorry1;
