import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';
import { userApi } from 'api';
import { useState } from 'react';

const Container = styled.div`
  ${(props) => props.theme.flexCenter};
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 99;
`;

const ContentContainer = styled.div`
  @media only screen and (min-width: 600px) {
    width: 400px;
    height: 500px;
  }
  ${(props) => props.theme.columnCenter};
  width: 90%;
  height: 500px;
  padding: 30px 30px;
  padding-top: 15px;
  background-image: url('/bg-pattern.png');
  box-shadow: 1px 4px 12px 1px rgba(0, 0, 0, 0.1);
  color: #ffffff;
  overflow-y: scroll;
`;

const CloseSection = styled.div`
  ${(props) => props.theme.flexEndCenter};
  width: 100%;
  margin-bottom: 20px;
`;

const Title = styled.div`
  width: 100%;
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 30px;
`;

const InputContainer = styled.div`
  ${(props) => props.theme.columnStartCenter};
  width: 100%;
  margin-top: 20px;
`;

const InputTitle = styled.div`
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 10px;
`;

const Input = styled.input`
  width: 100%;
  height: 50px;
  font-size: 14px;
  padding-left: 15px;
  background-color: transparent;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #ffffff;
  outline: none;
`;

const Btn = styled.div`
  ${(props) => props.theme.flexCenter};
  width: 100%;
  padding: 20px 0;
  border-radius: 58px;
  border: 1px solid #333333;
  background: #ffffff;
  color: #333333;
  font-size: 15px;
  font-weight: 500;
  margin-top: 30px;
  cursor: pointer;
`;

const ChangePw = ({ setChangePw, userId }) => {
  const [data, setData] = useState({
    pw: '',
    pwRe: '',
  });

  const handlePw = (e) => {
    setData({ ...data, pw: e.target.value });
  };

  const handlePwRe = (e) => {
    setData({ ...data, pwRe: e.target.value });
  };

  const changePw = async () => {
    if (data.pw !== data.pwRe) {
      alert('비밀번호가 일치하지 않습니다.');
    } else if (data.pw.length < 8 || data.pw.length > 20) {
      alert('비밀번호는 8~20 자리를 사용해야 합니다.');
    } else {
      const user_data = { user_id: userId.user_id, pw: data.pw };
      await userApi.changePw(user_data);
      alert('변경되었습니다.');
      setChangePw(false);
    }
  };

  return (
    <Container>
      <ContentContainer>
        <CloseSection>
          <AiOutlineClose
            size={20}
            style={{ cursor: 'pointer' }}
            onClick={() => setChangePw(false)}
          />
        </CloseSection>
        <Title>비밀번호 재설정</Title>
        <InputContainer>
          <InputTitle>새 비밀번호</InputTitle>
          <Input
            type='password'
            placeholder='새 비밀번호를 입력하세요.'
            value={data.pw}
            onChange={handlePw}
          />
        </InputContainer>
        <InputContainer>
          <InputTitle>새 비밀번호 확인</InputTitle>
          <Input
            type='password'
            placeholder='새 비밀번호를 다시 입력하세요.'
            value={data.pwRe}
            onChange={handlePwRe}
          />
        </InputContainer>

        <Btn onClick={changePw}>변경하기</Btn>
      </ContentContainer>
    </Container>
  );
};

export default ChangePw;
