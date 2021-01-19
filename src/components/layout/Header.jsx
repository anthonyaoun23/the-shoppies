import { useState, useEffect, useRef } from "react";
import styled from "styled-components";

import MenuButton from "components/buttons/MenuButton";
import MenuTooltip from "components/tooltips/MenuTooltip";
import AboutIcon from "assets/icons/about.svg";

const menuData = [
  {
    title: "About",
    icon: AboutIcon,
  },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const ref = useRef();
  const tooltipRef = useRef();

  function handleClick(event) {
    event.preventDefault();
    setIsOpen(!isOpen);
  }

  function handleClickOutside(event) {
    if (
      ref.current &&
      !ref.current.contains(event.target) &&
      !tooltipRef.current.contains(event.target)
    ) {
      setIsOpen(false);
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <Wrapper>
      <TextWrapper>
        <Title>The Shoppies 2021</Title>
        <Subtitle>Nominate your top 5 favourite movies</Subtitle>
      </TextWrapper>
      <MenuWrapper count={menuData.length} ref={ref}>
        {menuData.map((item, index) =>
          item.title === "About" ? (
            <MenuButton
              key={index}
              item={item}
              onClick={(event) => handleClick(event)}
            />
          ) : (
            <MenuButton key={index} item={item} />
          )
        )}
      </MenuWrapper>
      <div ref={tooltipRef}>
        <MenuTooltip isOpen={isOpen} />
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.header`
  position: relative;
  display: grid;
  grid-template-columns: 300px auto;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  color: white;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  font-weight: bold;
  font-size: 32px;
  margin: 0;

  @media (max-width: 450px) {
    font-size: 24px;
  }
`;

const Subtitle = styled.p`
  font-weight: normal;
  font-size: 17px;
  line-height: 130%;
`;

const MenuWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(${(props) => props.count}, auto);
  gap: 30px;

  @media (max-width: 768px) {
    > * {
      display: none;
    }
  }
`;
