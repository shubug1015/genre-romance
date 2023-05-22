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
  margin-bottom: 70px;
  color: ${(props) => props.theme.adminMainColor};
  font-size: 28px;
`;

const Users = ({ getData, submitFilter, data, loading }) => {
  const [filter, setFilter] = useState({
    firstAge: '',
    lastAge: '',
    place: '',
  });

  const handleFirstAge = (firstAge) => {
    setFilter({ ...filter, firstAge });
  };

  const handleLastAge = (lastAge) => {
    setFilter({ ...filter, lastAge });
  };

  const handlePlace = (place) => {
    setFilter({ ...filter, place });
  };

  return (
    <Container>
      <Title>전체 회원</Title>
      <Table
        type={'전체 회원'}
        getData={getData}
        userData={data}
        filter={filter}
        handleFirstAge={handleFirstAge}
        handleLastAge={handleLastAge}
        handlePlace={handlePlace}
        submitFilter={submitFilter}
        loading={loading}
      />
    </Container>
  );
};

export default Users;
