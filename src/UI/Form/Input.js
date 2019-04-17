import styled from "styled-components";

const StyledInput = styled.input.attrs(({ type }) => ({
  type
}))`
  position: relative;
  display: inline-block;
  padding: 10px;
  padding-left: 0;
  margin-bottom: 1rem;
  border: none;
  outline: 0;
  outline-offset: 0;
  font-size: 0.9rem;
  background-color: transparent !important;
  font-family: ${({ theme }) => theme.fonts.primary};
  color: ${({ theme }) => theme.colors.text};
  border-bottom: 1px solid ${({ theme }) => theme.colors.text};
  transition: border 0.25s ease-out;
  &:hover,
  &:focus,
  &:active {
    border-bottom: 1px solid ${({ theme }) => theme.colors.primary};
  }
  &[readonly] {
    opacity: 0.225;
  }
`;

export default StyledInput;
