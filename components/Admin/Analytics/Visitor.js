import styled from 'styled-components';
import { useState, useEffect, useMemo } from 'react';
import { HiOutlineChevronRight } from 'react-icons/hi';
import dynamic from 'next/dynamic';
import { format } from 'date-fns';
import Link from 'next/link';
import { gaApi } from 'api';
import Loader from 'components/Admin/Loader';

const Container = styled.div`
  width: 100%;
  box-shadow: 1px 4px 12px 1px rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  margin-bottom: 30px;
`;

const TitleSection = styled.div`
  ${(props) => props.theme.flexBetweenCenter};
  width: 100%;
  padding: 20px 20px;
  opacity: 0.7;
`;

const Title = styled.div`
  font-size: 16px;
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
  padding-bottom: 30px;
`;

const Visitor = () => {
  const Chart = dynamic(() =>
    import('react-chartjs-2').then((mod) => mod.Line)
  );

  const today = new Date();
  const sevenDaysBefore = new Date(
    new Date().setDate(new Date().getDate() - 6)
  );

  const [chartData, setChartData] = useState({
    labels: [],
    visitorData: [],
    pageviewData: [],
    loading: true,
  });

  const options = {
    legend: {
      display: false,
    },
  };

  const data = {
    labels: chartData.labels,
    datasets: [
      {
        label: '방문자수',
        data: chartData.visitorData,
        fill: 'start',
        borderColor: '#4B52BC',
        backgroundColor: 'rgba(75, 82, 188, 0.15)',
      },
      {
        label: '페이지뷰수',
        data: chartData.pageviewData,
        fill: 'start',
        borderColor: '#368BFA',
        backgroundColor: 'rgba(54, 139, 250, 0.15)',
      },
    ],
  };

  const Graph = useMemo(() => <Chart data={data} options={options} />, [
    chartData,
  ]);

  const getData = async () => {
    const dateData = {
      start_date: format(sevenDaysBefore, 'yyyy-MM-dd'),
      end_date: format(today, 'yyyy-MM-dd'),
    };
    try {
      const { data } = await gaApi.visitors(dateData);
      setChartData({
        labels: data.map((d) => d.date),
        visitorData: data.map((d) => JSON.parse(d.visitor_count)),
        pageviewData: data.map((d) => JSON.parse(d.pageview_count)),
        loading: false,
      });
    } catch {
      alert('Error');
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Container>
      <TitleSection>
        <Title>방문자 통계</Title>
        <Link href='/admin/analytics/visitor'>
          <Arrow>
            <HiOutlineChevronRight />
          </Arrow>
        </Link>
      </TitleSection>
      <ContentSection>
        <ContentTitle>최근 1주</ContentTitle>
        <Content>{chartData.loading ? <Loader /> : <>{Graph}</>}</Content>
      </ContentSection>
    </Container>
  );
};

export default Visitor;
