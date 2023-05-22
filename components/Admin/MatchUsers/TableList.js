import { useState } from 'react';
import styled from 'styled-components';
import { adminApi } from 'api';
import Profile from './Profile';
import { AiOutlineCheck } from 'react-icons/ai';
import CancelUsers from './CancelUsers';

const Container = styled.div`
  ${(props) => props.theme.flexStartCenter}
  width: 100%;
  height: 50px;
  font-size: 12px;
  border-bottom: 1px solid lightgray;
  cursor: pointer;
  :hover {
    background-color: rgba(54, 139, 250, 0.1);
    transition: background-color 0.3s ease-in-out;
  }
`;

const Check = styled.div`
  @media only screen and (max-width: 768px) {
    width: 120px;
  }
  ${(props) => props.theme.flexCenter};
  width: 10%;
`;

const CheckBox = styled.input`
  display: none;
`;

const CheckLabel = styled.label`
  ${(props) => props.theme.flexCenter};
  background-color: ${(props) =>
    props.checkedProp ? props.theme.adminMainColor : 'transparent'};
  border: ${(props) => (props.checkedProp ? 'none' : '2px solid #727272')};
  border-radius: 3px;
  width: 18px;
  height: 18px;
  cursor: pointer;
  :hover {
    opacity: 0.8;
    transition: opacity 0.3s ease-in-out;
  }
`;

const Icon = styled.div`
  display: ${(props) => !props.checkedProp && 'none'};
  color: ${(props) => props.checkedProp && props.theme.whiteColor};
  font-size: 12px;
`;

const TableCell = styled.div`
  @media only screen and (max-width: 768px) {
    width: 120px;
  }
  ${(props) => props.theme.flexCenter};
  width: ${(props) => props.widthProp};
`;

const TableList = ({
  id,
  name,
  // gender,
  username,
  age,
  place,
  // joined,
  phone_number,
  match_cancel,
  movie_cancel,
  // payment_cancel,
  profile,
  checkUser,
  checkedId,
  rejectUser,
}) => {
  const [profilePopup, setProfilePopup] = useState(false);

  const [profileData, setProfileData] = useState([
    {
      id: 0,
      title: '#인생.영화는',
      content: profile.best_movie,
    },
    {
      id: 1,
      title: '#저란.사람은',
      content: profile.about_me,
    },
    {
      id: 2,
      title: '#제.이상형은',
      content: profile.ideal_type,
    },
    {
      id: 3,
      title: '#부끄럽지만.제매력은',
      content: profile.my_appeal,
    },
    {
      id: 4,
      title: '#이.영화.어떠세요',
      content: profile.movie_suggest,
    },
    {
      id: 5,
      title: '#안녕하세요',
      content: profile.greeting,
    },
  ]);

  const openProfile = () => setProfilePopup(true);

  const closeProfile = () => setProfilePopup(false);

  const handleContent = (e, id) => {
    const content = e.target.value;
    setProfileData(
      profileData.map((p) => ({
        ...p,
        content: p.id === id ? content : p.content,
      }))
    );
  };

  const handleSubmit = async () => {
    if (confirm('회원 프로필을 수정하시겠습니까?')) {
      try {
        const data = {
          user_id: id,
          best_movie: profileData[0].content,
          about_me: profileData[1].content,
          ideal_type: profileData[2].content,
          my_appeal: profileData[3].content,
          movie_suggest: profileData[4].content,
          greeting: profileData[5].content,
        };
        await adminApi.editUserProfile(data);
        alert('수정이 완료되었습니다.');
        setProfilePopup(false);
      } catch {
        alert('Error');
      }
    } else {
      alert('수정이 취소되었습니다.');
    }
  };

  const [open, setOpen] = useState(false);
  const [cancelUsersData, setCancelUsersData] = useState([]);

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
      <Check>
        <CheckBox
          id={`check_label${id}`}
          type="checkbox"
          onClick={() => checkUser(id)}
          checked={checkedId === id ? true : false}
          onChange={() => null}
        />
        <CheckLabel htmlFor={`check_label${id}`} checkedProp={checkedId === id}>
          <Icon checkedProp={checkedId === id}>
            <AiOutlineCheck />
          </Icon>
        </CheckLabel>
      </Check>
      <TableCell widthProp={'15%'} onClick={openProfile}>
        {name}
      </TableCell>
      <TableCell widthProp={'5%'} onClick={openProfile}>
        {age}
      </TableCell>
      <TableCell widthProp={'10%'} onClick={openProfile}>
        {place}
      </TableCell>
      <TableCell widthProp={'15%'} onClick={openProfile}>
        {username}
      </TableCell>
      <TableCell widthProp={'15%'} onClick={openProfile}>
        {phone_number}
      </TableCell>
      <TableCell widthProp={'15%'} onClick={() => checkCancelUsers(id)}>
        {match_cancel}
      </TableCell>
      <TableCell widthProp={'15%'} onClick={openProfile}>
        {movie_cancel}
      </TableCell>
      {profilePopup && (
        <Profile
          id={id}
          photo={profile.photo}
          closeProfile={closeProfile}
          profileData={profileData}
          handleContent={handleContent}
          handleSubmit={handleSubmit}
          rejectUser={rejectUser}
        />
      )}
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
