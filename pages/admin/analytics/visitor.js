import { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { DateRangePickerCalendar, START_DATE } from 'react-nice-dates';
import 'react-nice-dates/build/style.css';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import { wrapper, adminLogin } from 'redux/store';
import cookies from 'next-cookies';
import { gaApi } from 'api';
import Loader from 'components/Admin/Loader';

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
  margin-bottom: 70px;
  color: ${(props) => props.theme.adminMainColor};
  font-size: 28px;
`;

const DateContainer = styled.div`
  ${(props) => props.theme.columnStartCenter}
  width: 90%;
  margin-bottom: 30px;
`;

const ValueSection = styled.div`
  ${(props) => props.theme.flexStartCenter};
  margin-bottom: 20px;
  cursor: pointer;
  padding: 10px;
  :hover {
    background-color: rgba(54, 139, 250, 0.1);
    border-radius: 3px;
  }
`;

const DateValue = styled.div`
  font-size: 14px;
  font-weight: bold;
`;

const Icon = styled.div`
  font-size: 15px;
  color: #333333;
  margin-left: 10px;
`;

const CalendarContainer = styled.div`
  @media only screen and (max-width: 768px) {
    width: 90%;
    top: 250px;
  }
  ${(props) => props.theme.columnCenter}
  position: absolute;
  top: 250px;
  width: 30%;
  background-color: #ffffff;
  box-shadow: 1px 2px 12px 1px rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const ModuleSection = styled.div`
  width: 100%;
`;

const SubmitBtn = styled.div`
  ${(props) => props.theme.flexCenter};
  width: 120px;
  height: 40px;
  cursor: pointer;
  color: #ffffff;
  border-radius: 3px;
  background-color: #368bfa;
  margin: 20px 0;
`;

const ContentContainer = styled.div`
  ${(props) => props.theme.flexStartCenter};
  width: 95%;
  margin-bottom: 50px;
`;

const ChartContainer = styled.div`
  ${(props) => props.theme.columnStartCenter};
  width: 100%;
  border-radius: 4px;
  background-color: #ffffff;
  padding: 20px;
`;

const Visitor = () => {
  const Chart = dynamic(() =>
    import('react-chartjs-2').then((mod) => mod.Line)
  );

  const today = new Date();
  const sevenDaysBefore = new Date(
    new Date().setDate(new Date().getDate() - 6)
  );

  const [startDate, setStartDate] = useState(sevenDaysBefore);
  const [endDate, setEndDate] = useState(today);
  const [focus, setFocus] = useState(START_DATE);
  const [open, setOpen] = useState(false);
  const [chartData, setChartData] = useState({
    labels: [],
    visitorData: [],
    pageviewData: [],
  });
  const [loading, setLoading] = useState(true);

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

  const toggleCalendar = () => setOpen(!open);

  const handleFocusChange = (newFocus) => {
    setFocus(newFocus || START_DATE);
  };

  const handleSubmit = async () => {
    setOpen(false);
    setLoading(true);
    getData();
  };

  const getData = async () => {
    const dateData = {
      start_date: format(startDate, 'yyyy-MM-dd'),
      end_date: format(endDate, 'yyyy-MM-dd'),
    };
    try {
      const { data } = await gaApi.visitors(dateData);
      setChartData({
        labels: data.map((d) => d.date),
        visitorData: data.map((d) => JSON.parse(d.visitor_count)),
        pageviewData: data.map((d) => JSON.parse(d.pageview_count)),
      });
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
      <Title>방문자 통계</Title>
      <DateContainer>
        <ValueSection onClick={toggleCalendar}>
          <DateValue>
            조회기간 :{' '}
            {startDate &&
              endDate &&
              `${format(startDate, 'yyyy-MM-dd')} ~ ${format(
                endDate,
                'yyyy-MM-dd'
              )}`}
          </DateValue>
          <Icon>{open ? <AiFillCaretUp /> : <AiFillCaretDown />}</Icon>
        </ValueSection>
        {open && (
          <CalendarContainer>
            <ModuleSection>
              <DateRangePickerCalendar
                startDate={startDate}
                endDate={endDate}
                focus={focus}
                onStartDateChange={setStartDate}
                onEndDateChange={setEndDate}
                onFocusChange={handleFocusChange}
                locale={ko}
              />
            </ModuleSection>
            <SubmitBtn onClick={handleSubmit}>적용하기</SubmitBtn>
          </CalendarContainer>
        )}
      </DateContainer>
      <ContentContainer>
        <ChartContainer>{loading ? <Loader /> : <>{Graph}</>}</ChartContainer>
      </ContentContainer>
    </Container>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((ctx) => {
  const { admin_token: token } = cookies(ctx);
  const store = ctx.store;

  if (token && token.length > 0) {
    store.dispatch(adminLogin({ logged: true, token }));
    return { props: { logged: true } };
  } else {
    return {
      redirect: {
        destination: '/admin/login',
        permanent: false,
      },
    };
  }
});

export default Visitor;
