import styled from "styled-components";

function Banner() {
  return (
    <Wrapper>
      <Message>
        You have nominated 5 movies! Thank you for your contribution ☺️
      </Message>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 20px;
  width: 100%;
  background: rgba(15, 14, 71, 0.3);
  box-shadow: 0px 50px 100px rgba(0, 0, 0, 0.25),
    inset 0px 0px 0px 0.5px rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(40px);
  border-radius: 20px;
`;

const Message = styled.p`
  color: white;
  font-weight: normal;
  font-size: 17px;
  line-height: 130%;
`;

export default Banner;
