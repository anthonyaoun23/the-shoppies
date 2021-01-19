import styled from "styled-components";

export default function MenuButton(props) {
  const { item, onClick } = props;

  return item.link ? (
    <Link target="_blank" rel="noopener noreferrer" href={item.link}>
      <MenuItem hasTitle={!item.title ? false : true} onClick={onClick}>
        <img src={item.icon} alt={item.title} />
        {item.title}
      </MenuItem>
    </Link>
  ) : (
    <MenuItem hasTitle={!item.title ? false : true} onClick={onClick}>
      <img src={item.icon} alt={item.title} />
      {item.title}
    </MenuItem>
  );
}
const MenuItem = styled.button`
  color: rgba(255, 255, 255, 0.7);
  display: grid;
  grid-template-columns: 24px auto;
  gap: ${(props) => (props.hasTitle ? "10px" : "0px")};
  align-items: center;
  padding: 10px;
  border-radius: 10px;
  border-width: 0px;
  transition: 0.5s ease-out;
  background-color: transparent;
  width: 100%;

  :hover {
    background: rgba(255, 255, 255, 0.1);
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1),
      inset 0px 0px 0px 0.5px rgba(255, 255, 255, 0.2);
    cursor: pointer;
  }

  :focus {
    outline: none;
    border: none;
    background: transparent;
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1),
      inset 0px 0px 0px 0.5px rgba(255, 255, 255, 0.2);
    cursor: pointer;
  }
`;

const Link = styled.a`
  text-decoration: none;
`;
