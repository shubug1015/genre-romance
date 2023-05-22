import styled from 'styled-components';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
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
  position: absolute;
  width: 100%;
  height: 40%;
  bottom: 0;
  background-color: #242424;
  border-radius: 20px 20px 0px 0px;
`;

const ContentTitle = styled.div`
  font-size: 23px;
  margin-bottom: 20px;
`;

const ContentText = styled.div`
  font-size: 14px;
  line-height: 1.7;
  opacity: 0.6;
`;

const BtnSection = styled.div`
  @media only screen and (min-width: 600px) {
    width: 600px;
  }
  ${(props) => props.theme.flexCenter};
  width: 100%;
  margin-top: 45px;
`;

const Btn = styled.div`
  ${(props) => props.theme.flexCenter};
  width: 46%;
  margin: 0 2%;
  height: 55px;
  border-radius: 40px;
  font-size: 18px;
  background: ${(props) =>
    props.btnProp === 'reject'
      ? 'linear-gradient(73deg, #f7215d 11%, #c52180 105%)'
      : 'rgba(255, 255, 255, 0.1)'};
  cursor: pointer;
`;

const Reject = ({ open, setOpen, user: { token } }) => {
  const router = useRouter();

  const rejectProposal = async () => {
    const data = { respond: 'no' };
    await userApi.respondProposal(token, data);
    alert('거절하였습니다.');
    router.push('/');
  };

  return (
    <Container open={open === 'reject'}>
      <Blank onClick={() => setOpen('')} />
      <Content>
        <ContentTitle>정말 거절하시겠습니까?</ContentTitle>
        <ContentText>매칭 거절 시 다음 매칭에는</ContentText>
        <ContentText>시간이 오래 걸릴 수 있습니다.</ContentText>
        <BtnSection>
          <Btn btnProp={''} onClick={() => setOpen('')}>
            생각해볼게요
          </Btn>
          <Btn btnProp={'reject'} onClick={rejectProposal}>
            거절할게요
          </Btn>
        </BtnSection>
      </Content>
    </Container>
  );
};

export default connect((state) => state)(Reject);
