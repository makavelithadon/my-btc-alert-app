import styled, { css } from "styled-components";
import CardHeader from "./Header";
import CardBody from "./Body";
import { hexToRgb } from "utils";
import { media } from "style-utils";

const Card = styled.div`
  max-width: 600px;
  min-height: 100px;
  overflow: hidden;
  ${media.small`border-radius: 6px;`};
  box-shadow: ${({ theme }) => {
    const { red: r, green: g, blue: b } = hexToRgb(theme.colors.lightGrey);
    return css`0 1px 7px rgba(${[r, g, b].join(", ")}, .6)`;
  }};
  border: 1px solid
    ${({ theme }) => {
      const values = hexToRgb(theme.colors.lightGrey);
      return css`rgba(${Object.values(values).join(",")}, .75)`;
    }};
`;

Card.Header = CardHeader;
Card.Body = CardBody;

export default Card;
