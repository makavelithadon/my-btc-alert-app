import React from "react";
import styled from "styled-components";
import { Provider } from "react-redux";
import { Router, Switch, Route } from "react-router-dom";
import Root from "./Root";
import history from "./history";
import configureStore from "state/store";
import Layout from "containers/Layout";
import Home from "containers/Home";
import Alerts from "containers/Alerts";
import { useTransition, animated, config } from "react-spring";
import { easeExpOut } from "d3-ease";

const store = configureStore();

const AnimatedRoutes = styled(animated.div).attrs(
  ({ opacity, translatex }) => ({
    style: {
      opacity,
      transform: translatex.interpolate(x => `translate3d(${x}px, 0, 0)`)
    }
  })
)`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
`;

function Base({ location }) {
  const transitions = useTransition(location, location.pathname, {
    from: { opacity: 0, translatex: 100 },
    enter: { opacity: 1, translatex: 0 },
    leave: { opacity: 0, translatex: 0 },
    unique: true,
    config: (_, action) => {
      return {
        ...config.gentle,
        duration: action !== "leave" ? 650 : 450,
        easing: easeExpOut
      };
    }
  });
  return transitions.map(({ item, key, props }) => {
    return (
      <AnimatedRoutes key={key} {...props}>
        <Switch location={item}>
          <Route exact path={"/"} component={Home} />
          <Route exact path={"/alerts"} component={Alerts} />
        </Switch>
      </AnimatedRoutes>
    );
  });
}

export default function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Route
          render={props => {
            return (
              <Root>
                <Layout>
                  <Base {...props} />
                </Layout>
              </Root>
            );
          }}
        />
      </Router>
    </Provider>
  );
}
