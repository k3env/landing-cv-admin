import { chainRoute, createRoute } from "atomic-router";
import { PageProjects } from "~pages";
import { esProjects } from "~stores";
const RouteProjects = createRoute();

const RouteProjectsLoaded = chainRoute({
  route: RouteProjects,
  beforeOpen: {
    effect: esProjects.list,
    mapParams: () => {},
  },
});

const path = "/projects";

export {
  PageProjects as view,
  RouteProjects as route,
  RouteProjectsLoaded as loaded,
  path,
};
