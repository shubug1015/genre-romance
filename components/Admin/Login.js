import styled from 'styled-components';

const Container = styled.div`
  ${(props) => props.theme.flexCenter}
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${(props) => props.theme.adminBgColor};
  width: 100vw;
  max-width: 100%;
  height: 100vh;
  color: ${(props) => props.theme.adminFontColor};
  z-index: 100;
`;

const LoginBox = styled.div`
  @media only screen and (max-width: 768px) {
    width: 95%;
    height: 500px;
  }
  ${(props) => props.theme.columnCenter}
  justify-content: center;
  width: 450px;
  height: 550px;
`;

const Form = styled.form`
  ${(props) => props.theme.columnCenter}
  width: 100%;
  font-size: 11px;
`;

const Title = styled.div`
  @media only screen and (max-width: 768px) {
    font-size: 20px;
  }
  ${(props) => props.theme.flexCenter}
  width: 70%;
  font-size: 24px;
  color: ${(props) => props.theme.adminMainColor};
`;

const Border = styled.div`
  border-bottom: 2px solid ${(props) => props.theme.adminMainColor};
  width: 20%;
  margin-top: 40px;
  margin-bottom: 20px;
`;

const InputTitle = styled.div`
  @media only screen and (max-width: 768px) {
    width: 90%;
  }
  ${(props) => props.theme.flexStartCenter}
  width: 70%;
  padding-left: 5px;
  margin-top: 35px;
`;

const Input = styled.input`
  @media only screen and (max-width: 768px) {
    width: 90%;
  }
  border: 1px solid #dbdbdb;
  border-radius: 4px;
  padding-left: 10px;
  width: 70%;
  height: 50px;
  margin-top: 15px;
  outline-color: ${(props) => props.theme.adminMainColor};
  font-size: 13px;
`;

const SubmitBtn = styled.input`
  @media only screen and (max-width: 768px) {
    width: 90%;
  }
  ${(props) => props.theme.flexCenter}
  background-color: ${(props) => props.theme.adminMainColor};
  border: none;
  border-radius: 4px;
  width: 70%;
  height: 50px;
  margin-top: 60px;
  outline: none;
  color: white;
  font-size: 13px;
  cursor: pointer;
  :hover {
    opacity: 0.7;
    transition: opacity 0.3s ease-in-out;
  }
`;

const Login = ({ id, pw, handleId, handlePw, handleSubmit }) => (
  <Container>
    <LoginBox>
      <Form onSubmit={handleSubmit}>
        <Title>관리자 로그인</Title>
        <Border />
        <InputTitle>관리자 아이디</InputTitle>
        <Input
          type='text'
          placeholder='아이디를 입력하세요.'
          value={id}
          onChange={handleId}
        />
        <InputTitle>관리자 비밀번호</InputTitle>
        <Input
          type='password'
          placeholder='비밀번호를 입력하세요.'
          value={pw}
          onChange={handlePw}
        />
        <SubmitBtn type='submit' value='로그인' />
      </Form>
    </LoginBox>
  </Container>
);

export default Login;
