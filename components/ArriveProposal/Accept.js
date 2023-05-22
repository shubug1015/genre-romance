import styled from 'styled-components';
import { useRouter } from 'next/router';
import { userApi } from 'api';

const Container = styled.div`
  position: fixed;
  top: ${(props) => (props.open ? 0 : '100vh')};
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99;
  transition: top 0.5s ease-in-out;
`;

const Blank = styled.div`
  width: 100%;
  height: 60%;
`;

const Content = styled.div`
  ${(props) => props.theme.columnCenter};
  justify-content: center;
  width: 100%;
  height: 40%;
  padding: 25px;
  background-color: #242424;
  border-radius: 20px 20px 0px 0px;
`;

const ContentTitle = styled.div`
  font-size: 23px;
  line-height: 1.6;
`;

const Btn = styled.div`
  @media only screen and (min-width: 600px) {
    width: 600px;
  }
  ${(props) => props.theme.flexCenter};
  width: 100%;
  height: 55px;
  margin-top: 50px;
  border-radius: 58px;
  font-size: 18px;
  background: linear-gradient(73deg, #f7215d 11%, #c52180 105%);
  cursor: pointer;
`;

const Accept = ({ open, setOpen, token, sex }) => {
  const router = useRouter();

  const acceptProposal = async () => {
    if (sex === 'male') {
      const data = { respond: 'yes' };
      await userApi.respondProposal(token, data);
      alert('신청되었습니다.');
      router.push('/');
    } else if (sex === 'female') {
      router.push('/select_movie');
    }
  };

  return (
    <Container open={open === 'accept'}>
      <Blank onClick={() => setOpen('')} />
      <Content>
        <ContentTitle>
          {sex === 'male' ? '그녀에게 데이트를' : '그에게 데이트를'}
        </ContentTitle>
        <ContentTitle>신청하시겠습니까?</ContentTitle>
        <Btn onClick={acceptProposal}>네 신청할게요</Btn>
      </Content>
    </Container>
  );
};

export default Accept;
