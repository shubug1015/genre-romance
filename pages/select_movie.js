import styled from 'styled-components';
import Image from 'next/image';
import { useState } from 'react';
import { wrapper, userLogin } from 'redux/store';
import cookies from 'next-cookies';
import { useRouter } from 'next/router';
import { userApi } from 'api';
import { handleRedirect } from 'state';
import Head from 'next/head';

const Container = styled.div`
  ${(props) => props.theme.columnCenter};
  width: 100vw;
  max-width: 100%;
`;

const TitleSection = styled.div`
  @media only screen and (min-width: 600px) {
    ${(props) => props.theme.columnCenter};
  }
  ${(props) => props.theme.columnStartCenter};
  width: 100%;
  margin-bottom: 40px;
`;

const Title = styled.div`
  font-size: 32px;
  line-height: 1.38;
  font-family: 'Cafe24Oneprettynight';
`;

const ContentSection = styled.div`
  @media only screen and (min-width: 600px) {
    ${(props) => props.theme.columnCenter};
  }
  ${(props) => props.theme.columnStartCenter};
  width: 100%;
  margin: 30px 0;
`;

const ContentTitle = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: ${(props) => props.theme.mainColor};
  margin-bottom: 8px;
`;

const ContentText = styled.div`
  font-size: 14px;
  opacity: 0.6;
  line-height: 1.7;
`;

const MovieContainer = styled.div`
  @media only screen and (min-width: 600px) {
    ${(props) => props.theme.flexCenter};
    width: 600px;
  }
  width: 100%;
  height: 200px;
  margin: 40px 0;
  overflow: auto;
`;

const Slider = styled.div`
  ${(props) => props.theme.flexStartCenter};
  width: 451px;
  height: 100%;
`;

const MovieSection = styled.div`
  position: relative;
  width: 145px;
  height: 200px;
  margin-right: 8px;
  cursor: pointer;
`;

const MovieImage = styled(Image)`
  border-radius: 6px;
`;

const OptionContainer = styled.div`
  @media only screen and (min-width: 600px) {
    width: 600px;
  }
  ${(props) => props.theme.columnCenter};
  width: 100%;
  margin: 40px 0;
`;

const OptionSetion = styled.div`
  ${(props) => props.theme.columnCenter};
  width: 100%;
  margin: 40px 0;
`;

const OptionImage = styled.div`
  position: relative;
  width: 140px;
  height: 25px;
  margin-bottom: 24px;
`;

const OptionContent = styled.div`
  @media only screen and (min-width: 600px) {
    width: 60%;
  }
  ${(props) => props.theme.columnStartCenter};
  width: 100%;
  height: 220px;
  outline: none;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  padding: 15px;
`;

const OptionContentSection = styled.div`
  ${(props) => props.theme.flexStartCenter};
  font-size: 15px;
  margin: 5px 0;
`;

const TimeContentSection = styled.div`
  ${(props) => props.theme.columnStartCenter};
  font-size: 15px;
  margin: 5px 0;
`;

const OptionTitle = styled.div`
  opacity: 0.8;
  width: 80px;
`;

const InputSection = styled.div`
  ${(props) => props.theme.flexStartCenter};
  width: 170px;
  height: 30px;
  font-weight: lighter;
  opacity: 0.9;
`;

const TimeInputSection = styled.div`
  ${(props) => props.theme.columnStartCenter};
  justify-content: flex-end;
  width: 170px;
  height: 60px;
  font-weight: lighter;
  opacity: 0.9;
`;

const Select = styled.select`
  width: 70px;
  height: 25px;
  outline: none;
  border: 1px solid #dbdbdb;
  padding-left: 10px;
  background-color: transparent;
  color: #ffffff;
  margin-right: 5px;
  font-size: 11px;
`;

const Option = styled.option`
  width: 80px;
  height: 10px;
  outline: none;
  padding-left: 10px;
  background-color: #150f0a;
  color: #ffffff;
`;

const OptionInput = styled.input`
  margin-left: 10px;
  outline: none;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  color: #ffffff;
  width: 170px;
  height: 30px;
`;

const ShortInput = styled.input`
  margin-left: 10px;
  outline: none;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  color: #ffffff;
  width: 50px;
  height: 30px;
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
  font-size: 18px;
  cursor: pointer;
`;

const SelectMovie = ({ token }) => {
  const theaters = [
    {
      id: 0,
      url: 'http://www.cgv.co.kr/reserve/show-times/',
      image: '/SelectMovie/cgv.png',
      name: 'CGV',
    },
    {
      id: 1,
      url: 'https://www.megabox.co.kr/booking/',
      image: '/SelectMovie/megabox.png',
      name: '메가박스',
    },
    {
      id: 2,
      url: 'https://www.lottecinema.co.kr/NLCHS/Ticketing/Schedule',
      image: '/SelectMovie/lotte.png',
      name: '롯데시네마',
    },
  ];

  const timeOption = {
    type: [
      { id: 0, name: '오전' },
      { id: 1, name: '오후' },
    ],
    hour: [
      { id: 1 },
      { id: 2 },
      { id: 3 },
      { id: 4 },
      { id: 5 },
      { id: 6 },
      { id: 7 },
      { id: 8 },
      { id: 9 },
      { id: 10 },
      { id: 11 },
      { id: 12 },
    ],
  };

  const [data, setData] = useState({
    option1: {
      month: '',
      date: '',
      place: '',
      title: '',
      day_time: '',
      hour: '',
      minute: '',
    },
    option2: {
      month: '',
      date: '',
      place: '',
      title: '',
      day_time: '',
      hour: '',
      minute: '',
    },
    option3: {
      month: '',
      date: '',
      place: '',
      title: '',
      day_time: '',
      hour: '',
      minute: '',
    },
  });

  const handleDayTime1 = (e) => {
    const selectedOption = e.target.options[e.target.selectedIndex].value;
    const option1 = data.option1;
    if (selectedOption) {
      setData({
        ...data,
        option1: {
          ...option1,
          day_time:
            selectedOption === '오전'
              ? 'under'
              : selectedOption === '오후'
              ? 'over'
              : '',
        },
      });
    }
  };

  const handleHour1 = (e) => {
    const selectedOption = e.target.options[e.target.selectedIndex].value;
    const option1 = data.option1;
    if (selectedOption === 'null') {
      setData({ ...data, option1: { ...option1, hour: '' } });
    } else {
      setData({ ...data, option1: { ...option1, hour: selectedOption } });
    }
  };

  const handleMonth1 = (e) => {
    const option1 = data.option1;
    setData({ ...data, option1: { ...option1, month: e.target.value } });
  };

  const handleDate1 = (e) => {
    const option1 = data.option1;
    setData({ ...data, option1: { ...option1, date: e.target.value } });
  };

  const handlePlace1 = (e) => {
    const option1 = data.option1;
    setData({ ...data, option1: { ...option1, place: e.target.value } });
  };
  const handleTitle1 = (e) => {
    const option1 = data.option1;
    setData({ ...data, option1: { ...option1, title: e.target.value } });
  };

  const handleMinute1 = (e) => {
    const option1 = data.option1;
    setData({ ...data, option1: { ...option1, minute: e.target.value } });
  };

  const handleDayTime2 = (e) => {
    const selectedOption = e.target.options[e.target.selectedIndex].value;
    const option2 = data.option2;
    if (selectedOption) {
      setData({
        ...data,
        option2: {
          ...option2,
          day_time:
            selectedOption === '오전'
              ? 'under'
              : selectedOption === '오후'
              ? 'over'
              : '',
        },
      });
    }
  };

  const handleMonth2 = (e) => {
    const option2 = data.option2;
    setData({ ...data, option2: { ...option2, month: e.target.value } });
  };

  const handleDate2 = (e) => {
    const option2 = data.option2;
    setData({ ...data, option2: { ...option2, date: e.target.value } });
  };

  const handlePlace2 = (e) => {
    const option2 = data.option2;
    setData({ ...data, option2: { ...option2, place: e.target.value } });
  };
  const handleTitle2 = (e) => {
    const option2 = data.option2;
    setData({ ...data, option2: { ...option2, title: e.target.value } });
  };
  const handleHour2 = (e) => {
    const selectedOption = e.target.options[e.target.selectedIndex].value;
    const option2 = data.option2;
    if (selectedOption === 'null') {
      setData({ ...data, option2: { ...option2, hour: '' } });
    } else {
      setData({ ...data, option2: { ...option2, hour: selectedOption } });
    }
  };
  const handleMinute2 = (e) => {
    const option2 = data.option2;
    setData({ ...data, option2: { ...option2, minute: e.target.value } });
  };

  const handleDayTime3 = (e) => {
    const selectedOption = e.target.options[e.target.selectedIndex].value;
    const option3 = data.option3;
    if (selectedOption) {
      setData({
        ...data,
        option3: {
          ...option3,
          day_time:
            selectedOption === '오전'
              ? 'under'
              : selectedOption === '오후'
              ? 'over'
              : '',
        },
      });
    }
  };

  const handleMonth3 = (e) => {
    const option3 = data.option3;
    setData({ ...data, option3: { ...option3, month: e.target.value } });
  };

  const handleDate3 = (e) => {
    const option3 = data.option3;
    setData({ ...data, option3: { ...option3, date: e.target.value } });
  };

  const handlePlace3 = (e) => {
    const option3 = data.option3;
    setData({ ...data, option3: { ...option3, place: e.target.value } });
  };
  const handleTitle3 = (e) => {
    const option3 = data.option3;
    setData({ ...data, option3: { ...option3, title: e.target.value } });
  };
  const handleHour3 = (e) => {
    const selectedOption = e.target.options[e.target.selectedIndex].value;
    const option3 = data.option3;
    if (selectedOption === 'null') {
      setData({ ...data, option3: { ...option3, hour: '' } });
    } else {
      setData({ ...data, option3: { ...option3, hour: selectedOption } });
    }
  };
  const handleMinute3 = (e) => {
    const option3 = data.option3;
    setData({ ...data, option3: { ...option3, minute: e.target.value } });
  };

  const router = useRouter();

  const selectMovie = async () => {
    if (
      data.option1.month === '' ||
      data.option1.date === '' ||
      data.option1.place === '' ||
      data.option1.title === '' ||
      data.option1.hour === '' ||
      data.option1.minute === '' ||
      data.option1.day_time === '' ||
      data.option2.month === '' ||
      data.option2.date === '' ||
      data.option2.place === '' ||
      data.option2.title === '' ||
      data.option2.hour === '' ||
      data.option2.minute === '' ||
      data.option2.day_time === '' ||
      data.option3.month === '' ||
      data.option3.date === '' ||
      data.option3.place === '' ||
      data.option3.title === '' ||
      data.option3.hour === '' ||
      data.option3.minute === '' ||
      data.option3.day_time === ''
    ) {
      alert('모든 내용을 입력해주세요.');
    } else if (
      /^[0-9]+$/.test(data.option1.month) === false ||
      /^[0-9]+$/.test(data.option1.date) === false ||
      /^[0-9]+$/.test(data.option1.hour) === false ||
      /^[0-9]+$/.test(data.option1.minute) === false ||
      /^[0-9]+$/.test(data.option2.month) === false ||
      /^[0-9]+$/.test(data.option2.date) === false ||
      /^[0-9]+$/.test(data.option2.hour) === false ||
      /^[0-9]+$/.test(data.option2.minute) === false ||
      /^[0-9]+$/.test(data.option3.month) === false ||
      /^[0-9]+$/.test(data.option3.date) === false ||
      /^[0-9]+$/.test(data.option3.hour) === false ||
      /^[0-9]+$/.test(data.option3.minute) === false
    ) {
      alert('날짜와 시간은 숫자만 입력해주세요.');
    } else {
      if (confirm('제출하시겠습니까?')) {
        const movie_data = { respond: 'yes', movie_options: data };
        await userApi.selectMovie(token, movie_data);
        alert('제출되었습니다.');
        router.push('/');
      }
    }
  };

  const date = new Date();

  const today_month = date.getUTCMonth() + 1;
  const today_date = date.getUTCDate();

  return (
    <Container>
      <Head>
        <title>영화선택 | 장르는로맨스</title>
        <meta
          name="description"
          content="장르는 로맨스 영화선택 페이지입니다."
        />
        <link
          rel="canonical"
          href="https://www.genreisromance.site/select_movie"
        />
      </Head>
      <TitleSection>
        <Title>상대와 함께 볼</Title>
        <Title>영화를 골라주세요!</Title>
      </TitleSection>
      <ContentSection>
        <ContentTitle>영화 시간표 보기</ContentTitle>
        <ContentText>
          아래 사이트를 방문하여 영화 시간표를 확인해주세요.
        </ContentText>
        <MovieContainer>
          <Slider>
            {theaters.map((t) => (
              <MovieSection
                key={t.id}
                onClick={() => {
                  window.open(t.url);
                }}
              >
                <MovieImage
                  src={t.image}
                  alt={t.name}
                  layout="fill"
                  objectFit="contain"
                />
              </MovieSection>
            ))}
          </Slider>
        </MovieContainer>
      </ContentSection>
      <ContentSection>
        <ContentTitle>옵션 제안하기</ContentTitle>
        <ContentText>상대에게 날짜, 영화관, 영화, 시간을 제안하는</ContentText>
        <ContentText>3개의 옵션을 모두 작성해주세요.</ContentText>
        <OptionContainer>
          <OptionSetion>
            <OptionImage>
              <Image
                src="/SelectMovie/option1.png"
                alt="옵션1"
                layout="fill"
                objectFit="cover"
              />
            </OptionImage>
            <OptionContent>
              <OptionContentSection>
                <OptionTitle>날짜 </OptionTitle>
                <InputSection>
                  <ShortInput
                    type="tel"
                    pattern="\\d*"
                    value={data.option1.month}
                    onChange={handleMonth1}
                    placeholder={today_month}
                  />
                  월
                  <ShortInput
                    type="tel"
                    pattern="\\d*"
                    value={data.option1.date}
                    onChange={handleDate1}
                    placeholder={today_date}
                  />
                  일
                </InputSection>
              </OptionContentSection>
              <OptionContentSection>
                <OptionTitle>영화관 </OptionTitle>
                <OptionInput
                  type="text"
                  value={data.option1.place}
                  onChange={handlePlace1}
                  placeholder="강남 CGV"
                />
              </OptionContentSection>
              <OptionContentSection>
                <OptionTitle>영화제목 </OptionTitle>
                <OptionInput
                  type="text"
                  value={data.option1.title}
                  onChange={handleTitle1}
                  placeholder="어바웃타임"
                />
              </OptionContentSection>
              <TimeContentSection>
                <OptionTitle style={{ marginBottom: '15px' }}>
                  시간{' '}
                </OptionTitle>
                <InputSection>
                  <Select
                    onChange={(e) => handleDayTime1(e)}
                    style={{ marginRight: '15px' }}
                  >
                    <Option value="null">--선택--</Option>
                    {timeOption.type.map((t, index) => (
                      <Option key={index} value={t.name}>
                        {t.name}
                      </Option>
                    ))}
                  </Select>
                  <Select onChange={(e) => handleHour1(e)}>
                    <Option value="null">--선택--</Option>
                    {timeOption.hour.map((h, index) => (
                      <Option key={index} value={h.id}>
                        {h.id}
                      </Option>
                    ))}
                  </Select>
                  시
                  <ShortInput
                    type="tel"
                    pattern="\\d*"
                    value={data.option1.minute}
                    onChange={handleMinute1}
                    placeholder="30"
                  />
                  분
                </InputSection>
              </TimeContentSection>
            </OptionContent>
          </OptionSetion>
          <OptionSetion>
            <OptionImage>
              <Image
                src="/SelectMovie/option2.png"
                alt="옵션2"
                layout="fill"
                objectFit="cover"
              />
            </OptionImage>
            <OptionContent>
              <OptionContentSection>
                <OptionTitle>날짜 </OptionTitle>
                <InputSection>
                  <ShortInput
                    type="tel"
                    pattern="\\d*"
                    value={data.option2.month}
                    onChange={handleMonth2}
                  />
                  월
                  <ShortInput
                    type="tel"
                    pattern="\\d*"
                    value={data.option2.date}
                    onChange={handleDate2}
                  />
                  일
                </InputSection>
              </OptionContentSection>
              <OptionContentSection>
                <OptionTitle>영화관 </OptionTitle>
                <OptionInput
                  type="text"
                  value={data.option2.place}
                  onChange={handlePlace2}
                />
              </OptionContentSection>
              <OptionContentSection>
                <OptionTitle>영화제목 </OptionTitle>
                <OptionInput
                  type="text"
                  value={data.option2.title}
                  onChange={handleTitle2}
                />
              </OptionContentSection>
              <TimeContentSection>
                <OptionTitle style={{ marginBottom: '15px' }}>
                  시간{' '}
                </OptionTitle>
                <InputSection>
                  <Select
                    onChange={(e) => handleDayTime2(e)}
                    style={{ marginRight: '15px' }}
                  >
                    <Option value="null">--선택--</Option>
                    {timeOption.type.map((t, index) => (
                      <Option key={index} value={t.name}>
                        {t.name}
                      </Option>
                    ))}
                  </Select>
                  <Select onChange={(e) => handleHour2(e)}>
                    <Option value="null">--선택--</Option>
                    {timeOption.hour.map((h, index) => (
                      <Option key={index} value={h.id}>
                        {h.id}
                      </Option>
                    ))}
                  </Select>
                  시
                  <ShortInput
                    type="tel"
                    pattern="\\d*"
                    value={data.option2.minute}
                    onChange={handleMinute2}
                  />
                  분
                </InputSection>
              </TimeContentSection>
            </OptionContent>
          </OptionSetion>
          <OptionSetion>
            <OptionImage>
              <Image
                src="/SelectMovie/option3.png"
                alt="옵션3"
                layout="fill"
                objectFit="cover"
              />
            </OptionImage>
            <OptionContent>
              <OptionContentSection>
                <OptionTitle>날짜 </OptionTitle>
                <InputSection>
                  <ShortInput
                    type="tel"
                    pattern="\\d*"
                    value={data.option3.month}
                    onChange={handleMonth3}
                  />
                  월
                  <ShortInput
                    type="tel"
                    pattern="\\d*"
                    value={data.option3.date}
                    onChange={handleDate3}
                  />
                  일
                </InputSection>
              </OptionContentSection>
              <OptionContentSection>
                <OptionTitle>영화관 </OptionTitle>
                <OptionInput
                  type="text"
                  value={data.option3.place}
                  onChange={handlePlace3}
                />
              </OptionContentSection>
              <OptionContentSection>
                <OptionTitle>영화제목 </OptionTitle>
                <OptionInput
                  type="text"
                  value={data.option3.title}
                  onChange={handleTitle3}
                />
              </OptionContentSection>
              <TimeContentSection>
                <OptionTitle style={{ marginBottom: '15px' }}>
                  시간{' '}
                </OptionTitle>
                <InputSection>
                  <Select
                    onChange={(e) => handleDayTime3(e)}
                    style={{ marginRight: '15px' }}
                  >
                    <Option value="null">--선택--</Option>
                    {timeOption.type.map((t, index) => (
                      <Option key={index} value={t.name}>
                        {t.name}
                      </Option>
                    ))}
                  </Select>
                  <Select onChange={(e) => handleHour3(e)}>
                    <Option value="null">--선택--</Option>
                    {timeOption.hour.map((h, index) => (
                      <Option key={index} value={h.id}>
                        {h.id}
                      </Option>
                    ))}
                  </Select>
                  시
                  <ShortInput
                    type="tel"
                    pattern="\\d*"
                    value={data.option3.minute}
                    onChange={handleMinute3}
                  />
                  분
                </InputSection>
              </TimeContentSection>
            </OptionContent>
          </OptionSetion>
        </OptionContainer>
      </ContentSection>
      <SubmitBtn onClick={selectMovie}>제안하기</SubmitBtn>
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

      if (
        ctx.resolvedUrl !== destination &&
        (state !== 'arrive_proposal_f' || sex !== 'female')
      ) {
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

export default SelectMovie;
