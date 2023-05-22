import styled from 'styled-components';
import { useState, useEffect } from 'react';
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
  box-shadow: 1px 2px 12px 1px rgba(0, 0, 0, 0.1);
  width: 90%;
  margin-bottom: 50px;
`;

const DomainSection = styled.div`
  ${(props) => props.theme.columnStartCenter};
  width: 100%;
  border-radius: 4px;
  background-color: #ffffff;
  padding: 20px;
`;

const SectionTitle = styled.div`
  font-size: 18px;
  font-weight: 400;
  margin-bottom: 30px;
`;

const Header = styled.div`
  ${(props) => props.theme.flexCenter};
  width: 100%;
  padding-bottom: 5px;
  border-bottom: 1px solid #dbdbdb;
  opacity: 0.9;
`;

const Domain = styled.div`
  width: 90%;
  padding-left: 10px;
`;

const Value = styled.div`
  ${(props) => props.theme.flexCenter};
  width: 10%;
`;

const Sections = styled.div`
  width: 100%;
`;

const SectionContent = styled.div`
  ${(props) => props.theme.flexCenter};
  width: 100%;
  padding: 10px 0;
  border-bottom: 1px solid #dbdbdb;
`;

const ContentDomain = styled.div`
  width: 90%;
  padding-left: 10px;
  cursor: pointer;
  :hover {
    color: ${(props) => props.theme.adminMainColor};
    transition: color 0.3s ease-in-out;
  }
`;

const ContentValue = styled.div`
  ${(props) => props.theme.flexCenter};
  width: 10%;
`;

const NoData = styled.div`
  @media only screen and (max-width: 768px) {
    font-size: 14px;
  }
  ${(props) => props.theme.flexCenter};
  width: 100%;
  padding: 50px 0 30px 0;
  opacity: 0.8;
`;

const Funnel = () => {
  const today = new Date();
  const sevenDaysBefore = new Date(
    new Date().setDate(new Date().getDate() - 6)
  );

  const [startDate, setStartDate] = useState(sevenDaysBefore);
  const [endDate, setEndDate] = useState(today);
  const [focus, setFocus] = useState(START_DATE);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

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
      <Title>유입경로</Title>
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
        <DomainSection>
          <SectionTitle>유입 도메인</SectionTitle>
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
        </DomainSection>
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

export default Funnel;
