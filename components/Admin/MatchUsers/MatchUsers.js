import { useState } from 'react';
import styled from 'styled-components';
import Table from './Table';

const Container = styled.div`
  @media only screen and (max-width: 768px) {
    width: 100vw;
  }
  ${(props) => props.theme.columnCenter}
  justify-content: center;
  width: ${(props) => `calc(100vw - ${props.theme.adminSideBarWidth})`};
  padding-top: 50px;
`;

const Title = styled.div`
  width: 90%;
  margin-bottom: 10px;
  color: ${(props) => props.theme.adminMainColor};
  font-size: 28px;
`;

const BtnContainer = styled.div`
  ${(props) => props.theme.flexEndCenter}
  width: 90%;
  height: 40px;
  margin-bottom: 20px;
`;

const Btn = styled.div`
  ${(props) => props.theme.flexCenter}
  background-color: ${(props) => props.theme.adminMainColor};
  border-radius: 3px;
  width: 120px;
  height: 40px;
  color: ${(props) => props.theme.whiteColor};
  font-size: 12px;
  cursor: pointer;
  :hover {
    opacity: 0.7;
    transition: opacity 0.3s ease-in-out;
  }
`;

const MatchUsers = ({
  male,
  female,
  checkedMaleId,
  checkedFemaleId,
  checkMale,
  checkFemale,
  matchUsers,
  rejectUser,
  submitFilter,
  loading,
}) => {
  const [maleFilter, setMaleFilter] = useState({
    firstAge: '',
    lastAge: '',
    place: '',
  });

  const [femaleFilter, setFemaleFilter] = useState({
    firstAge: '',
    lastAge: '',
    place: '',
  });

  const handleFirstAge = (type, firstAge) => {
    if (type === '남자 회원') {
      setMaleFilter({ ...maleFilter, firstAge });
    } else {
      setFemaleFilter({ ...femaleFilter, firstAge });
    }
  };

  const handleLastAge = (type, lastAge) => {
    if (type === '남자 회원') {
      setMaleFilter({ ...maleFilter, lastAge });
    } else {
      setFemaleFilter({ ...femaleFilter, lastAge });
    }
  };

  const handlePlace = (type, place) => {
    if (type === '남자 회원') {
      setMaleFilter({ ...maleFilter, place });
    } else {
      setFemaleFilter({ ...femaleFilter, place });
    }
  };

  return (
    <Container>
      <Title>회원 매칭</Title>
      <BtnContainer>
        {checkedMaleId && checkedFemaleId && (
          <Btn onClick={matchUsers}>매칭</Btn>
        )}
      </BtnContainer>
      <Table
        type={'남자 회원'}
        userData={male}
        checkedId={checkedMaleId}
        checkUser={checkMale}
        rejectUser={rejectUser}
        maleFilter={maleFilter}
        femaleFilter={femaleFilter}
        handleFirstAge={handleFirstAge}
        handleLastAge={handleLastAge}
        handlePlace={handlePlace}
        submitFilter={submitFilter}
        loading={loading}
      />
      <Table
        type={'여자 회원'}
        userData={female}
        checkedId={checkedFemaleId}
        checkUser={checkFemale}
        rejectUser={rejectUser}
        maleFilter={maleFilter}
        femaleFilter={femaleFilter}
        handleFirstAge={handleFirstAge}
        handleLastAge={handleLastAge}
        handlePlace={handlePlace}
        submitFilter={submitFilter}
        loading={loading}
      />
    </Container>
  );
};

export default MatchUsers;
