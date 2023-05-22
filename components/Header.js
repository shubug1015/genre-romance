import styled from 'styled-components';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IoIosMenu } from 'react-icons/io';
import MenuBar from './MenuBar';

const Container = styled.div`
  @media only screen and (min-width: 600px) {
    padding: 0 10%;
  }
  ${(props) => props.theme.flexBetweenCenter};
  position: fixed;
  top: ${(props) => (props.scrollDir ? '-65px' : '0')};
  left: 0;
  background-color: transparent;
  width: 100vw;
  height: ${(props) => props.theme.headerHeight};
  padding: 0 20px;
  transition: top 0.3s ease-in-out;
  z-index: 99;
`;

const LogoImage = styled.div`
  position: relative;
  width: 121px;
  height: 41px;
  cursor: pointer;
`;

const MenuIcon = styled.div`
  color: ${(props) => props.theme.mainColor};
  cursor: pointer;
`;

const Header = () => {
  const useScrollDir = () => {
    const [scrollDir, setScrollDir] = useState('top');
    const [flag, setFlag] = useState(0);
    useEffect(() => {
      let lastScrollY = window.pageYOffset;
      let test = flag;
      const updateScrollDir = () => {
        if (test === 0) {
          setFlag(1);
        }
        const scrollY = window.pageYOffset;
        setScrollDir(
          window.scrollY === 0
            ? 'top'
            : scrollY > lastScrollY
            ? 'scroll down'
            : 'scroll up'
        );
        lastScrollY = scrollY > 0 ? scrollY : 0;
      };
      window.addEventListener('scroll', updateScrollDir);
      return () => window.removeEventListener('scroll', updateScrollDir);
    }, [scrollDir]);
    return { scrollDir, flag };
  };

  const scrollDir = useScrollDir().scrollDir;

  const [open, setOpen] = useState(false);

  const openMenu = () => setOpen(true);

  const closeMenu = () => setOpen(false);

  return (
    <Container scrollDir={scrollDir === 'scroll down'}>
      <Link href='/'>
        <LogoImage>
          <Image
            src='/header_logo.png'
            alt='장르는 로맨스 로고'
            layout='fill'
            objectFit='cover'
          />
        </LogoImage>
      </Link>
      <MenuIcon>
        <IoIosMenu size={40} onClick={openMenu} />
      </MenuIcon>
      <MenuBar open={open} closeMenu={closeMenu} />
    </Container>
  );
};

export default Header;
