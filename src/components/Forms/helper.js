import React from "react";
import Input from "UI/Form/Input";
import Error from "UI/Form/Error";
import Warning from "UI/Form/Warning";
import { isEmail } from "utils";

export const isValidPriceField = value => !isNaN(value) && Number(value) !== 0;

export const setOption = ({ name, asset_id: id }) =>
  `${name ? name + " " : ""}(${id})`;

export const renderPriceInput = ({
  input,
  meta: { touched, warning, error },
  refName,
  ...rest
}) => {
  if (isNaN(input.value) || Number(input.value) === 0) input.value = "";
  return (
    <>
      <Input {...input} {...rest} ref={refName} /> USD
      {(!!touched && (!!error && <Error>{error}</Error>)) ||
        (!!warning && <Warning>{warning}</Warning>)}
    </>
  );
};

export const renderInput = ({
  input,
  meta: { touched, warning, error },
  meta,
  ...rest
}) => {
  if (!input.value || !input.value.trim()) input.value = "";
  return (
    <>
      <Input {...input} {...rest} />
      {(!!touched && (!!error && <Error>{error}</Error>)) ||
        (!!warning && <Warning>{warning}</Warning>)}
    </>
  );
};

export const renderSelectAsset = ({
  input,
  meta: { touched, warning, error },
  refName,
  opts
}) => {
  if (!input.value || !input.value.trim()) input.value = "";
  return (
    <>
      <select {...input} ref={refName} style={{ marginBottom: "2rem" }}>
        {opts.map(opt => (
          <option key={opt.asset_id} value={setOption(opt)}>
            {setOption(opt)}
          </option>
        ))}
      </select>
      {!!touched &&
        ((!!error && <Error>{error}</Error>) ||
          (!!warning && <Warning>{warning}</Warning>))}
    </>
  );
};

export const normalizeCreateALertFormValues = ({ coin, ...restValues }) => {
  const asset_id = coin.slice(coin.indexOf("(") + 1, -1);
  const name = coin.slice(0, coin.indexOf("(")).replace(" ", "");
  if (restValues.above) restValues.above = Number(restValues.above);
  if (restValues.below) restValues.below = Number(restValues.below);
  return { ...restValues, asset_id, name };
};

export const normalizeUpdateALertFormValues = values => {
  if (values.above) values.above = Number(values.above);
  if (values.below) values.below = Number(values.below);
  return values;
};

export const validation = {
  create({ coin, above, below, email }) {
    const errors = {};
    const mandatoryError = "Field is mandatory";
    const invalidPriceFieldError = "Price field should be a numeric value.";
    const blankPriceField = "You must fill one at least";
    if (!coin || !coin.trim()) {
      errors.coin = mandatoryError;
    }
    if (!email || !email.trim()) {
      errors.email = mandatoryError;
    } else if (!isEmail(email)) {
      errors.email = "Malformed email address.";
    }
    if (above && above.trim() && !isValidPriceField(above)) {
      errors.above = invalidPriceFieldError;
    }
    if (below && below.trim() && !isValidPriceField(below)) {
      errors.below = invalidPriceFieldError;
    }
    const pricesAreBlank =
      (!above || !above.trim()) && (!below || !below.trim());
    if (pricesAreBlank) {
      errors.above = blankPriceField;
      errors.below = blankPriceField;
    }
    return errors;
  },
  update({ above, below }) {
    const errors = {};
    const invalidPriceFieldError = "Price field should be a numeric value.";
    const blankPriceField = "You must fill one at least";
    if (above && String(above).trim() && !isValidPriceField(above)) {
      errors.above = invalidPriceFieldError;
    }
    if (below && String(below).trim() && !isValidPriceField(below)) {
      errors.below = invalidPriceFieldError;
    }
    const pricesAreBlank =
      (!above || !String(above).trim()) && (!below || !String(below).trim());
    if (pricesAreBlank) {
      errors.above = blankPriceField;
      errors.below = blankPriceField;
    }
    return errors;
  }
};
