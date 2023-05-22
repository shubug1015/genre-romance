import styled from 'styled-components';
import Image from 'next/image';
import { IoIosClose } from 'react-icons/io';

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

const ImageContainer = styled.div`
  width: 90%;
  margin-bottom: 25px;
`;

const ImageTitle = styled.div`
  font-size: 16px;
  color: ${(props) => props.theme.adminMainColor};
  margin-bottom: 18px;
`;

const ProfileImage = styled(Image)`
  border-radius: 50%;
  object-fit: contain;
`;

const TextContainer = styled.div`
  ${(props) => props.theme.columnCenter}
  width: 100%;
`;

const Text = styled.div`
  ${(props) => props.theme.columnStartCenter}
  width: 90%;
  padding: 25px 0;
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background-color: rgba(255, 255, 255, 0.04);
  margin: 10px 0;
`;

const TextTitle = styled.div`
  font-size: 16px;
  color: ${(props) => props.theme.adminMainColor};
  margin-bottom: 18px;
`;

const TextContent = styled.textarea`
  border: 1px solid #dbdbdb;
  width: 100%;
  height: 80px;
  margin-top: 20px;
  padding: 5px;
  font-family: 'S-CoreDream-4Regular';
  font-size: 12px;
  line-height: 18px;
  white-space: pre-line;
`;

const Btns = styled.div`
  ${(props) => props.theme.flexCenter}
`;

const SubmitBtn = styled.div`
  ${(props) => props.theme.flexCenter}
  background-color: ${(props) => props.theme.adminMainColor};
  border-radius: 3px;
  width: 120px;
  padding: 15px 0;
  margin-right: 15px;
  margin-bottom: 25px;
  color: ${(props) => props.theme.whiteColor};
  cursor: pointer;
  :hover {
    opacity: 0.7;
    transition: opacity 0.3s ease-in-out;
  }
`;

const RejectBtn = styled.div`
  ${(props) => props.theme.flexCenter}
  background-color: #fc3f3f;
  border-radius: 3px;
  width: 120px;
  padding: 15px 0;
  margin-right: 15px;
  margin-bottom: 25px;
  color: ${(props) => props.theme.whiteColor};
  cursor: pointer;
  :hover {
    opacity: 0.7;
    transition: opacity 0.3s ease-in-out;
  }
`;

const Profile = ({
  id,
  photo,
  closeProfile,
  profileData,
  handleContent,
  handleSubmit,
  rejectUser,
}) => (
  <Container>
    <Content>
      <CloseBtn>
        <IoIosClose onClick={closeProfile} />
      </CloseBtn>
      <ImageContainer>
        <ImageTitle>#프로필 사진</ImageTitle>
        {/* <div style={{ width: 200, height: 200 }}> */}
        <ProfileImage src={photo} alt="User Image" width={200} height={200} />
        {/* </div> */}
      </ImageContainer>
      <TextContainer>
        {profileData &&
          profileData.length > 0 &&
          profileData.map((p) => (
            <Text key={p.id}>
              <TextTitle>{p.title}</TextTitle>
              <TextContent
                type="text"
                palceholder="내용을 입력해주세요"
                value={p.content}
                onChange={(e) => handleContent(e, p.id)}
              />
            </Text>
          ))}
      </TextContainer>
      <Btns>
        <SubmitBtn onClick={handleSubmit}>프로필 수정</SubmitBtn>
        <RejectBtn onClick={() => rejectUser(id)}>지원 취소</RejectBtn>
      </Btns>
    </Content>
  </Container>
);

export default Profile;
