import styled from "styled-components";

import NominateIcon from "assets/icons/like.svg";
import XIcon from "assets/icons/x.svg";

export default function ActionButton(props) {
  const { disabled, onClick, nominate } = props;

  return (
    <Wrapper onClick={onClick} disabled={disabled && nominate}>
      <IconWrapper>
        <Icon src={nominate ? NominateIcon : XIcon} className="icon" />
      </IconWrapper>
      <Title>{`${nominate ? "Add" : "Remove"} Nomination`}</Title>
    </Wrapper>
  );
}

const Wrapper = styled.button`
  width: 220px;
  height: 42px;
  padding: 8px;
  background: linear-gradient(180deg, #ffffff 0%, #d9dfff 100%);
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1),
    0px 20px 40px rgba(23, 0, 102, 0.2),
    inset 0px 0px 0px 0.5px rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  border: 0px;
  display: grid;
  grid-template-columns: 53px auto;
  justify-content: start;
  align-items: center;
  margin: 8px 0 0;

  @media (max-width: 450px) {
    width: 200px;
  }

  :disabled {
    opacity: 0.4;
  }

  *,
  & {
    transition: 1s cubic-bezier(0.075, 0.82, 0.165, 1);
  }

  :hover:not(:disabled) {
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1),
      0px 30px 60px rgba(23, 0, 102, 0.5),
      inset 0px 0px 0px 0.5px rgba(255, 255, 255, 0.5);
    transform: translateY(-3px);
    cursor: pointer;

    .icon {
      transform: scale(1.1);
    }
  }

  :focus {
    outline: none;
    border: none;

    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1),
      0px 30px 60px rgba(23, 0, 102, 0.5),
      inset 0px 0px 0px 0.5px rgba(255, 255, 255, 0.5);
    transform: translateY(-3px);
    cursor: pointer;

    .icon {
      transform: scale(1.1);
    }
  }
`;

const Title = styled.p`
  font-weight: 500;
  font-size: 15px;
  line-height: 18px;
  color: black;

  @media (max-width: 450px) {
    font-size: 12px;
    line-height: 15px;
  }
`;

const IconWrapper = styled.div`
  width: 24px;
  height: 24px;
  background: linear-gradient(200.44deg, #4316db 13.57%, #9076e7 98.38%);
  border-radius: 50%;
  display: grid;
  justify-content: center;
  align-content: center;
  position: relative;

  ${Wrapper}:hover & {
    filter: hue-rotate(10deg);
  }
`;

const Icon = styled.img`
  width: 20px;
  height: 20px;
`;
