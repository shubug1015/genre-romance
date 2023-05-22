import styled from "styled-components";
import TableList from "./TableList";
import Loader from "components/Admin/Loader";
import { AiOutlineCheck } from "react-icons/ai";

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

const TabelContent = styled.div`
  @media only screen and (max-width: 768px) {
    overflow-x: scroll;
  }
`;

const TableHeader = styled.div`
  @media only screen and (max-width: 768px) {
    width: 600px;
  }
  ${(props) => props.theme.flexStartCenter}
  border-bottom: 1px solid #dbdbdb;
  width: 100%;
  height: 50px;
  font-size: 12px;
  opacity: 0.8;
`;

const Check = styled.div`
  @media only screen and (max-width: 768px) {
    width: 100px;
  }
  ${(props) => props.theme.flexCenter};
  width: 10%;
`;

const CheckBox = styled.input`
  display: none;
`;

const CheckLabel = styled.label`
  ${(props) => props.theme.flexCenter};
  background-color: ${(props) =>
    props.checkedProp ? props.theme.adminMainColor : "transparent"};
  border: ${(props) => (props.checkedProp ? "none" : "2px solid #727272")};
  border-radius: 3px;
  width: 18px;
  height: 18px;
  cursor: pointer;
  :hover {
    opacity: 0.8;
    transition: opacity 0.3s ease-in-out;
  }
`;

const Icon = styled.div`
  display: ${(props) => !props.checkedProp && "none"};
  color: ${(props) => props.checkedProp && props.theme.whiteColor};
  font-size: 12px;
`;

const TableCell = styled.div`
  @media only screen and (max-width: 768px) {
    width: 100px;
  }
  ${(props) => props.theme.flexCenter};
  width: ${(props) => props.widthProp};
  line-height: 18px;
`;

const TableListContainer = styled.div`
  @media only screen and (max-width: 768px) {
    width: 600px;
  }
  width: 100%;
  height: 300px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    /* 세로 스크롤 넓이 */
    width: 4px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.4);
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 6px;
  }
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
  checkedList,
  checkAllUser,
  checkUser,
  loading,
}) => (
  <Container>
    <TableContainer>
      <Title>
        {type} ({userData.length})
      </Title>
      <TabelContent>
        <TableHeader>
          <Check>
            <CheckBox
              id={"check_all_label"}
              type="checkbox"
              onClick={(e) => checkAllUser(e)}
              checked={
                userData.length > 0 && userData.length === checkedList.length
                  ? true
                  : false
              }
              onChange={() => null}
            />
            <CheckLabel
              htmlFor={"check_all_label"}
              checkedProp={
                userData.length > 0 && userData.length === checkedList.length
              }
            >
              <Icon
                checkedProp={
                  userData.length > 0 && userData.length === checkedList.length
                }
              >
                <AiOutlineCheck />
              </Icon>
            </CheckLabel>
          </Check>
          <TableCell widthProp={"15%"}>이름</TableCell>
          <TableCell widthProp={"25%"}>아이디</TableCell>
          <TableCell widthProp={"20%"}>핸드폰 번호</TableCell>
          <TableCell widthProp={"15%"}>제안 거절</TableCell>
          <TableCell widthProp={"15%"}>영화 거절</TableCell>
        </TableHeader>
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
                name={u.name}
                gender={u.sex}
                username={u.username}
                joined={u.date_joined.substring(0, 10)}
                phone_number={u.phone_number}
                match_cancel={u.match_cancel_count}
                movie_cancel={u.movie_cancel_count}
                payment_cancel={u.payment_cancel_count}
                profile={u.profile}
                match={u.match}
                checkedList={checkedList}
                checkUser={checkUser}
                proof={u.proof_shot}
              />
            ))
          ) : (
            <NoData>회원이 존재하지 않습니다.</NoData>
          )}
        </TableListContainer>
      </TabelContent>
    </TableContainer>
  </Container>
);

export default Table;
