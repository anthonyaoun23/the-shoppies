import styled from "styled-components";

import SearchIcon from "assets/icons/search.svg";
import XIcon from "assets/icons/x.svg";

function SearchBar({ onChange, value }) {
  return (
    <Wrapper>
      <IconWrapper>
        <img src={SearchIcon} alt="Search Icon" />
      </IconWrapper>
      <input
        type="text"
        placeholder="Search"
        name="search"
        autoFocus
        onChange={onChange}
        value={value}
      />
      {/* <ResetIcon>
        <img src={XIcon} alt="Reset Icon" />
      </ResetIcon> */}
    </Wrapper>
  );
}

export default SearchBar;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 44px;

  input {
    display: flex;
    align-items: center;
    justify-content: center;

    height: 100%;
    width: 100%;
    background: linear-gradient(
      rgba(99, 106, 150, 0.4) 0%,
      rgba(182, 186, 214, 0.25) 100%
    );
    border: none;
    border-radius: 30px;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 20px 40px,
      rgba(255, 255, 255, 0.3) 0px 0px 0px 0.5px inset;
    box-sizing: border-box;
    padding: 10px 42px;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 130%;
    color: rgb(255, 255, 255);
    transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1) 0s;

    ::placeholder {
      color: rgba(255, 255, 255, 0.7);
    }

    :focus {
      outline: none;
      padding-left: 42px;
      box-shadow: rgba(47, 184, 255, 0.3) 0px 10px 40px,
        rgb(47, 184, 255) 0px 0px 0px 1px inset;
      background: linear-gradient(
        rgba(24, 32, 79, 0.4) 0%,
        rgba(24, 32, 79, 0.25) 100%
      );
    }
  }
`;

const IconWrapper = styled.div`
  position: absolute;
  z-index: 2;
  top: 10px;
  left: 10px;

  img {
    margin: 0;
  }
`;

const ResetIcon = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  top: 12px;
  right: 12px;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
  img {
    padding: 0;
  }
`;
