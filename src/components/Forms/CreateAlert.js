import React, { useEffect } from "react";
import { Field, reduxForm } from "redux-form";
import Label from "UI/Form/Label";
import Input from "UI/Form/Input";
import Button from "UI/Button";
import Error from "UI/Form/Error";
import Warning from "UI/Form/Warning";
import { isEmail } from "utils";

const setOpt = ({ name, asset_id: id }) => `${name ? name + " " : ""}(${id})`;

const isValidPriceField = value => !isNaN(value) && Number(value) !== 0;

const renderPriceInput = ({
  input,
  meta: { touched, warning, error },
  refName,
  ...rest
}) => {
  if (isNaN(input.value)) input.value = "";
  return (
    <>
      <Input {...input} {...rest} ref={refName} /> USD
      {(!!touched && (!!error && <Error>{error}</Error>)) ||
        (!!warning && <Warning>{warning}</Warning>)}
    </>
  );
};

const renderInput = ({
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

const renderSelectAsset = ({
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
          <option key={opt.asset_id} value={setOpt(opt)}>
            {setOpt(opt)}
          </option>
        ))}
      </select>
      {!!touched &&
        ((!!error && <Error>{error}</Error>) ||
          (!!warning && <Warning>{warning}</Warning>))}
    </>
  );
};

const validate = ({ coin, above, below, email }) => {
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
  const pricesAreBlank = (!above || !above.trim()) && (!below || !below.trim());
  if (pricesAreBlank) {
    errors.above = blankPriceField;
    errors.below = blankPriceField;
  }
  return errors;
};

const normalizeValues = ({ coin, ...restValues }) => {
  const asset_id = coin.slice(coin.indexOf("(") + 1, -1);
  const name = coin.slice(0, coin.indexOf("(")).replace(" ", "");
  if (restValues.above) restValues.above = Number(restValues.above);
  if (restValues.below) restValues.below = Number(restValues.below);
  return { ...restValues, asset_id, name };
};

function CreateAlert({
  handleCreate,
  pristine,
  submitting,
  error,
  handleSubmit,
  reset,
  initialize,
  invalid,
  assets,
  formValues
}) {
  const onSubmit = values => {
    return new Promise((...settlements) => {
      handleCreate(normalizeValues(values), ...settlements);
    })
      .then(res => {
        reset();
        const { coin, email } = formValues;
        initialize({ coin, email });
      })
      .catch(err => console.error("reject", err));
  };
  const disallowSubmitButton = pristine || submitting || error || invalid;
  const readOnlyInputs = submitting;
  useEffect(() => {
    initialize(formValues ? formValues : { coin: setOpt(assets[0]) });
  }, []);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Label htmlFor={"coin"}>Coin to watch</Label>
      <br />
      <Field
        name="coin"
        id="coin"
        component={renderSelectAsset}
        opts={assets}
      />
      <br />
      <Label htmlFor={"email"}>Alert me by email</Label>
      <div>
        <Field
          component={renderInput}
          id={"email"}
          name={"email"}
          placeholder={"Type an email address"}
          readOnly={readOnlyInputs}
        />
      </div>
      <Label htmlFor={"above"}>Alert when price is above :</Label>
      <div>
        <Field
          component={renderPriceInput}
          id={"above"}
          name={"above"}
          placeholder={"Type amount"}
          readOnly={readOnlyInputs}
          type={"number"}
          min={0}
        />
      </div>
      <Label htmlFor={"below"}>Alert when price is below</Label>
      <div>
        <Field
          component={renderPriceInput}
          id={"below"}
          name={"below"}
          placeholder={"Type amount"}
          readOnly={readOnlyInputs}
          type={"number"}
          min={0}
        />
      </div>
      <Button
        type={"submit"}
        disabled={disallowSubmitButton}
        style={{ marginTop: "1rem" }}
      >
        Create alert
      </Button>
    </form>
  );
}

export default reduxForm({
  form: "add-alert",
  destroyOnUnmount: false,
  validate
})(CreateAlert);
