import { connect } from "react-redux";
import Alert from "components/Alert";

const mapStateToProps = (state, ownProps) => {
  const formId = `edit-alert-${ownProps.alert.id}`;
  const form = state.form && state.form[formId];
  const formValues = form && form.values;
  return {
    form: formId,
    formValues
  };
};

export default connect(mapStateToProps)(Alert);
