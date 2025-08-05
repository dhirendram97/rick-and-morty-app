import {
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import App from "./App";
import CharacterList from "./pages/CharacterList";
import CharacterDetails from "./pages/CharacterDetails";


const rootRoute = createRootRoute({ component: App });

const characterListRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: CharacterList,
});

const characterDetailsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/character/$id",
  component: CharacterDetails,
});

const routeTree = rootRoute.addChildren([
  characterListRoute,
  characterDetailsRoute,
]);

export const router = createRouter({ routeTree });
