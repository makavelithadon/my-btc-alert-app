import React, { useEffect } from "react";
import NavBar from "containers/NavBar";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledLayout = styled.div`
  max-width: 600px;
  margin: 0 auto;
  min-height: 100vh;
`;

const StyledMain = styled.main`
  margin-top: 80px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function Layout({ children: page, fetchAssets }) {
  useEffect(() => {
    fetchAssets();
    const interval = window.setInterval(fetchAssets, 60000);
    return () => {
      window.clearInterval(interval);
    };
  }, []);
  return (
    <StyledLayout>
      <NavBar />
      <StyledMain>{page}</StyledMain>
    </StyledLayout>
  );
}

Layout.propTypes = {
  children: PropTypes.object.isRequired,
  fetchAssets: PropTypes.func.isRequired
};
