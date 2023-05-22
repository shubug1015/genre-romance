import { useState } from 'react';
import styled from 'styled-components';
import Table from './Table';
import Switch from 'react-switch';
import { adminApi } from 'api';

const Container = styled.div`
  @media only screen and (max-width: 768px) {
    width: 100vw;
  }
  ${(props) => props.theme.columnCenter}
  justify-content: center;
  width: ${(props) => `calc(100vw - ${props.theme.adminSideBarWidth})`};
  padding-top: 50px;
`;

const Title = styled.div`
  width: 90%;
  margin-bottom: 40px;
  color: ${(props) => props.theme.adminMainColor};
  font-size: 28px;
`;

const SwitchContainer = styled.div`
  ${(props) => props.theme.flexEndCenter}
  width: 90%;
  margin-bottom: 10px;
`;

const Gallery = ({
  list,
  activation,
  addGallery,
  editGallery,
  deleteGallery,
  loading,
}) => {
  const [checked, setChecked] = useState(activation === 'True' ? true : false);

  const handleChange = async () => {
    setChecked(!checked);
    await adminApi.changeGalleryState({ activation: !checked });
  };

  return (
    <Container>
      <Title>게시판 관리</Title>
      <SwitchContainer>
        <Switch
          onChange={handleChange}
          checked={checked}
          onColor='#368bfa'
          handleDiameter={30}
          uncheckedIcon={false}
          checkedIcon={false}
          boxShadow='0px 1px 5px rgba(0, 0, 0, 0.6)'
          activeBoxShadow='0px 0px 1px 10px rgba(0, 0, 0, 0.2)'
          width={48}
          height={20}
        />
      </SwitchContainer>
      <Table
        list={list}
        addGallery={addGallery}
        editGallery={editGallery}
        deleteGallery={deleteGallery}
        loading={loading}
      />
    </Container>
  );
};

export default Gallery;
