import React, { useEffect } from "react";
import { Field, reduxForm } from "redux-form";
import Label from "UI/Form/Label";
import Button from "UI/Button";
import {
  setOption,
  renderPriceInput,
  renderInput,
  renderSelectAsset,
  normalizeCreateALertFormValues,
  validation
} from "./helper";

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
      handleCreate(normalizeCreateALertFormValues(values), ...settlements);
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
    initialize(formValues ? formValues : { coin: setOption(assets[0]) });
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
  validate: validation.create
})(CreateAlert);
