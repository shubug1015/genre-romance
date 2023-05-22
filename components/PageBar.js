import { useState } from 'react';
import styled from 'styled-components';
import {
  CgChevronDoubleLeft,
  CgChevronLeft,
  CgChevronRight,
  CgChevronDoubleRight,
} from 'react-icons/cg';
import { useRouter } from 'next/router';

const Container = styled.div`
  ${(props) => props.theme.flexAroundCenter}
  width: 200px;
  margin-top: 50px;
  margin-bottom: 50px;
`;

const Icon = styled.div`
  ${(props) => props.theme.flexCenter}
  width: 20px;
  font-size: 10px;
  cursor: pointer;
  :hover {
    opacity: 0.7;
    transition: opacity 0.3s ease-in-out;
  }
`;

const PageNum = styled.div`
  ${(props) => props.theme.flexCenter}
  width: 22px;
  font-size: 12px;
  opacity: ${(props) => (props.selected ? 1 : 0.5)};
  cursor: pointer;
  color: white;
`;

const PageBar = ({ itemNum, nowPage }) => {
  const items_in_page = 8;
  const maxPage =
    itemNum !== -1
      ? itemNum % items_in_page > 0
        ? Math.floor(itemNum / items_in_page) + 1
        : Math.floor(itemNum / items_in_page)
      : -1;

  const router = useRouter();
  const pathurl = router.pathname;

  const quo = Math.floor(nowPage / 5);
  const rem = nowPage % 5;

  const pageArray =
    rem === 0
      ? [...Array(5)]
          .map((_, index) => 5 * (quo - 1) + index + 1)
          .filter((i) => i <= maxPage)
      : [...Array(5)]
          .map((_, index) => 5 * quo + index + 1)
          .filter((i) => i <= maxPage);

  const [pages, setPages] = useState(pageArray);

  const applyPage = (pageNum) => {
    router.push(`${pathurl}?page=${pageNum}`);
  };

  const setPage = (pageNum) => {
    applyPage(pageNum);
  };

  const nextPage = () => {
    if (pages[pages.length - 1] < maxPage && maxPage > 5) {
      let tmp = pages.map((page) => page + 5);
      setPages(tmp.filter((page) => page <= maxPage));
    }
  };

  const prevPage = () => {
    let tmp = pages[0] - 5;
    if (pages[0] === 1) {
      setPages(pages);
    } else {
      setPages([...Array(5)].map((_, index) => index + tmp));
    }
  };

  const firstPage = () => {
    setPages([...Array(5)].map((_, index) => index + 1));
    applyPage(1);
  };

  const lastPage = () => {
    if (pages[pages.length - 1] < maxPage && maxPage > 5) {
      let tmp = pages.map((page) => page + 5);
      setPages(tmp.filter((page) => page <= maxPage));
    }
    applyPage(maxPage);
  };

  return (
    <Container>
      <Icon onClick={firstPage}>
        <CgChevronDoubleLeft />
      </Icon>
      <Icon onClick={prevPage}>
        <CgChevronLeft />
      </Icon>
      {pages.map((page) => (
        <PageNum
          key={page}
          onClick={() => setPage(page)}
          selected={page === nowPage}
        >
          {page}
        </PageNum>
      ))}
      <Icon onClick={nextPage}>
        <CgChevronRight />
      </Icon>
      <Icon onClick={lastPage}>
        <CgChevronDoubleRight />
      </Icon>
    </Container>
  );
};

export default PageBar;
