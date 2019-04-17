import styled from "styled-components";

const StyledTextarea = styled.textarea.attrs({
  role: "textbox",
  "aria-multiline": "true"
})`
  margin-bottom: 1rem;
  display: block;
  padding: 10px;
  padding-left: 0;
  font-size: 0.9rem;
  outline: 0;
  outline-offset: 0;
  transition: 0.25s ease-out;
  border-color: transparent;
  resize: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightGrey} !important;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.primary};
  &:hover,
  &:focus,
  &:active {
    border-bottom: 1px solid ${({ theme }) => theme.colors.primary}!important;
  }
`;

export default StyledTextarea;
