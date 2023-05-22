import { useState, useEffect } from 'react';
import { wrapper, adminLogin } from 'redux/store';
import cookies from 'next-cookies';
import { adminApi } from 'api';
import Gallery from 'components/Admin/Gallery/Gallery';
import Head from 'next/head';

const Home = ({ activation }) => {
  const [galleryData, setGalleryData] = useState({
    list: [],
    loading: true,
  });

  const addGallery = async (image, comment, closeUpload) => {
    if (confirm('갤러리를 추가하시겠습니까?')) {
      try {
        if (!image) {
          alert('이미지를 업로드해주세요.');
        } else if (comment === '') {
          alert('한줄평을 입력해주세요.');
        } else {
          const data = new FormData();

          data.append('photo', image);
          data.append('comment', comment);

          await adminApi.addGallery(data);

          const { data: list } = await adminApi.getGallery();
          setGalleryData({ ...galleryData, list });

          closeUpload();

          alert('추가가 완료되었습니다.');
        }
      } catch {
        alert('Error');
      }
    } else {
      alert('취소되었습니다.');
    }
  };

  const editGallery = async (proof_shot_id, photo, comment, closeEdit) => {
    if (confirm('수정하시겠습니까?')) {
      const data = new FormData();

      data.append('proof_shot_id', proof_shot_id);
      data.append('comment', comment);

      if (photo) {
        data.append('photo', photo);
      }

      await adminApi.editGallery(data);

      const { data: list } = await adminApi.getGallery();
      setGalleryData({ ...galleryData, list });

      closeEdit();

      alert('수정이 완료되었습니다.');
    } else {
      alert('수정이 취소되었습니다.');
    }
  };

  const deleteGallery = async (proof_shot_id) => {
    if (confirm('삭제하시겠습니까?')) {
      await adminApi.deleteGallery(proof_shot_id);

      const { data: list } = await adminApi.getGallery();
      setGalleryData({ ...galleryData, list });
      alert('삭제가 완료되었습니다.');
    } else {
      alert('삭제가 취소되었습니다.');
    }
  };

  const getData = async () => {
    try {
      const { data: list } = await adminApi.getGallery();
      setGalleryData({ ...galleryData, list, loading: false });
    } catch {
      alert('Error');
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Head>
        <title>게시판 관리 | 관리자</title>
      </Head>
      <Gallery
        {...galleryData}
        activation={activation}
        addGallery={addGallery}
        editGallery={editGallery}
        deleteGallery={deleteGallery}
      />
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (ctx) => {
  const { admin_token: token } = cookies(ctx);
  const store = ctx.store;

  if (token && token.length > 0) {
    store.dispatch(adminLogin({ logged: true, token }));

    const {
      data: { activation },
    } = await adminApi.galleryState();

    return { props: { logged: true, activation } };
  } else {
    return {
      redirect: {
        destination: '/admin/login',
        permanent: false,
      },
    };
  }
});

export default Home;
