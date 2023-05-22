import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import { connect } from 'react-redux';

const Container = styled.div`
  ${(props) => props.theme.columnCenter};
  padding-bottom: 60px;
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

const SubImage = styled.div`
  @media only screen and (min-width: 600px) {
    width: 448px;
    height: 60px;
  }
  position: relative;
  width: 313px;
  height: 42px;
`;

const CopyImage = styled.div`
  @media only screen and (min-width: 600px) {
    width: 448px;
    height: 120px;
  }
  position: relative;
  width: 313px;
  height: 84px;
`;

const BtnImage = styled.div`
  @media only screen and (min-width: 600px) {
    width: 448px;
    height: 70px;
  }
  position: relative;
  width: 313px;
  height: 49px;
  margin-top: 50px;
  cursor: pointer;
`;

const Main = ({ user: { logged } }) => {
  return (
    <Container>
      <LightImage>
        <Image
          src='/Home/bg_light.png'
          alt='background lighting'
          layout='fill'
          objectFit='cover'
        />
      </LightImage>
      <MainImage>
        <Image
          src='/Home/Main/main_text.png'
          alt='장르는 로맨스'
          layout='fill'
          objectFit='cover'
        />
      </MainImage>
      <SubImage>
        <Image
          src='/Home/Main/main_sub.png'
          alt='background lighting'
          layout='fill'
          objectFit='cover'
        />
      </SubImage>
      <CopyImage>
        <Image
          src='/Home/Main/main_copy.png'
          alt='background lighting'
          layout='fill'
          objectFit='cover'
        />
      </CopyImage>
      <Link href={logged ? '/' : '/login'}>
        <BtnImage>
          <Image
            src='/Home/Main/main_btn.png'
            alt='장르는 로맨스 예매하기'
            layout='fill'
            objectFit='cover'
          />
        </BtnImage>
      </Link>
    </Container>
  );
};

export default connect((state) => state)(Main);
