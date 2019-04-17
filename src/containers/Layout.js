import { connect } from "react-redux";
import Layout from "components/Layout";
import { assetActions } from "state/ducks/assets";

const mapDispatchToProps = {
  fetchAssets: assetActions.fetchAssets
};

export default connect(
  null,
  mapDispatchToProps
)(Layout);
