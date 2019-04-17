import styled, { css } from "styled-components";

const StyledIcon = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`;

const StyledButton = styled.button.attrs({
  role: "button",
  "aria-pressed": false
})`
  position: relative;
  border: none;
  outline: 0;
  outline-offset: 0;
  border-radius: 5px;
  box-shadow: 0 1px 18px rgba(0, 0, 0, 0.2);
  transition: 0.3s ease-out;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.primary};
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.primary};
  &:hover,
  &:focus,
  &:active {
    box-shadow: 0 5px 24px rgba(0, 0, 0, 0.3);
  }
  &[disabled] {
    opacity: 0.25;
    background-color: ${({ theme }) => theme.colors.lightGrey};
    cursor: initial;
  }
  padding: 12px 20px;
  font-size: 0.9rem;
  ${({ large }) =>
    large &&
    css`
      padding: 16px 28px;
      font-size: 1rem;
    `}
  ${({ small }) =>
    small &&
    css`
      padding: 8px 12px;
      font-size: 0.7rem;
      border-radius: 3px;
    `}
  ${({ theme, primary }) =>
    primary &&
    css`
      background-color: ${theme.colors.primary};
    `}
  ${({ theme, success }) =>
    success &&
    css`
      background-color: ${theme.colors.success};
    `}
  ${({ theme, danger }) =>
    danger &&
    css`
      background-color: ${theme.colors.danger};
    `}
  & ${StyledIcon} {
    right: ${({ large }) => `${large ? 28 : 20}px`};
  }
`;

StyledButton.Icon = StyledIcon;

export default StyledButton;
