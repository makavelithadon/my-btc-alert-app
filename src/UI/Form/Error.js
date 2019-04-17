import styled from "styled-components";
import Info from "UI/Form/Info";

const StyledError = styled(Info)`
  color: ${({ theme }) => theme.colors.danger};
`;

export default StyledError;
