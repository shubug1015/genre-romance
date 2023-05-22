import styled from "styled-components";
import { IoIosClose } from "react-icons/io";

const Container = styled.div`
  ${(props) => props.theme.flexCenter}
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.5);
  width: 100vw;
  height: 100vh;
  z-index: 98;
`;

const Content = styled.div`
  @media only screen and (max-width: 768px) {
    width: 300px;
  }
  ${(props) => props.theme.columnCenter}
  background-color: ${(props) => props.theme.whiteColor};
  box-shadow: 1px 4px 12px 1px rgba(0, 0, 0, 0.1);
  width: 500px;
  height: 500px;
  padding-top: 25px;
  overflow: auto;
`;

const CloseBtn = styled.div`
  ${(props) => props.theme.flexEndCenter}
  width: 90%;
  font-size: 36px;
  cursor: pointer;
`;

const TextContainer = styled.div`
  ${(props) => props.theme.columnStartCenter}
  width: 80%;
  margin-top: 30px;
`;

const TextTitle = styled.div`
  font-size: 16px;
  color: ${(props) => props.theme.adminMainColor};
  margin-bottom: 18px;
`;

const Text = styled.div`
  ${(props) => props.theme.columnStartCenter}
  width: 90%;
  padding: 20px 0;
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background-color: rgba(255, 255, 255, 0.04);
  margin: 10px 0;
`;

const CancelUsers = ({ closeCancelUsers, cancelUsersData }) => (
  <Container>
    <Content>
      <CloseBtn>
        <IoIosClose onClick={closeCancelUsers} />
      </CloseBtn>
      <TextContainer>
        <TextTitle>매칭 취소된 회원 이름</TextTitle>
        {cancelUsersData.length > 0 ? (
          cancelUsersData.map((c) => <Text key={c.id}>{c.name}</Text>)
        ) : (
          <Text>취소된 이력이 존재하지 않습니다.</Text>
        )}
      </TextContainer>
    </Content>
  </Container>
);

export default CancelUsers;
