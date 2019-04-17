import { connect } from "react-redux";
import { alertSelectors, alertActions } from "state/ducks/alerts";
import { Alerts } from "views";

const mapStateToProps = (state, ownProps) => ({
  alerts: alertSelectors.getAllAlerts(state)
});

const { deleteAlert } = alertActions;

const mapDispatchToProps = {
  deleteAlert
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Alerts);
