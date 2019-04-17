import { connect } from "react-redux";
import NavBar from "components/NavBar";
import { alertSelectors } from "state/ducks/alerts";

const mapStateToProps = (state, ownProps) => ({
  alerts: alertSelectors.getAllAlerts(state)
});

export default connect(mapStateToProps)(NavBar);
