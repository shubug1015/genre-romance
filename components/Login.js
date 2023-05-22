import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import FindId from './FindId';
import FindPw from './FindPw';
import ChangePw from './ChangePw';

const Container = styled.div`
  ${(props) => props.theme.columnCenter};
  width: 100vw;
  max-width: 100%;
`;

const WelcomeImage = styled.div`
  @media only screen and (min-width: 600px) {
    width: 400px;
    height: 160px;
  }
  position: relative;
  width: 313px;
  height: 112px;
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

const SubmitBtn = styled.input`
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

const FindSection = styled.div`
  @media only screen and (min-width: 600px) {
    width: 400px;
  }
  ${(props) => props.theme.flexEndCenter};
  width: 100%;
  opacity: 0.6;
  margin-top: 30px;
`;

const FindText = styled.div`
  font-size: 13px;
  margin-left: 15px;
  border-bottom: 1px solid #ffffff;
  padding-bottom: 3px;
  cursor: pointer;
`;

const SignupSection = styled.div`
  @media only screen and (min-width: 600px) {
    width: 400px;
  }
  ${(props) => props.theme.columnCenter};
  width: 100%;
`;

const SignupText = styled.div`
  font-size: 14px;
  opacity: 0.6;
  margin: 50px 0;
`;

const SignupBtn = styled.div`
  @media only screen and (min-width: 600px) {
    width: 400px;
  }
  ${(props) => props.theme.flexCenter};
  width: 100%;
  height: 55px;
  border-radius: 58px;
  box-shadow: 0 2px 12px 0 rgba(255, 57, 131, 0.32);
  background: #ffffff;
  color: #333333;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
`;

const Login = ({ id, pw, handleId, handlePw, handleSubmit }) => {
  const [findId, setFindId] = useState(false);
  const [findPw, setFindPw] = useState(false);
  const [changePw, setChangePw] = useState(false);
  const [userId, setUserId] = useState(null);

  return (
    <Container>
      <WelcomeImage>
        <Image
          src='/Signup/welcome.png'
          alt='장르는 로맨스 로그인'
          layout='fill'
          objectFit='cover'
        />
      </WelcomeImage>
      <Form onSubmit={handleSubmit}>
        <InputContainer>
          <InputTitle>아이디</InputTitle>
          <InputSection>
            <Input
              type='text'
              placeholder='아이디를 입력하세요.'
              value={id}
              onChange={handleId}
            />
          </InputSection>
        </InputContainer>
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
        <FindSection>
          <FindText onClick={() => setFindId(true)}>아이디 찾기</FindText>
          <FindText onClick={() => setFindPw(true)}>비밀번호 찾기</FindText>
        </FindSection>
        <SubmitBtn type='submit' value='로그인' />
      </Form>
      <SignupSection>
        <SignupText>아직 회원이 아니신가요?</SignupText>
        <Link href='/signup'>
          <SignupBtn>회원가입하기</SignupBtn>
        </Link>
      </SignupSection>
      {findId ? <FindId setFindId={setFindId} /> : null}
      {findPw ? (
        <FindPw
          setFindPw={setFindPw}
          setChangePw={setChangePw}
          setUserId={setUserId}
        />
      ) : null}
      {changePw ? <ChangePw setChangePw={setChangePw} userId={userId} /> : null}
    </Container>
  );
};

export default Login;
