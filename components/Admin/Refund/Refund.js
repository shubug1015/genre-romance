import styled from 'styled-components';
import Table from './Table';

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
  margin-bottom: 10px;
  color: ${(props) => props.theme.adminMainColor};
  font-size: 28px;
`;

const BtnContainer = styled.div`
  ${(props) => props.theme.flexEndCenter}
  width: 90%;
  height: 40px;
  margin-bottom: 20px;
`;

const Btn = styled.div`
  ${(props) => props.theme.flexCenter}
  background-color: ${(props) => props.theme.adminMainColor};
  border-radius: 3px;
  width: 120px;
  height: 40px;
  color: ${(props) => props.theme.whiteColor};
  font-size: 12px;
  cursor: pointer;
  :hover {
    opacity: 0.7;
    transition: opacity 0.3s ease-in-out;
  }
`;

const Refund = ({
  data,
  checkedList,
  checkAllUser,
  checkUser,
  submitRefund,
  loading,
}) => (
  <Container>
    <Title>보증금 환급</Title>
    <BtnContainer>
      {checkedList && checkedList.length > 0 && (
        <Btn onClick={submitRefund}>보증금 환급처리</Btn>
      )}
    </BtnContainer>
    <Table
      type={'보증금 환급 회원'}
      userData={data}
      checkedList={checkedList}
      checkAllUser={checkAllUser}
      checkUser={checkUser}
      loading={loading}
    />
  </Container>
);

export default Refund;
