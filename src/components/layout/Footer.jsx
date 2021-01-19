import styled from "styled-components";

export default function Footer() {
  return (
    <Wrapper>
      Made with 💚 &nbsp;by{" "}
      <Link target="_blank" rel="noopener noreferrer" href="https://aaoun.com">
        Anthony Aoun
      </Link>
    </Wrapper>
  );
}

const Wrapper = styled.footer`
  color: white;
`;

const Link = styled.a`
  color: #55e750;
  font-weight: 600;
  text-decoration: none;

  :hover {
    text-decoration: underline;
  }
`;
