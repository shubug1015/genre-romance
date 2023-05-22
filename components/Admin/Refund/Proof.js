import styled from 'styled-components';
import Image from 'next/image';
import { IoIosClose, IoIosAdd } from 'react-icons/io';

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

const Title = styled.div`
  ${(props) => props.theme.flexStartCenter}
  width: 90%;
  font-size: 20px;
`;

const TextContainer = styled.div`
  ${(props) => props.theme.flexBetweenCenter}
  flex-wrap: wrap;
  border-top: 1px solid #dbdbdb;
  border-bottom: 1px solid #dbdbdb;
  width: 90%;
  margin-top: 20px;
  margin-bottom: 100px;
  padding: 50px 5px;
`;

const Text = styled.div`
  ${(props) => props.theme.columnCenter}
`;

const TextTitle = styled.div`
  font-size: 16px;
  color: ${(props) => props.theme.adminMainColor};
  margin-bottom: 18px;
`;

const TextContent = styled.div`
  line-height: 1.63;
`;

const ProofInfoContainer = styled.div`
  ${(props) => props.theme.flexCenter}
  border-top: 1px solid #dbdbdb;
  border-bottom: 1px solid #dbdbdb;
  width: 90%;
  margin-top: 20px;
  margin-bottom: 50px;
  padding: 50px 5px;
`;

const ProofInfo = styled.div`
  ${(props) => props.theme.columnCenter}
  width: 100%;
`;

const NoImage = styled.div`
  ${(props) => props.theme.flexCenter}
  width: 250px;
  height: 250px;
  opacity: 0.5;
`;

const Comment = styled.div`
  ${(props) => props.theme.flexCenter}
  width: 200px;
  margin-top: 30px;
  line-height: 20px;
`;

const Account = styled.div`
  ${(props) => props.theme.flexCenter}
  width: 200px;
  margin-top: 30px;
  line-height: 20px;
`;

const ProofImage = styled(Image)`
  object-fit: contain;
`;

const Proof = ({
  month,
  date,
  place,
  title,
  dayTime,
  hour,
  minute,
  photo,
  comment,
  account,
  closeProof,
}) => (
  <Container>
    <Content>
      <CloseBtn>
        <IoIosClose onClick={closeProof} />
      </CloseBtn>
      <Title>관람 영화 정보</Title>
      <TextContainer>
        <Text>
          <TextTitle>날짜</TextTitle>
          <TextContent>
            {month}월 {date}일
          </TextContent>
        </Text>
        <Text>
          <TextTitle>영화관</TextTitle>
          <TextContent>{place}</TextContent>
        </Text>
        <Text>
          <TextTitle>영화 제목</TextTitle>
          <TextContent>{title}</TextContent>
        </Text>
        <Text>
          <TextTitle>영화 시간</TextTitle>
          <TextContent>
            {dayTime === 'over' ? '오후' : '오전'} {hour}시 {minute}분
          </TextContent>
        </Text>
      </TextContainer>
      <Title>인증샷 & 계좌번호</Title>
      <ProofInfoContainer>
        <ProofInfo>
          {photo ? (
            <>
              <ProofImage
                src={photo}
                alt="Proof Image"
                width={250}
                height={250}
              />
              <Comment>{comment}</Comment>
              <Account>{account}</Account>
            </>
          ) : (
            <NoImage>업로드된 인증샷이 없습니다.</NoImage>
          )}
        </ProofInfo>
      </ProofInfoContainer>
    </Content>
  </Container>
);

export default Proof;
