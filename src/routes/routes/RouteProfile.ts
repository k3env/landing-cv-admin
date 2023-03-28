import { chainRoute, createRoute } from "atomic-router";
import { PageProfile } from "~pages";
import { esImages, esProfile } from "~stores";
const RouteProfile = createRoute();

const RouteProfileLoaded = chainRoute({
  route: RouteProfile,
  beforeOpen: {
    effect: esProfile.get,
    mapParams: () => {},
  },
});

const RouteProfileImagesLoaded = chainRoute({
  route: RouteProfileLoaded,
  beforeOpen: {
    effect: esImages.list,
    mapParams: () => {},
  },
});

const path = "/profile";

export {
  RouteProfile as route,
  RouteProfileImagesLoaded as loaded,
  PageProfile as view,
  path,
};
