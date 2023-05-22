import { useState } from 'react';
import styled from 'styled-components';
import TableList from './TableList';
import Upload from './Upload';
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
  ${(props) => props.theme.flexBetweenCenter};
  border-bottom: 1px solid #dbdbdb;
  width: 100%;
  height: 70px;
  padding: 0 15px;
  font-size: 16px;
`;

const TitleText = styled.div``;

const Btn = styled.div`
  ${(props) => props.theme.flexCenter}
  background-color: ${(props) => props.theme.adminMainColor};
  border-radius: 3px;
  width: 90px;
  height: 35px;
  color: ${(props) => props.theme.whiteColor};
  font-size: 12px;
  cursor: pointer;
  :hover {
    opacity: 0.7;
    transition: opacity 0.3s ease-in-out;
  }
`;

const TableListContainer = styled.div`
  @media only screen and (max-width: 768px) {
    ${(props) => props.theme.columnCenter}
  }
  ${(props) => props.theme.flexStartCenter}
  flex-wrap: wrap;
  width: 100%;
  padding: 30px 0;
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

const Table = ({ list, addGallery, editGallery, deleteGallery, loading }) => {
  const [uploadPopup, setUploadPopup] = useState(false);

  const openUpload = () => setUploadPopup(true);

  const closeUpload = () => setUploadPopup(false);

  return (
    <Container>
      <TableContainer>
        <Title>
          <TitleText>게시판 리스트 ({list.length})</TitleText>
          <Btn onClick={openUpload}>추가</Btn>
        </Title>
        <TableListContainer>
          {loading ? (
            <LoaderContainer>
              <Loader />
            </LoaderContainer>
          ) : list && list.length > 0 ? (
            list.map((l) => (
              <TableList
                key={l.id}
                id={l.id}
                photo={l.photo}
                comment={l.comment}
                editGallery={editGallery}
                deleteGallery={deleteGallery}
              />
            ))
          ) : (
            <NoData>게시판이 존재하지 않습니다.</NoData>
          )}
        </TableListContainer>
      </TableContainer>
      {uploadPopup && (
        <Upload closeUpload={closeUpload} addGallery={addGallery} />
      )}
    </Container>
  );
};

export default Table;
