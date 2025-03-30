import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("login", "routes/login.tsx"),
    route("register", "routes/register.tsx"),
    route(
        '', 'routes/auth.layout.tsx', {}, [
          route('attempts', 'routes/attempts.tsx'),
        ]
      )
] satisfies RouteConfig;
