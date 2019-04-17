import styled from "styled-components";
import Info from "UI/Form/Info";

const StyledWarning = styled(Info)`
  color: ${({ theme }) => theme.colors.warning};
`;

export default StyledWarning;
