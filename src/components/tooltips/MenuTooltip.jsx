import styled from "styled-components";

import MenuButton from "components/buttons/MenuButton";
import PersonalSiteIcon from "assets/icons/personal-site.svg";
import LinkIcon from "assets/icons/link.svg";

const tooltipData = [
  {
    title: "Github",
    icon: PersonalSiteIcon,
    link: "https://github.com/anthonyaoun23/the-shoppies",
  },
  {
    title: "Personal Site",
    icon: LinkIcon,
    link: "https://aaoun.com",
  },
];

export default function MenuTooltip(props) {
  const { isOpen } = props;

  return (
    <Wrapper isOpen={isOpen}>
      {tooltipData.map((item, index) => (
        <MenuButton key={index} item={item} />
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background: rgba(15, 14, 71, 0.3);
  box-shadow: 0px 50px 100px rgba(0, 0, 0, 0.25),
    inset 0px 0px 0px 0.5px rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(40px);

  border-radius: 20px;
  padding: 20px;
  position: absolute;
  top: 60px;
  right: 20px;
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  z-index: 1;
  display: grid;
  gap: 10px;
  grid-template-columns: 150px;
  transition: 0.3s ease-in-out;
  /* display: ${(props) => (props.isOpen ? "block" : "none")}; */
  visibility: ${(props) => (props.isOpen ? "visible" : "hidden")};
  transform: ${(props) =>
    props.isOpen
      ? "skewY(0) rotate(0) translateY(0)"
      : "skewY(-5deg) rotate(5deg) translateY(-30px)"};
`;
