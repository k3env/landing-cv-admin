import { createRoutesView } from "atomic-router-react";
import { createHistoryRouter } from "atomic-router";
import { createBrowserHistory } from "history";
import { Home, Gallery, Profile, Tags } from "./routes";

import { PageNotFound } from "../pages";

const RoutesView = createRoutesView({
  routes: [
    { route: Home.route, view: Home.view },
    { route: Gallery.route, view: Gallery.view },
    { route: Profile.route, view: Profile.view },
    { route: Tags.route, view: Tags.view },
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
];

const history = createBrowserHistory();
const router = createHistoryRouter({
  routes: routes,
});
router.setHistory(history);

export { RoutesView, router };
