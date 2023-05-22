import { useState } from 'react';
import styled from 'styled-components';
import { AiOutlineInfoCircle } from 'react-icons/ai';

const Container = styled.div`
  ${(props) => props.theme.columnCenter};
  width: 100vw;
  max-width: 100%;
`;

const Title = styled.div`
  @media only screen and (min-width: 600px) {
    width: 400px;
  }
  ${(props) => props.theme.flexStartCenter}
  width: 100%;
  color: ${(props) => props.theme.mainColor};
  font-size: 24px;
`;

const Form = styled.form`
  @media only screen and (min-width: 600px) {
    width: 400px;
  }
  width: 100%;
  margin-top: 20px;
`;

const InputContainer = styled.div`
  ${(props) => props.theme.columnStartCenter};
  width: 100%;
  margin: 30px 0;
`;

const InputTitle = styled.div`
  font-size: 14px;
  margin-bottom: 10px;
`;

const InputSection = styled.div`
  ${(props) => props.theme.flexStartCenter};
  width: 100%;
`;

const Box = styled.div`
  ${(props) => props.theme.flexStartCenter}
  width: 100%;
  height: 56px;
  font-size: 14px;
  padding-left: 15px;
  background-color: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #ffffff;
  opacity: 0.5;
`;

const Input = styled.input`
  width: 100%;
  height: 56px;
  font-size: 14px;
  padding-left: 15px;
  background-color: transparent;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #ffffff;
  outline: none;
`;

const GenderBox = styled.div`
  ${(props) => props.theme.flexCenter};
  width: 50%;
  height: 56px;
  border-radius: 4px;
  border: ${(props) =>
    props.genderProp
      ? '1px solid #e25387'
      : '1px solid rgba(255, 255, 255, 0.1)'};
  color: ${(props) =>
    props.genderProp ? '#e25387' : 'rgba(255, 255, 255, 0.1)'};
  transition: border 0.3s ease-in-out, color 0.3s ease-in-out;
`;

const InfoText = styled.div`
  ${(props) => props.theme.flexStartCenter};
  width: 100%;
  color: ${(props) => props.theme.mainColor};
  margin-top: 5px;
`;

const BtnContainer = styled.div`
  @media only screen and (min-width: 600px) {
    width: 400px;
  }
  ${(props) => props.theme.flexBetweenCenter};
  width: 100%;
`;

const SubmitBtn = styled.input`
  @media only screen and (min-width: 600px) {
    width: 180px;
  }
  ${(props) => props.theme.flexCenter};
  width: 48%;
  height: 45px;
  border-radius: 100px;
  box-shadow: 0 2px 12px 0 rgba(255, 57, 131, 0.32);
  background: linear-gradient(82deg, #f7215d 10%, #c52180 105%);
  margin-top: 15px;
  font-size: 14px;
  color: #ffffff;
  outline: none;
  border: none;
  cursor: pointer;
`;

const CancelBtn = styled.div`
  @media only screen and (min-width: 600px) {
    width: 180px;
  }
  ${(props) => props.theme.flexCenter};
  width: 48%;
  height: 45px;
  border-radius: 100px;
  background: #dbdbdb;
  margin-top: 15px;
  font-size: 14px;
  color: black;
  outline: none;
  border: none;
  cursor: pointer;
`;

const LoginBtn = styled.input`
  @media only screen and (min-width: 600px) {
    width: 400px;
  }
  ${(props) => props.theme.flexCenter};
  width: 100%;
  height: 55px;
  border-radius: 58px;
  box-shadow: 0 2px 12px 0 rgba(255, 57, 131, 0.32);
  background: linear-gradient(82deg, #f7215d 10%, #c52180 105%);
  margin-top: 15px;
  font-size: 18px;
  color: #ffffff;
  outline: none;
  border: none;
  cursor: pointer;
`;

const MyPage = ({
  check,
  pw,
  name,
  gender,
  phoneNum,
  id,
  updatedPw,
  updatedPwRe,
  handlePw,
  checkPw,
  handleUpdatedPw,
  handleUpdatedPwRe,
  checkUpdatedPw,
  handleSubmit,
}) => {
  const [open, setOpen] = useState(false);

  const openPw = () => setOpen(true);

  const closePw = () => setOpen(false);

  return (
    <Container>
      {check ? (
        <>
          <Title>마이페이지</Title>
          <Form onSubmit={handleSubmit}>
            <InputContainer>
              <InputTitle>이름</InputTitle>
              <InputSection>
                <Box>{name}</Box>
              </InputSection>
            </InputContainer>
            <InputContainer>
              <InputTitle>성별</InputTitle>
              <InputSection>
                <GenderBox genderProp={gender === 'female'}>여성</GenderBox>
                <GenderBox genderProp={gender === 'male'}>남성</GenderBox>
              </InputSection>
            </InputContainer>
            <InputContainer>
              <InputTitle>핸드폰 번호</InputTitle>
              <InputSection>
                <Box>{phoneNum}</Box>
              </InputSection>
            </InputContainer>
            <InputContainer>
              <InputTitle>아이디</InputTitle>
              <InputSection>
                <Box>{id}</Box>
              </InputSection>
            </InputContainer>
            <InputContainer>
              <InputTitle
                onClick={openPw}
                style={{
                  borderBottom: '2px solid white',
                  paddingBottom: '5px',
                  marginTop: '30px',
                }}
              >
                비밀번호 변경
              </InputTitle>
            </InputContainer>
            {open && (
              <>
                <InputContainer>
                  <InputTitle>비밀번호</InputTitle>
                  <InputSection>
                    <Input
                      type='password'
                      placeholder='영문, 숫자 포함 8자 이상'
                      value={updatedPw}
                      onChange={handleUpdatedPw}
                    />
                  </InputSection>
                  {checkUpdatedPw && (
                    <InfoText
                      style={{
                        color:
                          checkUpdatedPw === '사용 가능한 비밀번호입니다.' &&
                          'lightgreen',
                      }}
                    >
                      <AiOutlineInfoCircle
                        size={15}
                        style={{ marginRight: '3px' }}
                      />
                      {checkUpdatedPw}
                    </InfoText>
                  )}
                </InputContainer>
                <InputContainer>
                  <InputTitle>비밀번호 재입력</InputTitle>
                  <InputSection>
                    <Input
                      type='password'
                      placeholder='영문, 숫자 포함 8자 이상'
                      value={updatedPwRe}
                      onChange={handleUpdatedPwRe}
                    />
                  </InputSection>
                  {updatedPw.length > 0 &&
                    updatedPwRe.length > 0 &&
                    updatedPw !== updatedPwRe && (
                      <InfoText>
                        <AiOutlineInfoCircle
                          size={15}
                          style={{ marginRight: '3px' }}
                        />
                        비밀번호가 일치하지 않습니다.
                      </InfoText>
                    )}
                </InputContainer>
                <BtnContainer>
                  <SubmitBtn type='submit' value='비밀번호 변경' />
                  <CancelBtn onClick={closePw}>취소</CancelBtn>
                </BtnContainer>
              </>
            )}
          </Form>
        </>
      ) : (
        <>
          <Title>비밀번호 확인</Title>
          <Form onSubmit={checkPw}>
            <InputContainer>
              <InputTitle>비밀번호</InputTitle>
              <InputSection>
                <Input
                  type='password'
                  placeholder='비밀번호를 입력하세요'
                  value={pw}
                  onChange={handlePw}
                />
              </InputSection>
            </InputContainer>
            <LoginBtn type='submit' value='비밀번호 확인' />
          </Form>
        </>
      )}
    </Container>
  );
};

export default MyPage;
