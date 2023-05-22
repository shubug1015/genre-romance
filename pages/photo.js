import styled from 'styled-components';
import Image from 'next/image';
import { useState } from 'react';
import { wrapper, userLogin } from 'redux/store';
import { userApi } from 'api';
import { useRouter } from 'next/router';
import cookies from 'next-cookies';
import { AiOutlinePlus } from 'react-icons/ai';
import { IoCloseOutline } from 'react-icons/io5';
import { handleRedirect } from 'state';
import Head from 'next/head';

const Container = styled.div`
  ${(props) => props.theme.columnCenter};
`;

const TextContainer = styled.div`
  ${(props) => props.theme.columnCenter};
  margin: 20px 0;
`;

const Title = styled.div`
  font-size: 32px;
  font-weight: 300;
  line-height: 1.4;
  font-family: 'Cafe24Oneprettynight';
`;

const TextSection = styled.div`
  ${(props) => props.theme.flexCenter};
  font-size: 14px;
  font-weight: 300;
  line-height: 24px;
`;

const Text = styled.div`
  opacity: 0.6;
`;

const HighLighted = styled.div`
  color: ${(props) => props.theme.mainColor};
  margin: 0 3px;
`;

const ImageContainer = styled.div`
  ${(props) => props.theme.columnCenter};
  margin: 60px 0;
`;

const ImageTitle = styled.div`
  font-size: 14px;
  opacity: 0.6;
  margin-bottom: 20px;
`;

const ImageSection = styled.div`
  ${(props) => props.theme.columnCenter};
  width: 180px;
  height: 240px;
  padding: 7.9px 7.7px 13.1px 8px;
  border-radius: 4px;
  box-shadow: 0 8px 20px 0 rgba(226, 83, 135, 0.16);
  background-color: #e25387;
  padding: 8px;
`;

const ShotImage = styled.div`
  position: relative;
  width: 164px;
  height: 164px;
  margin-bottom: 13px;
`;

const LogoImage = styled.div`
  position: relative;
  width: 120px;
  height: 40px;
`;

const TextAreaContainer = styled.form`
  ${(props) => props.theme.columnCenter};
  width: 100%;
`;

const TextAreaSection = styled.div`
  ${(props) => props.theme.columnCenter};
  width: 100%;
  margin: 40px 0;
`;

const SectionTitle = styled.div`
  @media only screen and (min-width: 600px) {
    ${(props) => props.theme.flexCenter};
  }
  ${(props) => props.theme.flexStartCenter};
  width: 100%;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 10px;
  color: ${(props) => props.theme.mainColor};
`;

const SectionText = styled.div`
  @media only screen and (min-width: 600px) {
    ${(props) => props.theme.flexCenter};
  }
  ${(props) => props.theme.flexStartCenter};
  width: 100%;
  font-size: 16px;
  opacity: 0.6;
  margin-bottom: 30px;
`;

const PhotoImage = styled.div`
  position: relative;
  width: 223px;
  height: 223px;
`;

const DeletePhoto = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  font-size: 40px;
  cursor: pointer;
`;

const Input = styled.input`
  display: none;
`;

const PhotoBtn = styled.label`
  ${(props) => props.theme.flexCenter};
  width: 120px;
  height: 45px;
  border-radius: 56px;
  background-color: #ffffff;
  color: #000000;
  font-size: 16px;
  cursor: pointer;
  margin-top: 30px;
`;

const TextArea = styled.textarea`
  @media only screen and (min-width: 600px) {
    width: 600px;
  }
  width: 100%;
  height: 90px;
  outline: none;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  background-color: transparent;
  color: #ffffff;
  font-size: 15px;
  font-weight: 500;
  padding: 15px;
  margin-top: 20px;
  line-height: 1.3;
`;

const SubmitBtn = styled.div`
  @media only screen and (min-width: 600px) {
    width: 600px;
  }
  ${(props) => props.theme.flexCenter};
  width: 100%;
  height: 55px;
  border-radius: 58px;
  box-shadow: 0 2px 12px 0 rgba(255, 57, 131, 0.32);
  background: linear-gradient(82deg, #f7215d 10%, #c52180 105%);
  font-size: 18px;
  cursor: pointer;
`;

const SkipBtn = styled.div`
  @media only screen and (min-width: 600px) {
    width: 600px;
  }
  ${(props) => props.theme.flexCenter};
  width: 100%;
  height: 55px;
  border-radius: 58px;
  background-color: #ffffff;
  border: 2px solid #333333;
  color: #333333;
  font-size: 18px;
  font-weight: 500;
  margin-top: 30px;
  cursor: pointer;
`;

const Photo = ({ token }) => {
  const [data, setData] = useState({
    image: '',
    review: '',
    account: '',
  });

  const [preview, setPreview] = useState(null);

  const { image, review, account } = data;

  const handleImage = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    if (file) {
      reader.onloadend = () => {
        setPreview(reader.result);
        setData({ ...data, image: file });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleReview = (e) => setData({ ...data, review: e.target.value });

  const handleAccount = (e) => setData({ ...data, account: e.target.value });

  const deletePhoto = () => {
    setPreview(null);
    setData({
      ...data,
      fifth: '',
    });
  };

  const router = useRouter();

  const handleSubmit = async () => {
    const data = new FormData();
    data.append('photo', image);
    data.append('comment', review);
    data.append('account_number', account);

    if (image === '' || review === '' || account === '') {
      alert('빈 칸이 있습니다.');
    } else {
      try {
        if (confirm('제출하시겠습니까?')) {
          await userApi.registPhoto(data, token);
          alert('제출되었습니다.');
          router.push('/');
        }
      } catch {
        alert('Error');
      }
    }
  };

  const skipPhoto = async () => {
    if (
      confirm(
        '인증샷을 건너뛰면 보증급 환급을 받을 수 없습니다. 건너뛰시겠습니까?'
      )
    ) {
      await userApi.skipPhoto(token);
      alert('건너뛰기 처리되었습니다.');
      router.push('/');
    }
  };

  return (
    <Container>
      <Head>
        <title>인증샷 작성 | 장르는로맨스</title>
        <meta
          name="description"
          content="장르는 로맨스의 인증샷 작성 페이지입니다."
        />
        <link rel="canonical" href="https://www.genreisromance.site/photo" />
      </Head>
      <Title>로맨스 인증샷을</Title>
      <Title>올려주세요!</Title>
      <TextContainer>
        <TextSection>
          <Text>실물티켓</Text>
          <HighLighted>두 장이 함께 나온 사진</HighLighted>
          <Text>을 올려주시면,</Text>
        </TextSection>
        <TextSection>
          <Text>보증금이 환급됩니다.</Text>
        </TextSection>
      </TextContainer>
      <ImageContainer>
        <ImageTitle>인증샷 예시</ImageTitle>
        <ImageSection>
          <ShotImage>
            <Image
              src="/Photo/shot_ex.jpg"
              alt="장르는 로맨스 인증샷 예시"
              layout="fill"
              objectFit="cover"
            />
          </ShotImage>
          <LogoImage>
            <Image
              src="/Photo/shot_logo.png"
              alt="장르는 로맨스 인증샷 로고"
              layout="fill"
              objectFit="cover"
            />
          </LogoImage>
        </ImageSection>
      </ImageContainer>
      <TextAreaContainer>
        <TextAreaSection>
          <SectionTitle>인증샷 업로드</SectionTitle>
          <SectionText>티켓 두 장이 함께 나온 사진을 올려주세요.</SectionText>
          {preview ? (
            <PhotoImage>
              <Image
                src={preview}
                alt="Ticket Image"
                layout="fill"
                objectFit="cover"
              />
              <DeletePhoto onClick={deletePhoto}>
                <IoCloseOutline />
              </DeletePhoto>
            </PhotoImage>
          ) : (
            <>
              <PhotoBtn htmlFor="user_image">
                <AiOutlinePlus size={20} />
                사진추가
              </PhotoBtn>
              <Input type="file" id="user_image" onChange={handleImage} />
            </>
          )}
        </TextAreaSection>
        <TextAreaSection>
          <SectionTitle>한줄평 남기기</SectionTitle>
          <TextArea
            type="text"
            placeholder="로맨스는 어떠셨나요?"
            value={review}
            onChange={handleReview}
          />
        </TextAreaSection>
        <TextAreaSection>
          <SectionTitle>환급 계좌번호</SectionTitle>
          <TextArea
            type="text"
            placeholder="110-110-110110 신한은행 김신한"
            value={account}
            onChange={handleAccount}
          />
        </TextAreaSection>
      </TextAreaContainer>
      <SubmitBtn onClick={handleSubmit}>제출하기</SubmitBtn>
      <SkipBtn onClick={skipPhoto}>건너뛰기</SkipBtn>
    </Container>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (ctx) => {
  const { user_data } = cookies(ctx);
  const store = ctx.store;

  if (user_data) {
    const { token, user_pk, sex } = user_data;

    if (token && user_pk && sex) {
      store.dispatch(userLogin({ logged: true, token, user_pk, sex }));

      const {
        data: { state, match_cancel, movie_cancel, payment_cancel },
      } = await userApi.getState(token);

      const destination = handleRedirect(
        state,
        match_cancel,
        movie_cancel,
        payment_cancel
      );

      if (ctx.resolvedUrl !== destination) {
        return {
          redirect: {
            destination,
            permanent: false,
          },
        };
      }
    } else {
      store.dispatch(
        userLogin({ logged: false, token: null, user_pk: null, sex: null })
      );
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }
  } else {
    store.dispatch(
      userLogin({ logged: false, token: null, user_pk: null, sex: null })
    );
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: { token: user_data && user_data.token ? user_data.token : null },
  };
});

export default Photo;
