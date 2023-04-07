import { chainRoute, createRoute } from "atomic-router";
import { PageProjectNew } from "~pages";
import { esImages, esTags } from "~stores";

const RouteProject = createRoute();

// const RouteProjectLoaded = chainRoute({
//   route: RouteProject,
//   beforeOpen: {
//     effect: esProjects.get,
//     mapParams: ({ params }) => params.id,
//   },
// });
const RouteProjectImagesLoaded = chainRoute({
  route: RouteProject,
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

const path = "/projects/new";

export {
  RouteProject as route,
  RouteProjectTagsLoaded as loaded,
  path,
  PageProjectNew as view,
};
