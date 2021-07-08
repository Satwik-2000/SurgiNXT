import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { UploadContextProvider } from "./contexts";
import AuthProvider from "./contexts/auth";
import {
  LoginViewWrapper,
  DashboardViewWrapper,
  UploadViewWrapper,
  AnnotateViewWrapper
} from "./views";
import { PrivateRoute } from "./shared_components";
import SegmentationViewWrapper from "./views/segmentation";
const App = () => {
  return (
    <>
      <AuthProvider>
        <UploadContextProvider>
          <Router>
            <Switch>
              <Route path="/login" exact component={LoginViewWrapper} />
              <Route
                path="/dashboard/:type"
                exact
                component={DashboardViewWrapper}
              />
              <Route
                path="/upload"
                exact
                component={UploadViewWrapper}
              />
              <Route
                path="/upload/:type"
                exact
                component={UploadViewWrapper}
              />
              <Route
                path="/annotate"
                exact
                component={AnnotateViewWrapper}
              />
              <Route
                path="/annotate/:type"
                exact
                component={AnnotateViewWrapper}
              />

              <Route
                path="/segmentation"
                exact
                component={SegmentationViewWrapper}
              />

              <Route
                path="/segmentation/:type"
                exact
                component={SegmentationViewWrapper}
              />

              <Redirect from="*" to="/login" />
            </Switch>
          </Router>
        </UploadContextProvider>
      </AuthProvider>
    </>
  );
};

export default App;
