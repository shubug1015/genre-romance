import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Container = styled.header`
  @media only screen and (max-width: 768px) {
    display: none;
  }
  ${(props) => props.theme.columnCenter};
  position: fixed;
  top: ${(props) => props.theme.adminHeaderHeight};
  left: 0;
  border-right: 1px solid #dbdbdb;
  width: ${(props) => props.theme.adminSideBarWidth};
  height: ${(props) => `calc(100vh - ${props.theme.adminHeaderHeight})`};
  z-index: 98;
`;

const Content = styled.div`
  ${(props) => props.theme.columnCenter};
  width: 80%;
  margin-top: 25px;
`;

const Btn = styled.div`
  margin: 30px 0;
  color: ${(props) => props.current && props.theme.adminMainColor};
  transition: color 0.3s ease-in-out;
  font-size: 15px;
  cursor: pointer;
`;

const Sidebar = () => {
  const router = useRouter();
  const location = router.pathname;

  const items = [
    {
      id: 0,
      name: '전체 회원',
      url: '/admin',
    },
    {
      id: 1,
      name: '회원 매칭',
      url: '/admin/match_users',
    },
    {
      id: 2,
      name: '매칭 관리',
      url: '/admin/matched_users',
    },
    {
      id: 3,
      name: '보증금 환급',
      url: '/admin/refund',
    },
    {
      id: 4,
      name: '게시판 관리',
      url: '/admin/gallery',
    },
    {
      id: 5,
      name: '통계',
      url: '/admin/analytics',
    },
  ];

  return (
    <Container>
      <Content>
        {items &&
          items.length > 0 &&
          items.map((item) => (
            <Link key={item.id} href={item.url}>
              <Btn
                current={
                  location.includes('/admin/analytics')
                    ? location.includes(item.url) && item.url !== '/admin'
                    : location === item.url
                }
              >
                {item.name}
              </Btn>
            </Link>
          ))}
      </Content>
    </Container>
  );
};

export default Sidebar;
