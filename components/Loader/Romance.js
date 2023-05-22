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

const Text = styled.div`
  font-size: 20px;
  font-weight: 300;
  margin-top: 15px;
`;

const Romance = () => (
  <Container>
    <LoadingImage>
      <Image
        src='/Loader/loading.png'
        alt='Loading Image'
        layout='fill'
        objectFit='cover'
      />
    </LoadingImage>
    <Text>당신의 로맨스를 찾고 있습니다.</Text>
  </Container>
);

export default Romance;
