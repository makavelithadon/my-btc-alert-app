import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const StyledNavBar = styled.header`
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledAlertsCount = styled.span``;

const StyledLink = styled(NavLink)`
  position: relative;
  text-decoration: none;
  display: inline-block;
  height: 50%;
  display: flex;
  align-items: center;
  padding: 10px 6px;
  color: ${({ theme }) => theme.colors.black};
  &::after {
    content: "";
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 0;
    display: block;
    width: 0;
    height: 2px;
    background-color: ${({ theme }) => theme.colors.lightBlue};
    transition: 0.225s ease-out;
  }
  &:not(:last-child) {
    margin-right: 40px;
  }
  &.active {
    &::after {
      width: 100%;
    }
  }
  ${StyledAlertsCount} {
    position: absolute;
    top: 0;
    right: -8px;
    font-size: 0.7rem;
    background-color: ${({ theme }) => theme.colors.lightBlue};
    color: ${({ theme }) => theme.colors.white};
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
  }
`;

export default function NavBar({ alerts }) {
  return (
    <StyledNavBar>
      <StyledLink to={"/"} exact>
        Home
      </StyledLink>
      <StyledLink to={"/alerts"} exact>
        My Alerts
        <StyledAlertsCount>{alerts.length}</StyledAlertsCount>
      </StyledLink>
    </StyledNavBar>
  );
}
