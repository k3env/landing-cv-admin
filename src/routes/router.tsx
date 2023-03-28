import { createRoutesView } from "atomic-router-react";
import { createHistoryRouter } from "atomic-router";
import { createBrowserHistory } from "history";
import { RouteHome, RouteGallery, RouteProfile } from "./routes";
import { PageGallery, PageHome, PageNotFound, PageProfile } from "../pages";

const RoutesView = createRoutesView({
  routes: [
    { route: RouteHome, view: PageHome },
    { route: RouteGallery, view: PageGallery },
    { route: RouteProfile, view: PageProfile },
  ],
  otherwise() {
    return <PageNotFound />;
  },
});

const routes = [
  {
    path: "/",
    route: RouteHome,
  },
  {
    path: "/gallery",
    route: RouteGallery,
  },
  { path: "/profile", route: RouteProfile },
];

const history = createBrowserHistory();
const router = createHistoryRouter({
  routes: routes,
});
router.setHistory(history);

export { RoutesView, router };
