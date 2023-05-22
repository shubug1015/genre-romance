import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { userApi } from 'api';
import { wrapper, userLogin } from 'redux/store';
import cookies from 'next-cookies';
import Reject from 'components/ArriveProposal/Reject';
import Accept from 'components/ArriveProposal/Accept';
import { handleRedirect } from 'state';
import Head from 'next/head';

const Container = styled.div`
  ${(props) => props.theme.columnCenter};
`;

const ProposalImage = styled.div`
  @media only screen and (min-width: 600px) {
    width: 560px;
    height: 162px;
  }
  position: relative;
  width: 313px;
  height: 90px;
  margin-bottom: 20px;
`;

const Title = styled.div`
  ${(props) => props.theme.flexCenter};
  font-size: ${(props) => (props.sexProp ? '20px' : '17px')};
  font-weight: 300;
  font-family: 'Cafe24Oneprettynight';
  margin: 40px 0;
`;

const UserImageSection = styled.div`
  position: relative;
  width: 216px;
  height: 216px;
  margin: 40px 0;
  border-radius: 50%;
  border: 3px solid ${(props) => props.theme.mainColor};
`;

const UserImage = styled(Image)`
  border-radius: 50%;
  object-fit: contain;
`;

const SectionContainer = styled.div`
  @media only screen and (min-width: 600px) {
    width: 600px;
  }
  ${(props) => props.theme.columnCenter};
  width: 100%;
`;

const Section = styled.div`
  ${(props) => props.theme.columnStartCenter};
  width: 100%;
  padding: 25px;
  border-radius: 6px;
  border: solid 1px rgba(255, 255, 255, 0.08);
  background-color: rgba(255, 255, 255, 0.04);
  margin: 10px 0;
`;

const SectionTitle = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: ${(props) => props.theme.mainColor};
  margin-bottom: 18px;
`;

const SectionContent = styled.div`
  font-size: 16px;
  line-height: 1.63;
  white-space: pre-line;
`;

const TextContainer = styled.div`
  ${(props) => props.theme.columnCenter};
  margin: 30px 0;
`;

const TextTitle = styled.div`
  font-size: 32px;
  font-weight: 300;
  margin: 20px 0;
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
  margin-left: 3px;
`;

const BtnSection = styled.div`
  @media only screen and (min-width: 600px) {
    width: 600px;
  }
  ${(props) => props.theme.flexCenter};
  width: 100%;
  margin-top: 20px;
`;

const Btn = styled.div`
  ${(props) => props.theme.flexCenter};
  width: 46%;
  margin: 0 2%;
  height: 55px;
  border-radius: 40px;
  font-size: 18px;
  background: ${(props) =>
    props.btnProp === 'romance'
      ? 'linear-gradient(73deg, #f7215d 11%, #c52180 105%)'
      : 'rgba(255, 255, 255, 0.1)'};
  cursor: pointer;
`;

const ArriveProposal = ({ token, sex }) => {
  const [open, setOpen] = useState('');

  const [proposal, setProposal] = useState(null);

  const getData = async () => {
    try {
      const { data } = await userApi.getProposal(token);
      setProposal(data.profile);
    } catch {
      alert('Error');
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const list = [
    {
      id: 0,
      title: '#인생.영화는',
      content: proposal?.best_movie,
    },
    {
      id: 1,
      title: '#저란.사람은',
      content: proposal?.about_me,
    },
    {
      id: 2,
      title: '#제.이상형은',
      content: proposal?.ideal_type,
    },
    {
      id: 3,
      title: '#부끄럽지만.제매력은',
      content: proposal?.my_appeal,
    },
    {
      id: 4,
      title: '#이.영화.어떠세요',
      content: proposal?.movie_suggest,
    },
    {
      id: 5,
      title: '#안녕하세요',
      content: proposal?.greeting,
    },
  ];

  return (
    <Container>
      <Head>
        <title>제안서 도착 | 장르는로맨스</title>
        <meta name="description" content="상대방의 제안서가 도착했습니다." />
        <link
          rel="canonical"
          href="https://www.genreisromance.site/arrive_proposal"
        />
      </Head>
      <ProposalImage>
        <Image
          src="/ArriveProposal/proposal.png"
          alt="장르는 로맨스 제안서"
          layout="fill"
          objectFit="cover"
        />
      </ProposalImage>
      <Title sexProp={sex === 'male'}>
        {sex && sex === 'male'
          ? '제안이 도착했습니다!'
          : '상대가 영화 데이트를 신청하였습니다!'}
      </Title>
      {/* <UserImageSection>
        {proposal?.photo ? (
          <UserImage
            src={proposal.photo}
            alt='장르는 로맨스 제안서 예시'
            layout='fill'
            objectFit='cover'
          />
        ) : null}
      </UserImageSection> */}
      <SectionContainer>
        {list &&
          list.map((l) => (
            <Section key={l.id}>
              <SectionTitle>{l.title}</SectionTitle>
              <SectionContent>{l.content}</SectionContent>
            </Section>
          ))}
      </SectionContainer>
      <TextContainer>
        <TextTitle>당신의 장르는?</TextTitle>
        <TextSection>
          <Text>상대방과의 영화 관람을 원하면</Text>
          <HighLighted>'로맨스'</HighLighted>
        </TextSection>
        <TextSection>
          <Text>원하지 않는다면</Text>
          <HighLighted>'다큐'</HighLighted>
          <Text>를 선택해주세요.</Text>
        </TextSection>
      </TextContainer>
      <BtnSection>
        <Btn btnProp={''} onClick={() => setOpen('reject')}>
          다큐
        </Btn>
        <Btn btnProp={'romance'} onClick={() => setOpen('accept')}>
          로맨스
        </Btn>
      </BtnSection>

      <Reject open={open} setOpen={setOpen} />
      <Accept open={open} setOpen={setOpen} token={token} sex={sex} />
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
    props: {
      token: user_data && user_data.token ? user_data.token : null,
      sex: user_data && user_data.sex ? user_data.sex : null,
    },
  };
});

export default ArriveProposal;
