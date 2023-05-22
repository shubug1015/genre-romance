import styled from 'styled-components';
import TableList from './TableList';
import Loader from 'components/Admin/Loader';

const Container = styled.div`
  @media only screen and (max-width: 768px) {
    width: 100vw;
  }
  ${(props) => props.theme.columnCenter}
  justify-content: center;
  width: ${(props) => `calc(100vw - ${props.theme.adminSideBarWidth})`};
  margin-bottom: 50px;
`;

const TableContainer = styled.div`
  border-radius: 3px;
  box-shadow: 1px 4px 12px 1px rgba(0, 0, 0, 0.1);
  width: 90%;
`;

const Title = styled.div`
  @media only screen and (max-width: 768px) {
    ${(props) => props.theme.columnStartCenter};
    justify-content: center;
    height: 210px;
  }
  ${(props) => props.theme.flexBetweenCenter};
  border-bottom: 1px solid #dbdbdb;
  width: 100%;
  height: 70px;
  padding-left: 15px;
  padding-right: 15px;
  font-size: 16px;
`;

const Filter = styled.div`
  @media only screen and (max-width: 768px) {
    ${(props) => props.theme.columnStartCenter};
    margin-top: 20px;
  }
  ${(props) => props.theme.flexEndCenter}
`;

const Input = styled.input`
  @media only screen and (max-width: 768px) {
    width: 60px;
  }
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
  width: 80px;
  height: 30px;
  padding-left: 10px;
  outline: none;
`;

const SelectBtn = styled.div`
  @media only screen and (max-width: 768px) {
    flex-direction: column;
  }
  display: flex;
  justify-content: space-between;
`;

const Select = styled.select`
  @media only screen and (max-width: 768px) {
    margin-left: 0px;
    margin-top: 15px;
    width: 140px;
  }
  :invalid {
    color: #8e8e8e;
  }
  width: 120px;
  height: 30px;
  font-size: 14px;
  padding-left: 10px;
  margin-left: 30px;
  margin-right: 30px;
  margin-top: 2px;
  background-color: transparent;
  border: 1px solid rgba(0, 0, 0, 0.5);
  outline: none;
  cursor: pointer;
  color: black;
`;

const Option = styled.option`
  width: 100px;
  height: 10px;
  outline: none;
  padding-left: 10px;
  background-color: white;
  color: black;
`;

const TabelContent = styled.div`
  @media only screen and (max-width: 768px) {
    overflow-x: scroll;
  }
`;

const TableHeader = styled.div`
  @media only screen and (max-width: 768px) {
    width: 1080px;
  }
  ${(props) => props.theme.flexStartCenter}
  border-bottom: 1px solid #dbdbdb;
  width: 100%;
  height: 50px;
  font-size: 12px;
  opacity: 0.8;
`;

const TableCell = styled.div`
  @media only screen and (max-width: 768px) {
    width: 120px;
  }
  ${(props) => props.theme.flexCenter};
  width: ${(props) => props.widthProp};
  line-height: 18px;
`;

const TableListContainer = styled.div`
  @media only screen and (max-width: 768px) {
    width: 1080px;
  }
  width: 100%;
  height: 500px;
  overflow-x: scroll;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    /* 세로 스크롤 넓이 */
    width: 4px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.4);
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 6px;
  }
`;

const NoData = styled.div`
  ${(props) => props.theme.flexCenter}
  width: 100%;
  height: 300px;
  opacity: 0.7;
`;

const LoaderContainer = styled.div`
  ${(props) => props.theme.flexCenter}
  width: 100%;
  height: 300px;
`;

const Btn = styled.div`
  @media only screen and (max-width: 768px) {
    margin-top: 15px;
  }
  ${(props) => props.theme.flexCenter}
  border: 2px solid ${(props) => props.theme.adminMainColor};
  border-radius: 3px;
  width: 100px;
  height: 35px;
  margin-top: 0px;
  color: ${(props) => props.theme.adminMainColor};
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
  :hover {
    opacity: 0.7;
    transition: opacity 0.3s ease-in-out;
  }
`;

const ResetBtn = styled.div`
  @media only screen and (max-width: 768px) {
    margin-top: 15px;
  }
  ${(props) => props.theme.flexCenter}
  background-color: #dbdbdb;
  border: 2px solid #dbdbdb;
  border-radius: 3px;
  width: 100px;
  height: 35px;
  margin-left: 10px;
  margin-top: 0px;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
  :hover {
    opacity: 0.7;
    transition: opacity 0.3s ease-in-out;
  }
`;

const Table = ({
  getData,
  type,
  userData,
  filter,
  handleFirstAge,
  handleLastAge,
  handlePlace,
  submitFilter,
  loading,
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

  const resetFilter = {
    firstAge: '',
    lastAge: '',
    place: '',
  };

  return (
    <Container>
      <TableContainer>
        <Title>
          <div>
            {type} ({userData.length})
          </div>
          <Filter>
            <div>
              <Input
                type="text"
                placeholder="나이"
                value={filter.firstAge}
                onChange={(e) => handleFirstAge(e.target.value)}
              />
              <span style={{ margin: '0 5px' }}>~</span>
              <Input
                type="text"
                placeholder="나이"
                value={filter.lastAge}
                onChange={(e) => handleLastAge(e.target.value)}
              />
            </div>
            <SelectBtn>
              <Select
                required
                defaultValue=""
                onChange={(e) => handlePlace(e.target.value)}
              >
                <Option value="" disabled>
                  지역
                </Option>
                {placeList.map((p) => (
                  <Option key={p}>{p}</Option>
                ))}
              </Select>
              <div
                style={{
                  display: 'flex',
                }}
              >
                <Btn onClick={() => submitFilter(filter)}>필터 적용</Btn>
                <ResetBtn onClick={() => submitFilter(resetFilter)}>
                  초기화
                </ResetBtn>
              </div>
            </SelectBtn>
          </Filter>
        </Title>
        <TabelContent>
          <TableHeader>
            <TableCell widthProp={'10%'}>성별</TableCell>
            <TableCell widthProp={'10%'}>이름</TableCell>
            <TableCell widthProp={'5%'}>나이</TableCell>
            <TableCell widthProp={'10%'}>지역</TableCell>
            <TableCell widthProp={'15%'}>아이디</TableCell>
            <TableCell widthProp={'15%'}>핸드폰 번호</TableCell>
            <TableCell widthProp={'15%'}>가입일</TableCell>
            <TableCell widthProp={'10%'}>제안 거절</TableCell>
            <TableCell widthProp={'10%'}>영화 거절</TableCell>
          </TableHeader>
          <TableListContainer>
            {loading ? (
              <LoaderContainer>
                <Loader />
              </LoaderContainer>
            ) : userData && userData.length > 0 ? (
              userData.map((u) => (
                <TableList
                  key={u.id}
                  id={u.id}
                  state={u.state}
                  name={u.name}
                  gender={u.sex}
                  age={u.age}
                  place={u.place}
                  username={u.username}
                  joined={u.date_joined.substring(0, 10)}
                  phone_number={u.phone_number}
                  match_cancel={u.match_cancel_count}
                  movie_cancel={u.movie_cancel_count}
                  payment_cancel={u.payment_cancel_count}
                  getData={getData}
                />
              ))
            ) : (
              <NoData>회원이 존재하지 않습니다.</NoData>
            )}
          </TableListContainer>
        </TabelContent>
      </TableContainer>
    </Container>
  );
};

export default Table;
