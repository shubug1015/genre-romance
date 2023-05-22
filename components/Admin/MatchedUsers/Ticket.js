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
  @media only screen and (max-width: 768px) {
    width: 48%;
    :first-child {
      margin-bottom: 30px;
    }
    :nth-child(2) {
      margin-bottom: 30px;
    }
  }
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

const TicketInfoContainer = styled.div`
  @media only screen and (max-width: 768px) {
    ${(props) => props.theme.columnCenter}
  }
  ${(props) => props.theme.flexCenter}
  border-top: 1px solid #dbdbdb;
  border-bottom: 1px solid #dbdbdb;
  width: 90%;
  margin-top: 20px;
  margin-bottom: 100px;
  padding: 50px 5px;
`;

const TicketInfo = styled.div`
  @media only screen and (max-width: 768px) {
    :first-child {
      margin-bottom: 50px;
    }
  }
  ${(props) => props.theme.columnCenter}
  width: 100%;
`;

const Gender = styled.div`
  font-size: 16px;
  color: ${(props) => props.theme.adminMainColor};
  margin-bottom: 20px;
`;

const NoImage = styled.div`
  ${(props) => props.theme.flexCenter}
  border: 1px solid #dbdbdb;
  width: 200px;
  height: 280px;
  opacity: 0.5;
  font-size: 12px;
`;

const Label = styled.label`
  ${(props) => props.theme.flexCenter}
  background-color: ${(props) => props.theme.adminMainColor};
  border-radius: 30px;
  width: 120px;
  height: 40px;
  margin: 25px;
  color: ${(props) => props.theme.whiteColor};
  font-size: 12px;
  cursor: pointer;
  :hover {
    opacity: 0.7;
    transition: opacity 0.3s ease-in-out;
  }
`;

const Input = styled.input`
  display: none;
`;

const SeatInput = styled.input`
  border: 1px solid #dbdbdb;
  border-radius: 3px;
  width: 200px;
  height: 30px;
  padding-left: 10px;
`;

const SubmitBtnContainer = styled.div`
  ${(props) => props.theme.flexCenter};
`;

const SubmitBtn = styled.div`
  ${(props) => props.theme.flexCenter}
  background-color: ${(props) => props.theme.adminMainColor};
  border-radius: 3px;
  width: 120px;
  padding: 15px 0;
  margin-bottom: 25px;
  color: ${(props) => props.theme.whiteColor};
  cursor: pointer;
  :hover {
    opacity: 0.7;
    transition: opacity 0.3s ease-in-out;
  }
`;

const CancelBtn = styled.div`
  ${(props) => props.theme.flexCenter}
  background-color: #dbdbdb;
  border-radius: 3px;
  width: 120px;
  padding: 15px 0;
  margin-left: 20px;
  margin-bottom: 25px;
  color: #555555;
  cursor: pointer;
  :hover {
    opacity: 0.7;
    transition: opacity 0.3s ease-in-out;
  }
`;

const TicketImage = styled(Image)`
  object-fit: contain;
`;

const Ticket = ({
  type,
  id,
  month,
  date,
  place,
  title,
  dayTime,
  hour,
  minute,
  movie,
  maleId,
  femaleId,
  closeTicket,
  ticketInfo,
  handleImage,
  handleSeat,
  submitTicket,
  resubmitTicket,
  cancelTicket,
}) => (
  <Container>
    <Content>
      <CloseBtn>
        <IoIosClose onClick={closeTicket} />
      </CloseBtn>
      <Title>영화 정보</Title>
      <TextContainer>
        {month ? (
          <>
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
          </>
        ) : (
          <Text>영화 정보가 없습니다.</Text>
        )}
      </TextContainer>
      <Title>티켓 정보</Title>
      <TicketInfoContainer>
        {ticketInfo &&
          ticketInfo.length > 0 &&
          ticketInfo.map((t) => (
            <TicketInfo key={t.id}>
              <Gender>{t.id === 0 ? '남자' : '여자'}</Gender>
              {t.previewURL ? (
                <TicketImage
                  src={t.previewURL}
                  alt="Ticket Image"
                  width={200}
                  height={280}
                />
              ) : (
                <NoImage>티켓 사진을 업로드해주세요</NoImage>
              )}
              <Label htmlFor={`ticket${t.id}`}>티켓 사진 업로드</Label>
              <Input id={`ticket${t.id}`} type="file" onChange={handleImage} />
              <SeatInput
                type="text"
                placeholder="상대방 좌석을 입력해주세요."
                value={t.seat}
                onChange={(e) => handleSeat(e, t.id)}
              />
            </TicketInfo>
          ))}
      </TicketInfoContainer>
      <SubmitBtnContainer>
        {type === '매칭 완료' ? (
          <SubmitBtn
            onClick={() =>
              submitTicket(ticketInfo, movie, maleId, femaleId, closeTicket)
            }
          >
            티켓 전송
          </SubmitBtn>
        ) : (
          <SubmitBtn
            onClick={() =>
              resubmitTicket(ticketInfo, maleId, femaleId, closeTicket)
            }
          >
            티켓 재전송
          </SubmitBtn>
        )}
        <CancelBtn onClick={() => cancelTicket(id, closeTicket)}>
          티켓 매진
        </CancelBtn>
      </SubmitBtnContainer>
    </Content>
  </Container>
);

export default Ticket;
