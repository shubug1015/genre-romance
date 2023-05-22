import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import { connect } from 'react-redux';

const Container = styled.div`
  ${(props) => props.theme.columnCenter};
  padding: ${(props) => props.theme.mainPadding};
`;

const LightImage = styled.div`
  @media only screen and (min-width: 600px) {
    width: 448px;
    height: 600px;
  }
  position: relative;
  width: 80%;
  height: 400px;
`;

const MainImage = styled.div`
  @media only screen and (min-width: 600px) {
    width: 448px;
    height: 400px;
    margin-top: -550px;
  }
  position: relative;
  width: 313px;
  height: 280px;
  margin-top: -350px;
`;

const TextSection = styled.div`
  ${(props) => props.theme.columnCenter};
  margin-top: 20px;
`;

const TextTitle = styled.div`
  font-size: 16px;
  margin-bottom: 10px;
`;

const TextDetail = styled.div`
  font-size: 14px;
  font-weight: 300;
  opacity: 0.6;
  margin: 5px 0;
`;

const PriceImage = styled.div`
  @media only screen and (min-width: 600px) {
    width: 450px;
    height: 432px;
  }
  position: relative;
  width: 313px;
  height: 302px;
`;

const Btn = styled.div`
  @media only screen and (min-width: 600px) {
    width: 400px;
    height: 60px;
  }
  ${(props) => props.theme.flexCenter};
  width: 280px;
  height: 40px;
  border-radius: 58px;
  box-shadow: 0 2px 12px 0 rgba(255, 57, 131, 0.32);
  background: linear-gradient(82deg, #f7215d 10%, #c52180 105%);
  margin-top: 50px;
  font-size: 17px;
  cursor: pointer;
`;

const BoxOffice = ({ user: { logged } }) => {
  return (
    <Container>
      <LightImage>
        <Image
          src='/Home/bg_light.png'
          alt='background Lighting'
          layout='fill'
          objectFit='cover'
        />
      </LightImage>
      <MainImage>
        <Image
          src='/Home/BoxOffice/boxoffice.png'
          alt='장르는 로맨스 BOX OFFICE'
          layout='fill'
          objectFit='cover'
        />
      </MainImage>
      <TextSection>
        <TextTitle>로맨스 찍을 준비 되셨나요?</TextTitle>
        <TextDetail>두 장의 티켓을 함께 찍어 보내주시면</TextDetail>
        <TextDetail>보증금을 돌려드려요.</TextDetail>
      </TextSection>
      <PriceImage>
        <Image
          src='/Home/BoxOffice/price.png'
          alt='장르는 로맨스 가격표'
          layout='fill'
          objectFit='cover'
        />
      </PriceImage>
      <Link href={logged ? '/' : '/login'}>
        <Btn>지금 예매하기</Btn>
      </Link>
    </Container>
  );
};

export default connect((state) => state)(BoxOffice);
