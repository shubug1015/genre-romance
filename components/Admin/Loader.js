import styled, { keyframes } from 'styled-components';

const Container = styled.div`
  ${(props) => props.theme.columnCenter}
  width: 100%;
  padding: 30vh 0;
  background-color: transparent;
  z-index: 98;
`;

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  } 
  25% {
    transform: rotate(90deg);
  }
  50%{
    transform: rotate(180deg)
  }
  75%{
    transform: rotate(270deg)
  }
  100%{
    transform: rotate(360deg)
  }
}
`;

const Loading = styled.div`
  animation: ${rotate} 1.5s linear infinite;
  width: 20px;
  height: 20px;
  border-radius: 100%;
  border: 2px solid transparent;
  border-color: transparent black transparent black;
`;

const Loader = () => (
  <Container>
    <Loading />
  </Container>
);

export default Loader;
