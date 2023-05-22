import { useState } from 'react';
import styled from 'styled-components';
import { adminApi } from 'api';
import { CgArrowsExchange } from 'react-icons/cg';
import CancelUsers from './CancelUsers';

const Container = styled.div`
  ${(props) => props.theme.flexStartCenter}
  width: 100%;
  height: 50px;
  font-size: 12px;
  border-bottom: 1px solid lightgray;
`;

const TableCell = styled.div`
  @media only screen and (max-width: 768px) {
    width: 120px;
  }
  ${(props) => props.theme.columnCenter};
  width: ${(props) => props.widthProp};
`;

const ChangeGender = styled.div`
  ${(props) => props.theme.flexCenter}
  font-size: 18px;
  margin-top: 3px;
`;

const TableList = ({
  id,
  state,
  name,
  gender,
  age,
  place,
  username,
  joined,
  phone_number,
  match_cancel,
  movie_cancel,
  // payment_cancel,
  getData,
}) => {
  const [open, setOpen] = useState(false);
  const [cancelUsersData, setCancelUsersData] = useState([]);

  const changeGender = async () => {
    if (confirm('성별을 변경하시겠습니까?')) {
      try {
        await adminApi.changeGender({
          user_id: id,
          sex: gender === 'male' ? 'female' : 'male',
        });
        getData();
      } catch {
        alert('Error');
      }
    } else {
      alert('취소되었습니다.');
    }
  };

  const checkCancelUsers = async (id) => {
    const { data } = await adminApi.getCancelUsers(id);
    setCancelUsersData(data);
    setOpen(true);
  };

  const closeCancelUsers = () => {
    setOpen(false);
  };

  return (
    <Container>
      <TableCell widthProp={'10%'} style={{ cursor: 'pointer' }}>
        {gender === 'male' ? '남자' : '여자'}
        {state === 'standby' && (
          <ChangeGender onClick={changeGender}>
            <CgArrowsExchange />
          </ChangeGender>
        )}
      </TableCell>
      <TableCell widthProp={'10%'}>{name}</TableCell>
      <TableCell widthProp={'5%'}>{age}</TableCell>
      <TableCell widthProp={'10%'}>{place}</TableCell>
      <TableCell widthProp={'15%'}>{username}</TableCell>
      <TableCell widthProp={'15%'}>{phone_number}</TableCell>
      <TableCell widthProp={'15%'}>{joined}</TableCell>
      <TableCell
        widthProp={'10%'}
        onClick={() => checkCancelUsers(id)}
        style={{ cursor: 'pointer' }}
      >
        {match_cancel}
      </TableCell>
      <TableCell widthProp={'10%'}>{movie_cancel}</TableCell>
      {open && (
        <CancelUsers
          closeCancelUsers={closeCancelUsers}
          cancelUsersData={cancelUsersData}
        />
      )}
    </Container>
  );
};

export default TableList;
