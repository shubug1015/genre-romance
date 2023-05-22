import styled from 'styled-components';
import Table from './Table';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';

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

const SeleceContainer = styled.div`
  ${(props) => props.theme.columnEndCenter}
  position: relative;
  width: 90%;
  margin-bottom: 20px;
  z-index: 10;
`;

const Select = styled.div`
  ${(props) => props.theme.flexCenter}
  background-color: ${(props) => props.theme.adminMainColor};
  border-radius: 3px;
  width: 120px;
  height: 40px;
  color: ${(props) => props.theme.whiteColor};
  font-size: 12px;
  cursor: pointer;
  /* :hover {
    opacity: 0.7;
    transition: opacity 0.3s ease-in-out;
  } */
`;

const OptionContainer = styled.div`
  position: absolute;
  top: 40px;
  /* left: 0; */
  /* border-right: 1px solid #dbdbdb; */
  /* border-left: 1px solid #dbdbdb; */
  box-shadow: 1px 4px 12px 1px rgba(0, 0, 0, 0.1);
  font-size: 12px;
`;

const Option = styled.div`
  ${(props) => props.theme.flexCenter}
  background-color: ${(props) => props.theme.adminBgColor};
  border-bottom: 1px solid #dbdbdb;
  width: 120px;
  height: 40px;
  cursor: pointer;
  :hover {
    opacity: 0.7;
    transition: opacity 0.3s ease-in-out;
  }
`;

const MatchedUsers = ({
  pre,
  ready,
  ongoing,
  fin,
  open,
  toggleOpen,
  selectState,
  selectedState,
  submitTicket,
  resubmitTicket,
  cancelTicket,
  deleteMatch,
  loading,
}) => {
  const state = [
    {
      id: 'pre',
      type: '매칭 대기중',
      data: pre,
    },
    {
      id: 'ready',
      type: '매칭 완료',
      data: ready,
    },
    {
      id: 'ongoing',
      type: '티켓 발급 완료',
      data: ongoing,
    },
    {
      id: 'fin',
      type: '영화 관람 완료',
      data: fin,
    },
  ];

  return (
    <Container>
      <Title>매칭 관리</Title>
      <SeleceContainer>
        <Select onClick={toggleOpen}>
          상태 고르기
          {open ? <MdArrowDropUp size={20} /> : <MdArrowDropDown size={20} />}
        </Select>
        <OptionContainer>
          {open &&
            state.map((s) => (
              <Option key={s.id} onClick={() => selectState(s.type, s.data)}>
                {s.type} ({s.data.length})
              </Option>
            ))}
        </OptionContainer>
      </SeleceContainer>
      <Table
        type={selectedState.type}
        userData={selectedState.data}
        submitTicket={submitTicket}
        resubmitTicket={resubmitTicket}
        cancelTicket={cancelTicket}
        deleteMatch={deleteMatch}
        loading={loading}
      />
    </Container>
  );
};

export default MatchedUsers;
