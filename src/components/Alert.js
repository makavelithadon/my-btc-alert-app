import React, { useEffect } from "react";
import styled, { css } from "styled-components";
import { hexToRgb } from "utils";
import { H1, H2 } from "UI/Heading";
import Button from "UI/Button";
import PropTypes from "prop-types";
import { reduxForm, Field } from "redux-form";
import { validation, renderPriceInput } from "components/Forms/helper";

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

const StyledDelete = styled.span`
  position: absolute;
  top: 16px;
  right: 16px;
  cursor: pointer;
`;

const StyledName = styled(H1)`
  margin-top: 0;
`;

const CreateFieldPrice = ({ name, ...rest }) => {
  return (
    <>
      <span style={{ marginRight: 10 }}>
        {name[0].toUpperCase() + name.slice(1)} :
      </span>
      <Field
        component={renderPriceInput}
        id={name}
        name={name}
        placeholder={"Type amount"}
        {...rest}
        type={"number"}
        min={0}
      />
    </>
  );
};

function Alert({
  alert,
  handleDelete,
  handleUpdate,
  pristine,
  submitting,
  error,
  handleSubmit,
  reset,
  initialize,
  invalid,
  form
}) {
  const { name, asset_id, email, below, above } = alert;
  const disallowSubmitButton = pristine || submitting || error || invalid;
  const readOnlyInputs = submitting;
  const onSubmit = values => {
    return new Promise((...settlements) => {
      handleUpdate(
        {
          ...alert,
          ...Object.entries(values).reduce(
            (values, [name, value]) => ({ ...values, [name]: Number(value) }),
            {}
          )
        },
        form,
        ...settlements
      );
    })
      .then(res => {
        reset();
        initialize(res);
      })
      .catch(err => console.error("reject", err));
  };
  useEffect(() => {
    const initializedValues = {};
    if (above) initializedValues.above = above;
    if (below) initializedValues.below = below;
    initialize(initializedValues);
  }, []);
  return (
    <StyledAlert>
      <StyledName>
        {name} ({asset_id})
      </StyledName>
      <H2>{email}</H2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          {above && (
            <CreateFieldPrice
              name={"above"}
              readOnly={readOnlyInputs}
              style={{ width: 100 }}
            />
          )}
        </div>
        <div>
          {below && (
            <CreateFieldPrice
              name={"below"}
              readOnly={readOnlyInputs}
              style={{ width: 100 }}
            />
          )}
        </div>
        <Button
          type={"submit"}
          disabled={disallowSubmitButton}
          style={{ marginTop: "1rem" }}
        >
          Update alert
        </Button>
      </form>
      <StyledDelete onClick={() => handleDelete(alert)}>X</StyledDelete>
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

export default reduxForm({
  destroyOnUnmount: false,
  validate: validation.update
})(Alert);
