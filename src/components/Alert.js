import React from "react";
import styled, { css } from "styled-components";
import { hexToRgb } from "utils";
import { H1, H2 } from "UI/Heading";
import PropTypes from "prop-types";

const StyledAlert = styled.div`
  position: relative;
  margin: 0 auto;
  width: 80%;
  border-radius: 6px;
  &:not(:last-child) {
    margin-bottom: 20px;
  }
  padding: 20px;
  border: 1px solid
    ${({ theme }) => {
      const values = hexToRgb(theme.colors.lightGrey);
      const { alpha, ...restValues } = values;
      return css`rgba(${Object.values(restValues).join(",")}, .75)`;
    }};
`;

const Delete = styled.span`
  position: absolute;
  top: 16px;
  right: 16px;
  cursor: pointer;
`;

export default function Alert({ alert, handleDelete }) {
  const { name, asset_id, email, below, above } = alert;
  return (
    <StyledAlert>
      <H1>
        {name} ({asset_id})
      </H1>
      <H2>{email}</H2>
      <H2>{above && `Above: ${above} USD`}</H2>
      <H2>{below && `Below: ${below} USD`}</H2>
      <Delete onClick={() => handleDelete(alert)}>X</Delete>
    </StyledAlert>
  );
}

Alert.propTypes = {
  alert: PropTypes.shape({
    email: PropTypes.string.isRequired,
    above: PropTypes.number,
    below: PropTypes.number,
    name: PropTypes.string,
    asset_id: PropTypes.string,
    id: PropTypes.string
  })
};
