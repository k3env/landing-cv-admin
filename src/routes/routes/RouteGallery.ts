import { createRoute, chainRoute } from "atomic-router";
import { fx_getImages } from "../../stores/storeImages";
const RouteGallery = createRoute();

const RouteGalleryLoaded = chainRoute({
  route: RouteGallery,
  beforeOpen: {
    effect: fx_getImages,
    mapParams: ({}) => {},
  },
});

export { RouteGallery, RouteGalleryLoaded };
