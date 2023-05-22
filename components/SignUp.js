import styled from 'styled-components';
import Image from 'next/image';
import { AiOutlineInfoCircle } from 'react-icons/ai';

const Container = styled.div`
  ${(props) => props.theme.columnCenter};
  width: 100vw;
  max-width: 100%;
`;

const WelcomeImage = styled.div`
  @media only screen and (min-width: 600px) {
    width: 450px;
    height: 177px;
  }
  position: relative;
  width: 313px;
  height: 112px;
`;

const TextContainer = styled.div`
  ${(props) => props.theme.columnCenter};
  margin: 20px 0;
`;

const TextSection = styled.div`
  ${(props) => props.theme.flexCenter};
  font-size: 14px;
  font-weight: 300;
  line-height: 26px;
`;

const Text = styled.div`
  opacity: 0.6;
`;

const HighLighted = styled.div`
  color: ${(props) => props.theme.mainColor};
`;

const Form = styled.form`
  @media only screen and (min-width: 600px) {
    width: 600px;
  }
  width: 100%;
  margin-top: 80px;
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

const Input = styled.input`
  width: 100%;
  height: 56px;
  font-size: 14px;
  padding-left: 15px;
  background-color: transparent;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #ffffff;
  outline: none;
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const ShortInput = styled.input`
  width: 60%;
  height: 56px;
  font-size: 14px;
  padding-left: 15px;
  background-color: transparent;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: ${(props) => (props.submit ? 'rgba(255, 255, 255, 0.5)' : '#ffffff')};
  outline: none;
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
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

const Select = styled.select`
  :invalid {
    color: #8e8e8e;
  }
  width: 100%;
  height: 56px;
  font-size: 14px;
  padding-left: 15px;
  background-color: transparent;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #ffffff;
  outline: none;
`;

const Option = styled.option`
  width: 80px;
  height: 10px;
  outline: none;
  padding-left: 10px;
  background-color: #150f0a;
  color: #ffffff;
`;

const InputBtn = styled.div`
  ${(props) => props.theme.flexCenter};
  width: 37%;
  height: 56px;
  margin-left: 3%;
  font-size: 14px;
  border-radius: 58px;
  background-color: #ffffff;
  color: #000000;
  cursor: pointer;
`;

const InfoText = styled.div`
  ${(props) => props.theme.flexStartCenter};
  width: 100%;
  color: ${(props) => props.theme.mainColor};
  margin-top: 5px;
`;

const SubmitBtn = styled.div`
  @media only screen and (min-width: 600px) {
    width: 600px;
  }
  ${(props) => props.theme.flexCenter};
  width: 100%;
  height: 55px;
  border-radius: 58px;
  box-shadow: 0 2px 12px 0 rgba(255, 57, 131, 0.32);
  background: linear-gradient(82deg, #f7215d 10%, #c52180 105%);
  margin-top: 50px;
  font-size: 18px;
  cursor: pointer;
`;

const Signup = ({
  name,
  gender,
  id,
  pw,
  pwRe,
  phoneNum,
  certification,
  checkId,
  checkPw,
  checkPhoneNum,
  checkCertification,
  handleName,
  handleGender,
  handlePlace,
  handleAge,
  handleId,
  handlePw,
  handlePwRe,
  handlePhoneNum,
  handleCertification,
  sendCertification,
  handleSubmit,
  checkIdFunc,
  checkCertificationFunc,
}) => {
  const placeList = [
    '서울시',
    '경기남부',
    '경기북부',
    '인천시',
    '강원도',
    '충청남도',
    '충청북도',
    '전라남도',
    '전라북도',
    '경상남도',
    '경상북도',
    '제주도',
    '대전시',
    '울산시',
    '부산시',
    '대구시',
    '광주시',
  ];
  const ageList = [...Array(100).keys()].map((x) => JSON.stringify(x + 1));

  return (
    <Container>
      <WelcomeImage>
        <Image
          src="/Signup/welcome.png"
          alt="장르는 로맨스 회원가입"
          layout="fill"
          objectFit="cover"
        />
      </WelcomeImage>
      <TextContainer>
        <TextSection>
          <Text>장르는 로맨스에 오신 것을 환영합니다.</Text>
        </TextSection>
        <TextSection>
          <HighLighted>회원가입</HighLighted>
          <Text>을 위해 아래 내용을 입력해주세요.</Text>
        </TextSection>
      </TextContainer>
      <Form>
        <InputContainer>
          <InputTitle>이름</InputTitle>
          <InputSection>
            <Input type="text" value={name} onChange={handleName} />
          </InputSection>
        </InputContainer>
        <InputContainer>
          <InputTitle>성별</InputTitle>
          <InputSection>
            <GenderBox
              genderProp={gender === 'female'}
              onClick={() => handleGender('female')}
            >
              여성
            </GenderBox>
            <GenderBox
              genderProp={gender === 'male'}
              onClick={() => handleGender('male')}
            >
              남성
            </GenderBox>
          </InputSection>
        </InputContainer>
        <InputContainer>
          <InputTitle>지역</InputTitle>
          <InputSection>
            <Select
              required
              defaultValue=""
              onChange={(e) => handlePlace(e.target.value)}
            >
              <Option value="" disabled>
                지역을 선택해주세요.
              </Option>
              {placeList.map((p) => (
                <Option key={p}>{p}</Option>
              ))}
            </Select>
          </InputSection>
        </InputContainer>
        <InputContainer>
          <InputTitle>나이</InputTitle>
          <InputSection>
            <Select
              required
              defaultValue=""
              onChange={(e) => handleAge(e.target.value)}
            >
              <Option value="" disabled>
                나이를 선택해주세요.
              </Option>
              {ageList.map((a) => (
                <Option key={a}>{a}</Option>
              ))}
            </Select>
          </InputSection>
        </InputContainer>
        <InputContainer>
          <InputTitle>아이디</InputTitle>
          <InputSection>
            <Input
              type="text"
              placeholder="아이디를 입력해주세요."
              value={id}
              onChange={handleId}
              onBlur={() => checkIdFunc(id)}
            />
          </InputSection>
          {checkId && (
            <InfoText
              style={{
                color: checkId === '사용 가능한 아이디입니다.' && 'lightgreen',
              }}
            >
              <AiOutlineInfoCircle size={15} style={{ marginRight: '3px' }} />
              {checkId}
            </InfoText>
          )}
        </InputContainer>
        <InputContainer>
          <InputTitle>비밀번호</InputTitle>
          <InputSection>
            <Input
              type="password"
              placeholder="영문, 숫자 포함 8자 이상"
              value={pw}
              onChange={handlePw}
            />
          </InputSection>
          {checkPw && (
            <InfoText
              style={{
                color:
                  checkPw === '사용 가능한 비밀번호입니다.' && 'lightgreen',
              }}
            >
              <AiOutlineInfoCircle size={15} style={{ marginRight: '3px' }} />
              {checkPw}
            </InfoText>
          )}
        </InputContainer>
        <InputContainer>
          <InputTitle>비밀번호 재입력</InputTitle>
          <InputSection>
            <Input
              type="password"
              placeholder="영문, 숫자 포함 8자 이상"
              value={pwRe}
              onChange={handlePwRe}
            />
          </InputSection>
          {pw.length > 0 && pwRe.length > 0 && pw !== pwRe && (
            <InfoText>
              <AiOutlineInfoCircle size={15} style={{ marginRight: '3px' }} />
              비밀번호가 일치하지 않습니다.
            </InfoText>
          )}
        </InputContainer>
        <InputContainer>
          <InputTitle>핸드폰번호</InputTitle>
          <InputSection>
            <ShortInput
              type="tel"
              pattern="\\d*"
              placeholder="01012341234"
              value={phoneNum}
              onChange={handlePhoneNum}
              readOnly={checkPhoneNum ? true : false}
              submit={checkPhoneNum}
            />
            <InputBtn onClick={() => sendCertification(phoneNum)}>
              인증번호 받기
            </InputBtn>
          </InputSection>
        </InputContainer>
        <InputContainer>
          <InputTitle>인증번호</InputTitle>
          <InputSection>
            <ShortInput
              type="tel"
              placeholder="1234"
              value={certification}
              onChange={handleCertification}
            />
            <InputBtn onClick={() => checkCertificationFunc(certification)}>
              인증
            </InputBtn>
          </InputSection>
          {checkCertification && (
            <InfoText
              style={{
                color: checkCertification === '인증되었습니다.' && 'lightgreen',
              }}
            >
              <AiOutlineInfoCircle size={15} style={{ marginRight: '3px' }} />
              {checkCertification}
            </InfoText>
          )}
        </InputContainer>
      </Form>
      <SubmitBtn onClick={handleSubmit}>가입하기</SubmitBtn>
    </Container>
  );
};

export default Signup;
