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
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
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

const ResultSection = styled.div`
  ${(props) => props.theme.columnCenter};
  width: 100%;
  margin-top: 30px;
  border: 1px solid #ffffff;
`;

const ResultTitle = styled.div`
  ${(props) => props.theme.flexCenter};
  width: 100%;
  font-weight: 500;
  padding: 8px 0;
  background-color: #ffffff;
  color: #333333;
`;

const ResultValue = styled.div`
  ${(props) => props.theme.flexCenter};
  width: 100%;
  padding: 15px 0;
  border: 1px solid #ffffff;
  border-top: none;
`;

const FindId = ({ setFindId }) => {
  const [data, setData] = useState({
    name: '',
    phone_number: '',
  });

  const [userId, setUserId] = useState(null);

  const handleName = (e) => {
    setData({ ...data, name: e.target.value });
  };

  const handleNum = (e) => {
    setData({ ...data, phone_number: e.target.value });
  };

  const checkData = async () => {
    const { data: userData } = await userApi.findId(data);
    setUserId(userData);
  };

  return (
    <Container>
      <ContentContainer>
        <CloseSection>
          <AiOutlineClose
            size={20}
            style={{ cursor: 'pointer' }}
            onClick={() => setFindId(false)}
          />
        </CloseSection>
        <Title>아이디 찾기</Title>
        <InputContainer>
          <InputTitle>이름</InputTitle>
          <Input type='text' value={data.name} onChange={handleName} />
        </InputContainer>
        <InputContainer>
          <InputTitle>핸드폰번호</InputTitle>
          <Input
            type='tel'
            placeholder='01012345678'
            value={data.phone_number}
            onChange={handleNum}
          />
        </InputContainer>
        <Btn onClick={checkData}>조회하기</Btn>
        {userId && (
          <ResultSection>
            <ResultTitle>조회결과</ResultTitle>
            <ResultValue>
              {userId === 'no_account'
                ? '일치하는 아이디가 없습니다.'
                : userId.id}
            </ResultValue>
          </ResultSection>
        )}
      </ContentContainer>
    </Container>
  );
};

export default FindId;
