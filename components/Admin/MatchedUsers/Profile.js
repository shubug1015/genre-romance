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

const TextContent = styled.div`
  width: 100%;
  line-height: 1.63;
`;

const Profile = ({ photo, profileData, closeProfile }) => (
  <Container>
    <Content>
      <CloseBtn>
        <IoIosClose onClick={closeProfile} />
      </CloseBtn>
      <ImageContainer>
        <ImageTitle>#프로필 사진</ImageTitle>
        <ProfileImage src={photo} alt="User Image" width={200} height={200} />
      </ImageContainer>
      <TextContainer>
        {profileData &&
          profileData.length > 0 &&
          profileData.map((p) => (
            <Text key={p.id}>
              <TextTitle>{p.title}</TextTitle>
              <TextContent>{p.content}</TextContent>
            </Text>
          ))}
      </TextContainer>
    </Content>
  </Container>
);

export default Profile;
