import styled from 'styled-components';
import TableList from './TableList';
import Loader from 'components/Admin/Loader';

const Container = styled.div`
  @media only screen and (max-width: 768px) {
    width: 100vw;
  }
  ${(props) => props.theme.columnCenter}
  justify-content: center;
  width: ${(props) => `calc(100vw - ${props.theme.adminSideBarWidth})`};
  margin-bottom: 50px;
`;

const TableContainer = styled.div`
  border-radius: 3px;
  box-shadow: 1px 4px 12px 1px rgba(0, 0, 0, 0.1);
  width: 90%;
`;

const Title = styled.div`
  ${(props) => props.theme.flexStartCenter};
  border-bottom: 1px solid #dbdbdb;
  width: 100%;
  height: 70px;
  padding-left: 15px;
  font-size: 16px;
`;

const TableListContainer = styled.div`
  @media only screen and (max-width: 768px) {
    ${(props) => props.theme.columnCenter}
  }
  ${(props) => props.theme.flexStartCenter}
  flex-wrap: wrap;
  width: 100%;
  padding: 30px 0;
`;

const NoData = styled.div`
  ${(props) => props.theme.flexCenter}
  width: 100%;
  height: 300px;
  opacity: 0.7;
`;

const LoaderContainer = styled.div`
  ${(props) => props.theme.flexCenter}
  width: 100%;
  height: 300px;
`;

const Table = ({
  type,
  userData,
  submitTicket,
  resubmitTicket,
  cancelTicket,
  deleteMatch,
  loading,
}) => (
  <Container>
    <TableContainer>
      <Title>
        {type} ({userData.length})
      </Title>
      <TableListContainer>
        {loading ? (
          <LoaderContainer>
            <Loader />
          </LoaderContainer>
        ) : userData && userData.length > 0 ? (
          userData.map((u) => (
            <TableList
              key={u.id}
              id={u.id}
              type={type}
              maleId={u.male.id}
              maleUsername={u.male.username}
              maleName={u.male.name}
              maleProfile={u.male.profile}
              maleProof={u.male.proof_shot}
              maleState={u.male.state}
              malePhoneNum={u.male.phone_number}
              femaleId={u.female.id}
              femaleUsername={u.female.username}
              femaleName={u.female.name}
              femaleProfile={u.female.profile}
              femaleProof={u.female.proof_shot}
              femaleState={u.female.state}
              femalePhoneNum={u.female.phone_number}
              created={u.created}
              movie={u.movie}
              submitTicket={submitTicket}
              resubmitTicket={resubmitTicket}
              cancelTicket={cancelTicket}
              deleteMatch={deleteMatch}
            />
          ))
        ) : (
          <NoData>회원이 존재하지 않습니다.</NoData>
        )}
      </TableListContainer>
    </TableContainer>
  </Container>
);

export default Table;
