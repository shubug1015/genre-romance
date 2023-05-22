import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';
import { connect } from 'react-redux';
import { userLogin } from 'redux/store';
import { VscChromeClose } from 'react-icons/vsc';
import { userApi, galleryApi } from 'api';
import { AiOutlineHome, AiOutlineLogin, AiOutlineLogout } from 'react-icons/ai';

const Container = styled.div`
  @media only screen and (min-width: 600px) {
    width: 30vw;
    right: ${(props) => (props.open ? 0 : '-30vw')};
  }
  position: absolute;
  top: 0;
  right: ${(props) => (props.open ? 0 : '-100vw')};
  width: 100vw;
  height: 100vh;
  max-width: 100%;
  color: ${(props) => props.theme.whiteColor};
  transition: right 0.7s ease-in-out;
  background-image: url('/bg-pattern.png');
  border-left: 1px solid ${(props) => props.theme.mainColor};
`;

const Icon = styled.div`
  ${(props) => props.theme.flexEndCenter}
  width: 90%;
  height: ${(props) => props.theme.headerHeight};
  font-size: 30px;
  cursor: pointer;
  :hover {
    opacity: 0.7;
    transition: opacity 0.3s ease-in-out;
  }
`;

const UserSection = styled.div`
  ${(props) => props.theme.flexCenter}
  width: 100%;
  margin: 20px 0;
`;

const IconSection = styled.div`
  ${(props) => props.theme.columnCenter};
`;

const UserIcon = styled.div`
  ${(props) => props.theme.columnCenter};
  cursor: pointer;
  margin: 0 10px;
  width: 80px;
`;

const UserText = styled.div`
  font-size: 14px;
  margin-top: 5px;
`;

const MiddleMenu = styled.div`
  ${(props) => props.theme.columnCenter}
  width: 100%;
  margin-top: 100px;
`;

const Item = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 22px;
  font-weight: 500;
  :not(:last-child) {
    margin-bottom: 8.5vh;
  }
  :hover {
    opacity: 0.6;
    transition: opacity 0.3s ease-in-out;
  }
  cursor: pointer;
  font-family: 'Cafe24Oneprettynight';
`;

const BottomMenu = styled.div`
  ${(props) => props.theme.flexCenter};
  width: 100%;
  margin-top: 80px;
`;

const BottomItem = styled.div`
  font-size: 14px;
  opacity: 0.8;
  margin: 0 7px;
  cursor: pointer;
`;

const MenuBar = ({
  open,
  closeMenu,
  user: { logged },
  user: { token },
  dispatch,
}) => {
  const router = useRouter();

  const logout = async () => {
    await axios.post('/api/userLogout');
    dispatch(
      userLogin({ logged: false, token: null, user_pk: null, sex: null })
    );
    router.push('/');
    closeMenu();
  };

  const [userState, setUserState] = useState({
    state: null,
    match_cancel: null,
    movie_cancel: null,
    payment_cancel: null,
  });

  const [galleryState, setGalleryState] = useState(null);

  const getState = async () => {
    if (logged) {
      try {
        const { data } = await userApi.getState(token);
        setUserState({
          state: data.state,
          match_cancel: data.match_cancel,
          movie_cancel: data.movie_cancel,
          payment_cancel: data.payment_cancel,
        });
      } catch {
        alert('Error');
      }
    } else {
      return;
    }
  };

  const getGalleryState = async () => {
    try {
      const {
        data: { activation },
      } = await galleryApi.galleryState();
      setGalleryState(activation);
    } catch {
      alert('Error');
    }
  };

  useEffect(() => {
    getState();
    getGalleryState();
  }, [open]);

  return (
    <>
      <Container open={open}>
        <Icon>
          <VscChromeClose onClick={closeMenu} />
        </Icon>
        {logged ? (
          <UserSection>
            <UserIcon onClick={closeMenu}>
              <Link href="/main">
                <IconSection>
                  <AiOutlineHome size={25} />
                  <UserText>메인</UserText>
                </IconSection>
              </Link>
            </UserIcon>
            <UserIcon onClick={logout}>
              <AiOutlineLogout size={25} />
              <UserText>로그아웃</UserText>
            </UserIcon>
          </UserSection>
        ) : (
          <UserSection>
            <UserIcon onClick={closeMenu}>
              <Link href="/">
                <IconSection>
                  <AiOutlineHome size={25} />
                  <UserText>메인</UserText>
                </IconSection>
              </Link>
            </UserIcon>
            <UserIcon onClick={closeMenu}>
              <Link href="login">
                <IconSection>
                  <AiOutlineLogin size={25} />
                  <UserText>로그인</UserText>
                </IconSection>
              </Link>
            </UserIcon>
          </UserSection>
        )}
        <MiddleMenu>
          <Item onClick={closeMenu}>
            <Link href={logged ? '/' : '/login'}>나의 현황</Link>
          </Item>
          {/* <Item
            onClick={() => {
              handleUrl();
              closeMenu();
            }}
          >
            나의 현황
          </Item> */}
          {galleryState === 'True' ? (
            <Item onClick={closeMenu}>
              <Link href="/gallery?page=1">로맨스 갤러리</Link>
            </Item>
          ) : (
            <Item onClick={() => alert('게시판 준비중입니다 :)')}>
              로맨스 갤러리
            </Item>
          )}
        </MiddleMenu>
        <BottomMenu>
          <BottomItem onClick={closeMenu}>
            <Link href="/privacy">개인정보처리방침</Link>
          </BottomItem>
          <BottomItem onClick={closeMenu}>
            <Link href="/agreement">이용약관</Link>
          </BottomItem>
        </BottomMenu>
      </Container>
    </>
  );
};

export default connect((state) => state)(MenuBar);
