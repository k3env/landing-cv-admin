import { createRoute, chainRoute } from "atomic-router";
import { esImages } from "../../stores";
import { PageGallery } from "../../pages";
const RouteGallery = createRoute();

const RouteGalleryLoaded = chainRoute({
  route: RouteGallery,
  beforeOpen: {
    effect: esImages.list,
    mapParams: ({}) => {},
  },
});
const path = "/gallery";

export {
  RouteGallery as route,
  RouteGalleryLoaded as loaded,
  path,
  PageGallery as view,
};
