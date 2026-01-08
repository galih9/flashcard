import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("pages/MainMenu.tsx"),
    route("game", "pages/GameScreen.tsx"),
    route("game-over", "pages/GameOverScreen.tsx"),
] satisfies RouteConfig;
