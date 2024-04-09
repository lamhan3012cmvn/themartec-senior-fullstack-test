import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.css";
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "./routes";
import { HOCAuth } from "./hocs";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {},
  });
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {PUBLIC_ROUTES.map((routeItem) => {
            const Component = routeItem.layout ? (
              <routeItem.layout>
                <routeItem.element />
              </routeItem.layout>
            ) : (
              <routeItem.element />
            );

            return (
              <Route
                key={routeItem.path}
                path={routeItem.path}
                element={Component}
              />
            );
          })}
          {PRIVATE_ROUTES.map((routeItem) => {
            const Component = routeItem.layout ? (
              <HOCAuth>
                <routeItem.layout>
                  <routeItem.element />
                </routeItem.layout>
              </HOCAuth>
            ) : (
              <HOCAuth>
                <routeItem.element />
              </HOCAuth>
            );

            return (
              <Route
                key={routeItem.path}
                path={routeItem.path}
                element={Component}
              />
            );
          })}
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
