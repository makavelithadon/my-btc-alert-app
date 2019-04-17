import { connect } from "react-redux";
import CreateAlertForm from "components/Forms/CreateAlert";

const mapStateToProps = (state, ownProps) => {
  const form = state.form && state.form["add-alert"];
  const formValues = form && form.values;
  return {
    formValues
  };
};

export default connect(mapStateToProps)(CreateAlertForm);
