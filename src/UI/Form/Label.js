import styled from "styled-components";

const StyledLabel = styled.label`
  margin-bottom: 0.5rem;
  font-size: 1rem;
  display: inline-block;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.secondary};
`;

export default StyledLabel;
