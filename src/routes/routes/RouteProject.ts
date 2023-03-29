import { chainRoute, createRoute, RouteParams } from "atomic-router";
import { PageProject } from "~pages";
import { esImages, esProjects, esTags } from "~stores";

const RouteProject = createRoute<RouteParams>();

const RouteProjectLoaded = chainRoute({
  route: RouteProject,
  beforeOpen: {
    effect: esProjects.get,
    mapParams: ({ params }) => params.id,
  },
});
const RouteProjectImagesLoaded = chainRoute({
  route: RouteProjectLoaded,
  beforeOpen: {
    effect: esImages.list,
    mapParams: () => {},
  },
});
const RouteProjectTagsLoaded = chainRoute({
  route: RouteProjectImagesLoaded,
  beforeOpen: {
    effect: esTags.list,
    mapParams: () => {},
  },
});

const path = "/projects/:id";

export {
  RouteProject as route,
  RouteProjectTagsLoaded as loaded,
  path,
  PageProject as view,
};
