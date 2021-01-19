import styled from "styled-components";

import Header from "components/layout/Header";
import Footer from "components/layout/Footer";

import { GlobalStyles } from "styles/GlobalStyles";
import "styles/Layout.css";

function Layout({ children }) {
  return (
    <Wrapper>
      <GlobalStyles />
      <Header />
      <main>{children}</main>
      <Footer />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: grid;
  gap: 20px;
  height: 100vh;
  width: 100%;
  padding: 20px 30px 10px;'
   
   @media (max-width: 768px) {
    padding: 20px 15px;
  }
`;

export default Layout;
