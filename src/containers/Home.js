import { connect } from "react-redux";
import { assetSelectors } from "state/ducks/assets";
import { alertActions } from "state/ducks/alerts";
import { Home } from "views";

const mapStateToProps = (state, ownProps) => ({
  assets: assetSelectors.getItems(state),
  loading: assetSelectors.isLoading(state),
  error: assetSelectors.error(state)
});

const { createAlert } = alertActions;

const mapDispatchToProps = dispatch => ({
  createAlert: (...args) => dispatch(createAlert(...args))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
