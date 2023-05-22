import { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';
import { connect } from 'react-redux';
import { adminLogin } from 'redux/store';
import SideBar from './MobileSideBar';
// import { RiHome2Line } from 'react-icons/ri';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

const Container = styled.header`
  ${(props) => props.theme.flexCenter}
  display: ${(props) => (props.loggedProp ? 'flex' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  background-color: ${(props) => props.theme.adminMainColor};
  box-shadow: 1px 4px 12px 1px rgba(0, 0, 0, 0.1);
  width: 100vw;
  height: ${(props) => props.theme.adminHeaderHeight};
  color: ${(props) => props.theme.whiteColor};
  z-index: 99;
`;

const Content = styled.div`
  ${(props) => props.theme.flexBetweenCenter}
  width: 95%;
`;

const Title = styled.div`
  @media only screen and (max-width: 768px) {
    font-size: 18px;
  }
  ${(props) => props.theme.flexStartCenter}
  font-size: 20px;
  cursor: pointer;
`;

const RightContent = styled.div`
  ${(props) => props.theme.flexCenter}
`;

const Logout = styled.div`
  @media only screen and (max-width: 768px) {
    font-size: 12px;
  }
  ${(props) => props.theme.flexEndCenter}
  cursor: pointer;
`;

const Icon = styled.div`
  @media only screen and (max-width: 768px) {
    ${(props) => props.theme.flexCenter}
    margin-left: 40px;
  }
  display: none;
  margin-bottom: 1.5px;
  margin-left: 50px;
  font-size: 20px;
  cursor: pointer;
`;

const Header = ({ admin: { logged }, dispatch }) => {
  const [open, setOpen] = useState(false);

  const toggleSideBar = () => setOpen(!open);

  const closeSideBar = () => setOpen(false);

  const router = useRouter();

  const logout = async () => {
    await axios.post('/api/adminLogout');
    dispatch(adminLogin({ token: null, logged: false }));
    router.push('/admin/login');
  };

  return (
    <Container loggedProp={logged}>
      <Content>
        <Link href='/admin'>
          <Title>장르는 로맨스 관리자</Title>
        </Link>
        <RightContent>
          <Logout onClick={logout}>로그아웃</Logout>
          {/* <Link href='/'>
            <Icon>
              <RiHome2Line />
            </Icon>
          </Link> */}
          <Icon onClick={toggleSideBar}>
            {open ? <AiOutlineClose /> : <AiOutlineMenu />}
          </Icon>
        </RightContent>
      </Content>
      <SideBar openProp={open} closeSideBar={closeSideBar} />
    </Container>
  );
};

export default connect((state) => state)(Header);
