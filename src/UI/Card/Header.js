import styled from "styled-components";

const CardHeader = styled.header`
  padding: 20px;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.lightBlue};
  color: ${({ theme }) => theme.colors.white};
`;

export default CardHeader;
