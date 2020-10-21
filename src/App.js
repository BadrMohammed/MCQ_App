import React, { Component } from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import reducers from "./Redux/Reducers/Index";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import "antd/dist/antd.css";
import "rc-checkbox/assets/index.css";
import "toasted-notes/src/styles.css";
import "../src/assets/style.css";

import Exam from "./Components/Exam/Exam";
import Login from "./Components/Login/Login";

const store = createStore(
  reducers,
  {},
  compose(
    applyMiddleware(ReduxThunk)
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <HashRouter>
          <Switch>
            <Route exact path="/" render={props => <Login {...props} />} />
            <Route exact path="/mcq" render={props => <Exam {...props} />} />
          </Switch>
        </HashRouter>
      </Provider>
    );
  }
}

export default App;
