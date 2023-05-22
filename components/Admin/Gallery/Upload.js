import { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { IoIosClose } from 'react-icons/io';
import { adminApi } from 'api';

const Container = styled.div`
  ${(props) => props.theme.flexCenter}
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.5);
  width: 100vw;
  height: 100vh;
  z-index: 98;
`;

const Content = styled.div`
  @media only screen and (max-width: 768px) {
    width: 300px;
  }
  ${(props) => props.theme.columnCenter}
  background-color: ${(props) => props.theme.whiteColor};
  box-shadow: 1px 4px 12px 1px rgba(0, 0, 0, 0.1);
  width: 500px;
  height: 500px;
  padding-top: 25px;
  overflow: auto;
`;

const CloseBtn = styled.div`
  ${(props) => props.theme.flexEndCenter}
  width: 90%;
  font-size: 36px;
  cursor: pointer;
`;

const Title = styled.div`
  ${(props) => props.theme.flexStartCenter}
  width: 90%;
  font-size: 20px;
`;

const UploadInfoContainer = styled.div`
  @media only screen and (max-width: 768px) {
    ${(props) => props.theme.columnCenter}
  }
  ${(props) => props.theme.flexCenter}
  border-top: 1px solid #dbdbdb;
  border-bottom: 1px solid #dbdbdb;
  width: 90%;
  margin-top: 20px;
  margin-bottom: 50px;
  padding: 50px 5px;
`;

const UploadInfo = styled.div`
  @media only screen and (max-width: 768px) {
    :first-child {
      margin-bottom: 50px;
    }
  }
  ${(props) => props.theme.columnCenter}
  width: 100%;
`;

const Gender = styled.div`
  font-size: 16px;
  color: ${(props) => props.theme.adminMainColor};
  margin-bottom: 20px;
`;

const TicketImage = styled(Image)`
  object-fit: cover;
`;

const NoImage = styled.div`
  ${(props) => props.theme.flexCenter}
  border: 1px solid #dbdbdb;
  width: 250px;
  height: 250px;
  opacity: 0.5;
  font-size: 12px;
`;

const Label = styled.label`
  ${(props) => props.theme.flexCenter}
  background-color: ${(props) => props.theme.adminMainColor};
  border-radius: 30px;
  width: 120px;
  height: 40px;
  margin: 25px;
  color: ${(props) => props.theme.whiteColor};
  font-size: 12px;
  cursor: pointer;
  :hover {
    opacity: 0.7;
    transition: opacity 0.3s ease-in-out;
  }
`;

const Input = styled.input`
  display: none;
`;

const CommentInput = styled.textarea`
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

const SubmitBtnContainer = styled.div`
  ${(props) => props.theme.flexCenter};
`;

const SubmitBtn = styled.div`
  ${(props) => props.theme.flexCenter}
  background-color: ${(props) => props.theme.adminMainColor};
  border-radius: 3px;
  width: 120px;
  padding: 15px 0;
  margin-bottom: 25px;
  color: ${(props) => props.theme.whiteColor};
  cursor: pointer;
  :hover {
    opacity: 0.7;
    transition: opacity 0.3s ease-in-out;
  }
`;

const Upload = ({ closeUpload, addGallery }) => {
  const [uploadInfo, setUploadInfo] = useState({
    previewURL: null,
    image: null,
    comment: '',
  });

  const handleImage = (e) => {
    let reader = new FileReader();
    let file = e.target.files[0];

    if (file) {
      reader.onloadend = () =>
        setUploadInfo({
          ...uploadInfo,
          previewURL: reader.result,
          image: file,
        });
      reader.readAsDataURL(file);
    }
  };

  const handleComment = (e) => {
    const comment = e.target.value;
    setUploadInfo({
      ...uploadInfo,
      comment,
    });
  };

  return (
    <Container>
      <Content>
        <CloseBtn>
          <IoIosClose onClick={closeUpload} />
        </CloseBtn>
        <Title>갤러리 추가</Title>
        <UploadInfoContainer>
          <UploadInfo>
            {uploadInfo.previewURL ? (
              <TicketImage
                src={uploadInfo.previewURL}
                alt="Ticket Image"
                width={250}
                height={250}
              />
            ) : (
              <NoImage>인증샷 사진을 업로드해주세요</NoImage>
            )}
            <Label htmlFor={'upload_gallery'}>인증샷 사진 업로드</Label>
            <Input id={'upload_gallery'} type="file" onChange={handleImage} />
            <CommentInput
              type="text"
              placeholder="한줄평을 입력해주세요."
              value={uploadInfo.comment}
              onChange={handleComment}
            />
          </UploadInfo>
        </UploadInfoContainer>
        <SubmitBtnContainer>
          <SubmitBtn
            onClick={() =>
              addGallery(uploadInfo.image, uploadInfo.comment, closeUpload)
            }
          >
            갤러리 추가
          </SubmitBtn>
        </SubmitBtnContainer>
      </Content>
    </Container>
  );
};

export default Upload;
