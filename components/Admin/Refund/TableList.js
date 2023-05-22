import { useState } from "react";
import styled from "styled-components";
import Proof from "./Proof";
import { AiOutlineCheck } from "react-icons/ai";

const Container = styled.div`
  ${(props) => props.theme.flexStartCenter}
  width: 100%;
  height: 50px;
  font-size: 12px;
  border-bottom: 1px solid lightgray;
  cursor: pointer;
  :hover {
    background-color: rgba(54, 139, 250, 0.1);
    transition: background-color 0.3s ease-in-out;
  }
`;

const Check = styled.div`
  @media only screen and (max-width: 768px) {
    width: 100px;
  }
  ${(props) => props.theme.flexCenter};
  width: 10%;
`;

const CheckBox = styled.input`
  display: none;
`;

const CheckLabel = styled.label`
  ${(props) => props.theme.flexCenter};
  background-color: ${(props) =>
    props.checkedProp ? props.theme.adminMainColor : "transparent"};
  border: ${(props) => (props.checkedProp ? "none" : "2px solid #727272")};
  border-radius: 3px;
  width: 18px;
  height: 18px;
  cursor: pointer;
  :hover {
    opacity: 0.8;
    transition: opacity 0.3s ease-in-out;
  }
`;

const Icon = styled.div`
  display: ${(props) => !props.checkedProp && "none"};
  color: ${(props) => props.checkedProp && props.theme.whiteColor};
  font-size: 12px;
`;

const TableCell = styled.div`
  @media only screen and (max-width: 768px) {
    width: 100px;
  }
  ${(props) => props.theme.flexCenter};
  width: ${(props) => props.widthProp};
`;

const TableList = ({
  id,
  name,
  // gender,
  username,
  // joined,
  phone_number,
  match_cancel,
  movie_cancel,
  // payment_cancel,
  match,
  checkedList,
  checkUser,
  proof,
}) => {
  // proof popup
  const [proofPopup, setProofPopup] = useState(false);

  const openProof = () => setProofPopup(true);

  const closeProof = () => setProofPopup(false);

  return (
    <Container>
      <Check>
        <CheckBox
          id={`check_label${id}`}
          type="checkbox"
          onClick={(e) => checkUser(e, id)}
          checked={checkedList.includes(id) ? true : false}
          onChange={() => null}
        />
        <CheckLabel
          htmlFor={`check_label${id}`}
          checkedProp={checkedList.includes(id) ? true : false}
        >
          <Icon checkedProp={checkedList.includes(id) ? true : false}>
            <AiOutlineCheck />
          </Icon>
        </CheckLabel>
      </Check>
      <TableCell widthProp={"15%"} onClick={openProof}>
        {name}
      </TableCell>
      <TableCell widthProp={"25%"} onClick={openProof}>
        {username}
      </TableCell>
      <TableCell widthProp={"20%"} onClick={openProof}>
        {phone_number}
      </TableCell>
      <TableCell widthProp={"15%"} onClick={openProof}>
        {match_cancel}
      </TableCell>
      <TableCell widthProp={"15%"} onClick={openProof}>
        {movie_cancel}
      </TableCell>
      {proofPopup && (
        <Proof
          month={match.movie.month}
          date={match.movie.date}
          place={match.movie.place}
          title={match.movie.title}
          dayTime={match.movie.day_time}
          hour={match.movie.hour}
          minute={match.movie.minute}
          photo={proof.photo}
          comment={proof.comment}
          account={proof.account_number}
          closeProof={closeProof}
        />
      )}
    </Container>
  );
};

export default TableList;
