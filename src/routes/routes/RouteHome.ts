import { createRoute } from "atomic-router";
import { PageHome } from "../../pages";
const RouteHome = createRoute();
const path = "/";

export { RouteHome as route, path, PageHome as view };
