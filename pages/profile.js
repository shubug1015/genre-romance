import styled from 'styled-components';
import Image from 'next/image';
import { AiOutlinePlus } from 'react-icons/ai';
import { IoCloseOutline } from 'react-icons/io5';
import { useState, useEffect } from 'react';
import { userApi } from 'api';
import { wrapper, userLogin } from 'redux/store';
import { useRouter } from 'next/router';
import cookies from 'next-cookies';
import { handleRedirect } from 'state';
import Head from 'next/head';

const Container = styled.div`
  ${(props) => props.theme.columnCenter};
  width: 100vw;
  max-width: 100%;
`;

const MainImage = styled.div`
  @media only screen and (min-width: 600px) {
    width: 448px;
    height: 400px;
  }
  position: relative;
  width: 313px;
  height: 280px;
`;

const LogoImage = styled.div`
  position: relative;
  width: 180px;
  height: 30px;
  margin-top: 32px;
`;

const TextContainer = styled.div`
  ${(props) => props.theme.columnCenter};
  margin: 20px 0;
`;

const TextSection = styled.div`
  @media only screen and (min-width: 600px) {
    font-size: 14px;
  }
  ${(props) => props.theme.flexCenter};
  font-size: 12px;
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

const TicketingImage = styled.div`
  position: relative;
  width: 180px;
  height: 110px;
  margin: 70px 0;
`;

const TextAreaContainer = styled.form`
  @media only screen and (min-width: 600px) {
    width: 448px;
  }
  ${(props) => props.theme.columnCenter};
  width: 100%;
`;

const TextAreaSection = styled.div`
  ${(props) => props.theme.columnCenter};
  width: 100%;
  margin: 30px 0;
`;

const TitleSection = styled.div`
  ${(props) => props.theme.flexStartCenter};
  width: 100%;
`;

const TitleNum = styled.div`
  position: relative;
  width: 50px;
  height: 55px;
`;

const TitleText = styled.div`
  font-size: 24px;
  font-weight: 300;
  font-family: 'Cafe24Oneprettynight';
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 140px;
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
  font-family: 'Cafe24Oneprettynight';
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

const PhotoText = styled.div`
  font-size: 16px;
  font-weight: 300;
  opacity: 0.3;
  margin: 24px 0;
`;

const Input = styled.input`
  display: none;
`;

const MovieBtn = styled.div`
  ${(props) => props.theme.flexCenter};
  width: 150px;
  height: 45px;
  border-radius: 56px;
  background-color: #ffffff;
  color: #000000;
  font-size: 16px;
  cursor: pointer;
  margin: 10px 0;
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
  margin: 10px 0;
`;

const SaveBtn = styled.div`
  @media only screen and (min-width: 600px) {
    width: 400px;
    height: 60px;
  }
  ${(props) => props.theme.flexCenter};
  width: 100%;
  height: 55px;
  border-radius: 58px;
  background: #333333;
  margin-top: 50px;
  font-size: 18px;
  cursor: pointer;
`;

const SubmitBtn = styled.div`
  @media only screen and (min-width: 600px) {
    width: 400px;
    height: 60px;
  }
  ${(props) => props.theme.flexCenter};
  width: 100%;
  height: 55px;
  border-radius: 58px;
  box-shadow: 0 2px 12px 0 rgba(255, 57, 131, 0.32);
  background: linear-gradient(82deg, #f7215d 10%, #c52180 105%);
  margin-top: 20px;
  font-size: 18px;
  cursor: pointer;
`;

const Profile = ({ token }) => {
  const [data, setData] = useState({
    best_movie: '',
    about_me: '',
    ideal_type: '',
    my_appeal: '',
    photo: '',
    movie_suggest: '',
    greeting: '',
  });

  const [preview, setPreview] = useState(null);

  const getProfile = async () => {
    try {
      const { data } = await userApi.getProfile(token);
      if (data === 'no_profile') {
        setData({
          best_movie: '',
          about_me: '',
          ideal_type: '',
          my_appeal: '',
          photo: '',
          movie_suggest: '',
          greeting: '',
        });
      } else {
        setData({
          best_movie: data.best_movie,
          about_me: data.about_me,
          ideal_type: data.ideal_type,
          my_appeal: data.my_appeal,
          photo: 'photo_tmp',
          movie_suggest: data.movie_suggest,
          greeting: data.greeting,
        });
        setPreview(data.photo);
      }
    } catch {
      alert('Error');
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const {
    best_movie,
    about_me,
    ideal_type,
    my_appeal,
    photo,
    movie_suggest,
    greeting,
  } = data;

  const handleBestMovie = (e) => {
    setData({ ...data, best_movie: e.target.value });
  };
  const handleAboutMe = (e) => {
    setData({ ...data, about_me: e.target.value });
  };
  const handleIdealType = (e) => {
    setData({ ...data, ideal_type: e.target.value });
  };
  const handleMyAppeal = (e) => {
    setData({ ...data, my_appeal: e.target.value });
  };
  const handlePhoto = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    if (file) {
      reader.onloadend = () => {
        setPreview(reader.result);
        setData({ ...data, photo: file });
      };
      reader.readAsDataURL(file);
    }
  };
  const handleMovieSuggest = (e) => {
    setData({ ...data, movie_suggest: e.target.value });
  };
  const handleGreeting = (e) => {
    setData({ ...data, greeting: e.target.value });
  };

  const deletePhoto = () => {
    setPreview(null);
    setData({
      ...data,
      photo: '',
    });
  };

  const router = useRouter();

  const handleSave = async () => {
    const data = new FormData();
    data.append('best_movie', best_movie);
    data.append('about_me', about_me);
    data.append('ideal_type', ideal_type);
    data.append('my_appeal', my_appeal);
    if (photo === '') {
      data.append('photo', '');
    } else if (photo !== 'photo_tmp') {
      data.append('photo', photo);
    }
    data.append('movie_suggest', movie_suggest);
    data.append('greeting', greeting);
    data.append('temp', 'true');

    try {
      if (confirm('임시저장 하시겠습니까?')) {
        await userApi.registProfile(data, token);
        alert('임시저장되었습니다.');
        router.push('/');
      }
    } catch {
      alert('Error');
    }
  };

  const handleSubmit = async () => {
    const data = new FormData();
    data.append('best_movie', best_movie);
    data.append('about_me', about_me);
    data.append('ideal_type', ideal_type);
    data.append('my_appeal', my_appeal);
    if (photo !== 'photo_tmp') {
      data.append('photo', photo);
    }
    data.append('movie_suggest', movie_suggest);
    data.append('greeting', greeting);
    data.append('temp', 'false');

    if (
      best_movie === '' ||
      about_me === '' ||
      ideal_type === '' ||
      my_appeal === '' ||
      photo === '' ||
      movie_suggest === '' ||
      greeting === ''
    ) {
      alert('모든 내용을 입력해주세요.');
    } else {
      try {
        if (confirm('제출하시겠습니까?')) {
          await userApi.registProfile(data, token);
          alert('제출되었습니다.');
          router.push('/');
        }
      } catch {
        alert('Error');
      }
    }
  };

  const getImage = (source) => {
    if (source) {
      if (source.type === 'error') {
        setPreview(null);
      }
    }
  };

  return (
    <Container>
      <Head>
        <title>프로필 작성 | 장르는로맨스</title>
        <meta
          name="description"
          content="장르는 로맨스 프로필 작성 페이지입니다."
        />
        <link rel="canonical" href="https://www.genreisromance.site/profile" />
      </Head>
      <MainImage>
        <Image
          src="/Profile/boxoffice.png"
          alt="장르는 로맨스 박스오피스"
          layout="fill"
          objectFit="cover"
        />
      </MainImage>
      <LogoImage>
        <Image
          src="/Profile/logo_text.png"
          alt="장르는 로맨스 매표소"
          layout="fill"
          objectFit="cover"
        />
      </LogoImage>
      <TextContainer>
        <TextSection>
          <Text>정성스럽게 작성할수록 매칭 확률이 높아집니다.</Text>
        </TextSection>
        <TextSection>
          <Text>설문은 오직 '장르는 로맨스' 서비스 이용을 위한 것으로,</Text>
        </TextSection>
        <TextSection>
          <Text>작성하시는 내용은</Text>
          <HighLighted>매칭 상대에게만</HighLighted>
          <Text>공유되며</Text>
        </TextSection>
        <TextSection>
          <Text>그 외 다른 용도로 사용되지 않습니다.</Text>
        </TextSection>
        <TextSection>
          <Text>
            상대에게 첫인상이 될 소개서이니 정성스럽게 작성해주세요 :)
          </Text>
        </TextSection>
      </TextContainer>
      <TicketingImage>
        <Image
          src="/Profile/ticketing.png"
          alt="장르는 로맨스 티켓팅"
          layout="fill"
          objectFit="cover"
        />
      </TicketingImage>
      <TextAreaContainer>
        <TextAreaSection>
          <TitleSection>
            <TitleNum>
              <Image
                src="/Profile/num1.png"
                alt="1번"
                layout="fill"
                objectFit="cover"
              />
            </TitleNum>
            <TitleText>#인생.영화는</TitleText>
          </TitleSection>
          <TextArea
            placeholder="당신의 인생영화는 무엇인가요? &#13;&#10;가장 기억에 남는 장면을 알려주세요."
            value={best_movie}
            onChange={handleBestMovie}
          />
        </TextAreaSection>
        <TextAreaSection>
          <TitleSection>
            <TitleNum>
              <Image
                src="/Profile/num2.png"
                alt="2번"
                layout="fill"
                objectFit="cover"
              />
            </TitleNum>
            <TitleText>#저란.사람은</TitleText>
          </TitleSection>
          <TextArea
            placeholder="나이와 직업/신분, 주요 생활반경, 관심사를 포함하여 본인은 어떤 사람인지 최대한 자세히 소개해주세요."
            value={about_me}
            onChange={handleAboutMe}
          />
        </TextAreaSection>
        <TextAreaSection>
          <TitleSection>
            <TitleNum>
              <Image
                src="/Profile/num3.png"
                alt="3번"
                layout="fill"
                objectFit="cover"
              />
            </TitleNum>
            <TitleText>#제.이상형은</TitleText>
          </TitleSection>
          <TextArea
            placeholder="연애 상대에게 중요하게 생각하는 점, 바라는 점이 있다면 조심스럽게 말해주세요."
            value={ideal_type}
            onChange={handleIdealType}
          />
        </TextAreaSection>
        <TextAreaSection>
          <TitleSection>
            <TitleNum>
              <Image
                src="/Profile/num4.png"
                alt="4번"
                layout="fill"
                objectFit="cover"
              />
            </TitleNum>
            <TitleText>#부끄럽지만.제매력은</TitleText>
          </TitleSection>
          <TextArea
            placeholder="당신의 성격과 외모에 대해 1가지씩 자랑해주세요. &#13;&#10;(닮았다고 들어본 연예인을 1명 이상 적어주세요)"
            value={my_appeal}
            onChange={handleMyAppeal}
          />
        </TextAreaSection>
        <TextAreaSection>
          <TitleSection>
            <TitleNum>
              <Image
                src="/Profile/num5.png"
                alt="5번"
                layout="fill"
                objectFit="cover"
              />
            </TitleNum>
            <TitleText>#찰칵</TitleText>
          </TitleSection>
          <div
            style={{
              fontSize: '10px',
              marginTop: '5px',
              wordBreak: 'keep-all',
              lineHeight: '18px',
            }}
          >
            사진은 상대방에게 전달되지 않으며 이상형을 고려한 매칭에만
            활용됩니다.
          </div>
          <PhotoText>당신의 두번째로 잘 나온 사진 1장을 올려주세요.</PhotoText>
          {preview ? (
            <PhotoImage>
              <Image
                src={preview}
                alt="프로필 사진"
                layout="fill"
                objectFit="contain"
                onError={getImage}
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
              <Input type="file" id="user_image" onChange={handlePhoto} />
            </>
          )}
        </TextAreaSection>
        <TextAreaSection>
          <TitleSection>
            <TitleNum>
              <Image
                src="/Profile/num6.png"
                alt="6번"
                layout="fill"
                objectFit="cover"
              />
            </TitleNum>
            <TitleText>#이.영화.어떠세요</TitleText>
          </TitleSection>
          <TextArea
            placeholder="보고싶은 영화를 3개 이상 알려주세요 &#13;&#10;(1~2주 후 상영 예정작 중)"
            value={movie_suggest}
            onChange={handleMovieSuggest}
          />
        </TextAreaSection>
        <MovieBtn
          onClick={() => {
            window.open(' http://www.cgv.co.kr/movies/?lt=1&ft=0');
          }}
        >
          상영작 정보 보기
        </MovieBtn>
        <TextAreaSection>
          <TitleSection>
            <TitleNum>
              <Image
                src="/Profile/num7.png"
                alt="7번"
                layout="fill"
                objectFit="cover"
              />
            </TitleNum>
            <TitleText>#안녕하세요</TitleText>
          </TitleSection>
          <TextArea
            placeholder="함께 영화를 보게 될 상대에게 설레는 한 마디 해주세요"
            value={greeting}
            onChange={handleGreeting}
          />
        </TextAreaSection>
      </TextAreaContainer>
      <SaveBtn onClick={handleSave}>임시저장</SaveBtn>
      <SubmitBtn onClick={handleSubmit}>제출하기</SubmitBtn>
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

export default Profile;
