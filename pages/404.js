import styled from 'styled-components';
import Link from 'next/link';

const Container = styled.div`
  ${(props) => props.theme.columnCenter};
  justify-content: center;
  width: 100vw;
  height: 100vh;
  max-width: 100%;
  margin-top: -65px;
  color: ${(props) => props.theme.mainColor};
`;

const Num = styled.div`
  font-size: 50px;
  font-weight: 700;
`;

const Text = styled.div`
  @media only screen and (min-width: 600px) {
    font-size: 25px;
  }
  font-size: 20px;
  font-weight: 500;
  margin-top: 10px;
`;

const SubText = styled.div`
  @media only screen and (min-width: 600px) {
    font-size: 13px;
  }
  font-size: 11px;
  font-weight: 300;
  margin-top: 20px;
  color: #ffffff;
  opacity: 0.6;
`;

const Btn = styled.div`
  ${(props) => props.theme.flexCenter};
  width: 120px;
  height: 35px;
  margin-top: 30px;
  border-radius: 58px;
  font-size: 12px;
  font-weight: 500;
  background: linear-gradient(73deg, #f7215d 11%, #c52180 105%);
  cursor: pointer;
  color: #ffffff;
`;

const PageNotFound = () => {
  return (
    <Container>
      <Num>404</Num>
      <Text>요청하신 페이지를 찾을 수 없습니다.</Text>
      <SubText>페이지가 삭제되었거나 주소가 변경되었을 수 있습니다.</SubText>
      <Link href='/'>
        <Btn>홈으로 돌아가기</Btn>
      </Link>
    </Container>
  );
};

export default PageNotFound;
