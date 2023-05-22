import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { HiOutlineChevronRight } from 'react-icons/hi';
import { format } from 'date-fns';
import Link from 'next/link';
import { gaApi } from 'api';
import Loader from 'components/Admin/Loader';

const Container = styled.div`
  @media only screen and (max-width: 768px) {
    width: 100%;
    margin-bottom: 30px;
  }
  ${(props) => props.theme.columnCenter};
  width: 49%;
  box-shadow: 1px 4px 12px 1px rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  margin-right: 2%;
`;

const TitleSection = styled.div`
  ${(props) => props.theme.flexBetweenCenter};
  width: 100%;
  padding: 20px 20px;
  opacity: 0.7;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: 500;
`;

const Arrow = styled.div`
  font-size: 25px;
  cursor: pointer;
`;

const ContentSection = styled.div`
  padding: 0 20px;
  width: 100%;
`;

const ContentTitle = styled.div`
  width: 100%;
  font-size: 12px;
  color: ${(props) => props.theme.adminMainColor};
  margin-bottom: 30px;
`;

const Content = styled.div`
  width: 100%;
`;

const Header = styled.div`
  ${(props) => props.theme.flexBetweenCenter};
  width: 100%;
  padding-bottom: 5px;
  border-bottom: 1px solid #dbdbdb;
  font-size: 12px;
  opacity: 0.9;
`;

const Domain = styled.div``;

const Value = styled.div``;

const Sections = styled.div`
  width: 100%;
`;

const SectionContent = styled.div`
  ${(props) => props.theme.flexCenter};
  width: 100%;
  padding: 10px 0;
  border-bottom: 1px solid #dbdbdb;
  font-size: 12px;
`;

const ContentDomain = styled.div`
  @media only screen and (max-width: 768px) {
    width: 70%;
  }
  width: 90%;
  cursor: pointer;
  :hover {
    color: ${(props) => props.theme.mainColor};
    transition: color 0.3s ease-in-out;
  }
`;

const ContentValue = styled.div`
  @media only screen and (max-width: 768px) {
    width: 30%;
  }
  ${(props) => props.theme.flexEndCenter};
  width: 10%;
`;

const NoData = styled.div`
  @media only screen and (max-width: 768px) {
    font-size: 14px;
  }
  ${(props) => props.theme.flexCenter};
  width: 100%;
  padding: 80px 0;
  font-size: 14px;
  opacity: 0.8;
`;

const Funnel = () => {
  const today = new Date();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    const dateData = {
      start_date: format(today, 'yyyy-MM-dd'),
      end_date: format(today, 'yyyy-MM-dd'),
    };
    try {
      const { data } = await gaApi.funnels(dateData);
      setData(data);
    } catch {
      alert('Error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Container>
      <TitleSection>
        <Title>유입경로</Title>
        <Link href='/admin/analytics/funnel'>
          <Arrow>
            <HiOutlineChevronRight />
          </Arrow>
        </Link>
      </TitleSection>
      <ContentSection>
        <ContentTitle>오늘</ContentTitle>
        <Content>
          <Header>
            <Domain>도메인</Domain>
            <Value>유입수</Value>
          </Header>
          <Sections>
            {loading ? (
              <Loader />
            ) : data?.length > 0 ? (
              data?.map((d) => (
                <SectionContent key={d.funnels}>
                  <ContentDomain
                    onClick={() =>
                      d.funnels.includes('/') &&
                      window.open(`https://${d.funnels}`)
                    }
                  >
                    {d.funnels}
                  </ContentDomain>
                  <ContentValue>{d.count}</ContentValue>
                </SectionContent>
              ))
            ) : (
              <NoData>해당 기간에 집계된 데이터가 없습니다.</NoData>
            )}
          </Sections>
        </Content>
      </ContentSection>
    </Container>
  );
};

export default Funnel;
