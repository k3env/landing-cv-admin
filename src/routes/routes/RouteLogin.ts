import { createRoute } from "atomic-router";
import { PageLogin } from "~pages";
const route = createRoute<{}>();

const path = "/login";

export { route, PageLogin as view, path };
