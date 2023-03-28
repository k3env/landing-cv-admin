import { chainRoute, createRoute } from "atomic-router";
import { fx_getImages } from "../../stores/storeImages";
import { fx_getProfile } from "../../stores/storeProfile";
const RouteProfile = createRoute();

const RouteProfileLoaded = chainRoute({
  route: RouteProfile,
  beforeOpen: {
    effect: fx_getProfile,
    mapParams: () => {},
  },
});

const RouteProfileImagesLoaded = chainRoute({
  route: RouteProfileLoaded,
  beforeOpen: {
    effect: fx_getImages,
    mapParams: () => {},
  },
});

export { RouteProfile, RouteProfileLoaded, RouteProfileImagesLoaded };
