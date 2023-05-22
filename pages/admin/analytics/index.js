import styled from 'styled-components';
import Head from 'next/head';
import Visitor from 'components/Admin/Analytics/Visitor';
import Funnel from 'components/Admin/Analytics/Funnel';
import Keyword from 'components/Admin/Analytics/Keyword';
import { wrapper, adminLogin } from 'redux/store';
import cookies from 'next-cookies';

const Container = styled.div`
  @media only screen and (max-width: 768px) {
    width: 100vw;
  }
  ${(props) => props.theme.columnCenter}
  justify-content: center;
  width: ${(props) => `calc(100vw - ${props.theme.adminSideBarWidth})`};
  padding-top: 50px;
`;

const Title = styled.div`
  width: 90%;
  margin-bottom: 70px;
  color: ${(props) => props.theme.adminMainColor};
  font-size: 28px;
`;

const Content = styled.div`
  ${(props) => props.theme.columnCenter}
  width: 90%;
`;

const Section = styled.div`
  @media only screen and (max-width: 768px) {
    ${(props) => props.theme.columnCenter};
  }
  ${(props) => props.theme.flexCenter};
  align-items: flex-start;
  width: 100%;
  margin-bottom: 30px;
`;

const Home = () => (
  <>
    <Head>{/* <title>포스트코 관리자 | 사이트 통계</title> */}</Head>
    <Container>
      <Title>사이트 통계</Title>
      <Content>
        <Visitor />
        <Section>
          <Funnel />
          <Keyword />
        </Section>
      </Content>
    </Container>
  </>
);

export const getServerSideProps = wrapper.getServerSideProps((ctx) => {
  const { admin_token: token } = cookies(ctx);
  const store = ctx.store;

  if (token && token.length > 0) {
    store.dispatch(adminLogin({ logged: true, token }));
    return { props: { logged: true } };
  } else {
    return {
      redirect: {
        destination: '/admin/login',
        permanent: false,
      },
    };
  }
});

export default Home;
