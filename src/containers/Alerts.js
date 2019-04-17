import { connect } from "react-redux";
import { alertSelectors, alertActions } from "state/ducks/alerts";
import { Alerts } from "views";

const mapStateToProps = (state, ownProps) => ({
  alerts: alertSelectors.getAllAlerts(state)
});

const { deleteAlert, updateAlert } = alertActions;

const mapDispatchToProps = {
  deleteAlert,
  updateAlert
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Alerts);
