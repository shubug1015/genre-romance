import { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';

const Container = styled.div`
  ${(props) => props.theme.columnCenter}
  box-shadow: 1px 4px 12px 1px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  width: 300px;
  /* height: 590px; */
  margin: 20px 15px;
  font-size: 12px;
`;

const Content = styled.div`
  ${(props) => props.theme.columnCenter}
  position: relative;
  width: 100%;
  height: 100%;
`;

const Icon = styled.div`
  ${(props) => props.theme.flexEndCenter}
  width: 100%;
  padding: 10px;
  font-size: 18px;
`;

const TicketImage = styled(Image)`
  object-fit: cover;
`;

const Label = styled.label`
  ${(props) => props.theme.flexCenter}
  position: absolute;
  top: 45px;
  right: 30px;
  background-color: ${(props) => props.theme.adminMainColor};
  border-radius: 15px;
  padding: 7px 10px;
  color: ${(props) => props.theme.whiteColor};
  font-size: 10px;
  cursor: pointer;
  :hover {
    opacity: 0.7;
    transition: opacity 0.3s ease-in-out;
  }
`;

const Input = styled.input`
  display: none;
`;

const Comment = styled.div`
  width: 250px;
  height: 80px;
  margin-top: 20px;
  padding: 6px;
  line-height: 18px;
  white-space: pre-line;
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

const EditComment = styled.textarea`
  border: 1px solid #dbdbdb;
  width: 250px;
  height: 80px;
  margin-top: 20px;
  padding: 5px;
  font-family: 'S-CoreDream-4Regular';
  font-size: 12px;
  line-height: 18px;
  white-space: pre-line;
`;

const BtnContainer = styled.div`
  ${(props) => props.theme.flexCenter}
  width: 100%;
  height: 30px;
  margin: 10px 0;
`;

const Btn = styled.div`
  ${(props) => props.theme.flexCenter}
  background-color: ${(props) => props.theme.adminMainColor};
  border-radius: 3px;
  width: 80px;
  height: 30px;
  color: ${(props) => props.theme.whiteColor};
  font-size: 12px;
  cursor: pointer;
  :hover {
    opacity: 0.7;
    transition: opacity 0.3s ease-in-out;
  }
`;

const TableList = ({ id, photo, comment, editGallery, deleteGallery }) => {
  const [edit, setEdit] = useState(false);

  const [updatedComment, setUpdatedComment] = useState(comment);

  const [updatedTicket, setUpdatedTicket] = useState({
    previewURL: photo,
    image: null,
  });

  const toggleEdit = () => setEdit(!edit);

  const closeEdit = () => setEdit(false);

  const handleImage = (e) => {
    let reader = new FileReader();
    let file = e.target.files[0];

    if (file) {
      reader.onloadend = () =>
        setUpdatedTicket({ previewURL: reader.result, image: file });
      reader.readAsDataURL(file);
    }
  };

  const handleComment = (e) => setUpdatedComment(e.target.value);

  return (
    <Container>
      <Content>
        <Icon>
          <AiOutlineEdit
            onClick={toggleEdit}
            style={{ cursor: 'pointer', marginRight: '10px' }}
          />
          <AiOutlineDelete
            onClick={() => deleteGallery(id)}
            style={{ cursor: 'pointer' }}
          />
        </Icon>
        <TicketImage
          src={updatedTicket.previewURL}
          alt="gallery"
          width={250}
          height={250}
        />
        {edit ? (
          <>
            <Label htmlFor={`ticket${id}`}>인증샷 수정</Label>
            <Input id={`ticket${id}`} type="file" onChange={handleImage} />
            <EditComment
              placeholder="한줄평 남기기"
              value={updatedComment}
              onChange={handleComment}
            />
          </>
        ) : (
          <Comment>{comment}</Comment>
        )}
        <BtnContainer>
          {edit && (
            <Btn
              onClick={() =>
                editGallery(id, updatedTicket.image, updatedComment, closeEdit)
              }
            >
              저장
            </Btn>
          )}
        </BtnContainer>
      </Content>
    </Container>
  );
};

export default TableList;
