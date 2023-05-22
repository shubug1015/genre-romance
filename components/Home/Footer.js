import styled from 'styled-components';

const Container = styled.div`
  ${(props) => props.theme.columnCenter};
  width: 100%;
`;

const Title = styled.div`
  color: ${(props) => props.theme.mainColor};
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 10px;
  opacity: 0.9;
`;

const Contents = styled.div`
  ${(props) => props.theme.columnCenter};
  font-size: 13px;
  font-weight: 300;
  opacity: 0.6;
`;

const Content = styled.div`
  margin: 5px 0;
`;

const Footer = () => {
  return (
    <Container>
      <Title>문의</Title>
      <Contents>
        <Content>base227@naver.com</Content>
        <Content
          style={{ borderBottom: '1px solid lightgray', paddingBottom: '2px' }}
          onClick={() => window.open('http://pf.kakao.com/_bMSUT/chat')}
        >
          카카오톡 문의하기
        </Content>

        {/* <div> */}
        <Content style={{ marginTop: 25 }}>대표자명: 전유찬</Content>
        <Content>tel: 010-6258-8828</Content>
        {/* </div> */}
      </Contents>
    </Container>
  );
};

export default Footer;
