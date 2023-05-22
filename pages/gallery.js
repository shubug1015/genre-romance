import { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { galleryApi } from 'api';
import { wrapper, userLogin } from 'redux/store';
import cookies from 'next-cookies';
import Head from 'next/head';
import Loader from 'components/Loader';
import { useRouter } from 'next/router';
import PageBar from 'components/PageBar';

const Container = styled.div`
  ${(props) => props.theme.columnCenter};
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  max-width: 100%;
  height: 100vh;
  padding-top: 175px;
  overflow-y: scroll;
`;

const MainImage = styled.div`
  @media only screen and (min-width: 600px) {
    width: 375px;
    height: 180px;
  }
  ${(props) => props.theme.flexCenter};
  position: relative;
  width: 100%;
  height: 155px;
  margin-bottom: 45px;
`;

const GalleryNum = styled.div`
  @media only screen and (min-width: 800px) {
    width: 800px;
  }
  width: 96%;
  font-size: 16px;
  margin-bottom: 10px;
`;

const ContentContainer = styled.div`
  @media only screen and (min-width: 800px) {
    width: 800px;
  }
  ${(props) => props.theme.flexStartCenter};
  flex-wrap: wrap;
  width: 100%;
`;

const ContentSection = styled.div`
  @media only screen and (min-width: 600px) {
    width: 192px;
    margin: 12px 4px;
  }
  ${(props) => props.theme.columnCenter};
  width: 46%;
  padding-top: 7px;
  padding-bottom: 30px;
  background-color: rgba(255, 255, 255, 0.06);
  border-radius: 4px;
  margin: 12px 2%;
`;

const PhotoImage = styled.div`
  @media only screen and (min-width: 600px) {
    width: 170px;
    height: 170px;
  }
  position: relative;
  width: 100%;
  height: 145px;
  margin-bottom: 20px;
`;

const Review = styled.div`
  @media only screen and (min-width: 600px) {
    width: 170px;
  }
  width: 145px;
  height: 80px;
  line-height: 1.3;
  padding: 10px 0;
  white-space: pre-line;
  overflow-y: auto;
  margin-bottom: 20px;
  &::-webkit-scrollbar {
    /* 세로 스크롤 넓이 */
    width: 2px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.4);
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 6px;
  }
`;

const LogoImage = styled.div`
  @media only screen and (min-width: 600px) {
    width: 100px;
    height: 33px;
  }
  position: relative;
  width: 90px;
  height: 30px;
`;

const Gallery = () => {
  const router = useRouter();
  const pageNum = JSON.parse(router.query.page);

  const [data, setData] = useState(null);
  const [count, setCount] = useState(null);

  // const currentPage = useRef(1);
  // const totalPage = useRef(0);

  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);

  // const rootRef = useRef(null);
  // const targetRef = useRef(null);

  const loadData = useCallback(async (page) => {
    try {
      setLoading(true);
      const {
        data: { results, count },
      } = await galleryApi.getGallery(page);
      // totalPage.current = Math.ceil(count / 8);
      return results;
    } catch (e) {
      // setError(e);
      alert('Error');
    } finally {
      setLoading(false);
    }
  }, []);

  // const loadMoreData = useCallback(async () => {
  //   if (data.length > 0) {
  //     currentPage.current++;
  //     const results = await loadData(currentPage.current);
  //     setData([...data, ...results]);
  //   }
  // }, [data, loadData]);

  // const useIntersectionObserver = ({
  //   root,
  //   target,
  //   onIntersect,
  //   threshold = 1.0,
  //   rootMargin = '0px',
  // }) => {
  //   useEffect(() => {
  //     if (!root) {
  //       return;
  //     }
  //     const observer = new IntersectionObserver(onIntersect, {
  //       root,
  //       rootMargin,
  //       threshold,
  //     });

  //     if (!target) {
  //       return;
  //     }

  //     observer.observe(target);

  //     return () => {
  //       observer.unobserve(target);
  //     };
  //   }, [target, root, rootMargin, onIntersect, threshold]);
  // };

  // useIntersectionObserver({
  //   root: rootRef.current,
  //   target: targetRef.current,
  //   onIntersect: ([{ isIntersecting }]) => {
  //     if (
  //       isIntersecting &&
  //       !loading &&
  //       currentPage.current < totalPage.current
  //     ) {
  //       // console.log('mount');
  //       loadMoreData();
  //     }
  //   },
  // });

  const getGallery = async () => {
    try {
      const {
        data: { results, count },
      } = await galleryApi.getGallery(pageNum);
      setCount(count);
      // totalPage.current = Math.ceil(count / 8);
      setData(results);
    } catch {
      alert('Error');
    }
  };

  useEffect(() => {
    getGallery();
  }, []);

  return (
    <Container
    // ref={rootRef}
    >
      <Head>
        <title>로맨스 갤러리 | 장르는로맨스</title>
        <meta
          name="description"
          content="장르는 로맨스의 로맨스 갤러리입니다."
        />
        <link rel="canonical" href="https://www.genreisromance.site/gallery" />
      </Head>
      <MainImage>
        <Image
          src="/Gallery/gallery.png"
          alt="장르는 로맨스 로맨스 갤러리"
          width={300}
          height={155}
          // layout='fill'
          // objectFit='cover'
        />
      </MainImage>
      <GalleryNum>로맨스 갤러리 - {count}</GalleryNum>
      {loading ? (
        <Loader />
      ) : (
        <ContentContainer>
          {data &&
            data.map((d) => (
              <ContentSection key={d.id}>
                <PhotoImage>
                  <Image
                    src={d.photo}
                    alt="인증샷 사진"
                    layout="fill"
                    objectFit="cover"
                  />
                </PhotoImage>
                <Review>{d.comment}</Review>
                <LogoImage>
                  <Image
                    src="/header_logo.png"
                    alt="장르는 로맨스 로고"
                    layout="fill"
                    objectFit="cover"
                  />
                </LogoImage>
              </ContentSection>
            ))}
        </ContentContainer>
      )}
      {count && <PageBar itemNum={count} nowPage={pageNum} />}
      {/* {loading && <Loader />} */}
      {/* <div ref={targetRef} /> */}
    </Container>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (ctx) => {
  const { user_data } = cookies(ctx);
  const store = ctx.store;

  const {
    data: { activation },
  } = await galleryApi.galleryState();

  if (activation === 'True') {
    if (user_data) {
      const { token, user_pk, sex } = user_data;

      if (token && user_pk && sex) {
        store.dispatch(userLogin({ logged: true, token, user_pk, sex }));
      } else {
        store.dispatch(
          userLogin({ logged: false, token: null, user_pk: null, sex: null })
        );
      }
    } else {
      store.dispatch(
        userLogin({ logged: false, token: null, user_pk: null, sex: null })
      );
    }
  } else {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
});

export default Gallery;
