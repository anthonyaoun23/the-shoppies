import styled from "styled-components";

import Header from "components/layout/Header";
import Footer from "components/layout/Footer";

import "styles/Layout.css";

function Layout({ children }) {
  return (
    <Wrapper>
      <Header />
      <main>{children}</main>
      <Footer />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: grid;
  gap: 20px;
  grid-template-rows: 64px auto 32px;
  min-height: 100vh;
  max-width: 1600px;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 20px 30px 10px;

  background: linear-gradient(200.44deg, #4316db 13.57%, #9076e7 98.38%);

  @media (max-width: 768px) {
    padding: 20px 15px;
  }
`;

export default Layout;
