import { createRoutesView } from "atomic-router-react";
import { createHistoryRouter } from "atomic-router";
import { createBrowserHistory } from "history";
import {
  Home,
  Gallery,
  Profile,
  Tags,
  Projects,
  Project,
  Login,
  ProjectNew,
} from "./routes";

import { PageNotFound } from "~pages";

const RoutesView = createRoutesView({
  routes: [
    { route: Home.route, view: Home.view },
    { route: Gallery.route, view: Gallery.view },
    { route: Profile.route, view: Profile.view },
    { route: Tags.route, view: Tags.view },
    { route: Projects.route, view: Projects.view },
    { route: ProjectNew.route, view: ProjectNew.view },
    { route: Project.route, view: Project.view },
    { route: Login.route, view: Login.view },
  ],
  otherwise() {
    return <PageNotFound />;
  },
});

const routes = [
  { path: Home.path, route: Home.route },
  { path: Gallery.path, route: Gallery.route },
  { path: Profile.path, route: Profile.route },
  { path: Tags.path, route: Tags.route },
  { path: Projects.path, route: Projects.route },
  { path: ProjectNew.path, route: ProjectNew.route },
  { path: Project.path, route: Project.route },
  { path: Login.path, route: Login.route },
];

import { createRouterControls } from "atomic-router";

const controls = createRouterControls();

const history = createBrowserHistory();
const router = createHistoryRouter({
  routes: routes,
  controls: controls,
});
router.setHistory(history);

const historyWatch = history.listen;

export { RoutesView, router, historyWatch, controls };
