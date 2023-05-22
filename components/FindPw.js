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
    height: 600px;
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
  /* font-weight: 500; */
  margin-bottom: 30px;
`;

const InputContainer = styled.div`
  ${(props) => props.theme.columnStartCenter};
  width: 100%;
  margin-top: 20px;
`;

const InputSection = styled.div`
  ${(props) => props.theme.flexStartCenter};
  width: 100%;
`;

const InputTitle = styled.div`
  font-size: 12px;
  /* font-weight: 500; */
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
  height: 50px;
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

const InputBtn = styled.div`
  ${(props) => props.theme.flexCenter};
  width: 37%;
  height: 50px;
  margin-left: 3%;
  font-size: 14px;
  border-radius: 58px;
  background-color: #ffffff;
  color: #000000;
  cursor: pointer;
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
  opacity: ${(props) => (props.submit ? 1 : 0.5)};
`;

const NoAccount = styled.div`
  ${(props) => props.theme.columnCenter};
  width: 100%;
  margin-top: 20px;
`;

const ChangeBtn = styled.div`
  ${(props) => props.theme.flexCenter};
  width: 100%;
  padding: 20px 0;
  border-radius: 58px;
  background: #333333;
  color: #ffffff;
  font-size: 15px;
  font-weight: 500;
  margin-top: 10px;
  cursor: pointer;
`;

const FindPw = ({ setFindPw, setChangePw, setUserId }) => {
  const [data, setData] = useState({
    account_id: '',
    name: '',
    phone_number: '',
    check_phone_number: false,
    code: '',
    check_code: false,
  });

  const [userPw, setUserPw] = useState(null);

  const handleId = (e) => {
    setData({ ...data, account_id: e.target.value });
  };

  const handleName = (e) => {
    setData({ ...data, name: e.target.value });
  };

  const handleNum = (e) => {
    setData({ ...data, phone_number: e.target.value });
  };

  const handleCode = (e) => {
    setData({ ...data, code: e.target.value });
  };

  const sendCode = async () => {
    if (data.phone_number.length > 0) {
      try {
        await userApi.sendCode({ phone_number: data.phone_number });
        setData({ ...data, check_phone_number: true });
      } catch {
        alert('Error');
      }
    } else {
      alert('핸드폰 번호를 입력해주세요.');
    }
  };

  const checkCode = async () => {
    if (data.code.length > 0) {
      if (data.check_phone_number) {
        try {
          const { data: res } = await userApi.checkCode({
            phone_number: data.phone_number,
            code: data.code,
          });
          if (res === 'wrong_code') {
            alert('인증번호가 일치하지 않습니다.');
          } else {
            setData({ ...data, check_code: true });
          }
        } catch {
          alert('Error');
        }
      } else {
        alert('핸드폰 인증이 필요합니다.');
      }
    } else {
      alert('인증번호를 입력해주세요.');
    }
  };

  const checkData = async () => {
    const { data: userData } = await userApi.findPw(data);
    setUserPw(userData);
    setUserId(userData);
  };

  return (
    <Container>
      <ContentContainer>
        <CloseSection>
          <AiOutlineClose
            size={20}
            style={{ cursor: 'pointer' }}
            onClick={() => setFindPw(false)}
          />
        </CloseSection>
        <Title>비밀번호 찾기</Title>
        <InputContainer>
          <InputTitle>아이디</InputTitle>
          <Input
            type='text'
            placeholder='아이디를 입력하세요.'
            value={data.account_id}
            onChange={handleId}
          />
        </InputContainer>
        <InputContainer>
          <InputTitle>이름</InputTitle>
          <Input
            type='text'
            placeholder='이름을 입력하세요.'
            value={data.name}
            onChange={handleName}
          />
        </InputContainer>
        <InputContainer>
          <InputTitle>핸드폰번호</InputTitle>
          <InputSection>
            <ShortInput
              type='tel'
              placeholder='01012345678'
              value={data.phone_number}
              onChange={handleNum}
              readOnly={data.check_phone_number}
              submit={data.check_phone_number}
            />
            <InputBtn onClick={sendCode}>인증번호 받기</InputBtn>
          </InputSection>
        </InputContainer>
        <InputContainer>
          <InputTitle>인증번호</InputTitle>
          <InputSection>
            <ShortInput
              type='tel'
              placeholder='1234'
              value={data.code}
              onChange={handleCode}
            />
            <InputBtn onClick={checkCode}>인증</InputBtn>
          </InputSection>
        </InputContainer>
        <Btn
          onClick={data.check_code ? checkData : null}
          submit={data.check_code}
        >
          조회하기
        </Btn>
        {userPw ? (
          userPw === 'no_account' ? (
            <NoAccount>계정정보가 일치하지 않습니다.</NoAccount>
          ) : (
            <ChangeBtn
              onClick={() => {
                setFindPw(false);
                setChangePw(true);
              }}
            >
              비밀번호 재설정
            </ChangeBtn>
          )
        ) : null}
      </ContentContainer>
    </Container>
  );
};

export default FindPw;
