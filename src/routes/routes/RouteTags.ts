import { chainRoute, createRoute } from "atomic-router";
import { esTags } from "~stores";
import { PageTags } from "~pages";
const RouteTags = createRoute();

const RouteTagsLoaded = chainRoute({
  route: RouteTags,
  beforeOpen: {
    effect: esTags.list,
    mapParams: () => {},
  },
});

const path = "/tags";

export {
  RouteTags as route,
  RouteTagsLoaded as loaded,
  PageTags as view,
  path,
};
