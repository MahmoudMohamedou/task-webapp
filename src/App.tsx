import { Route, Routes } from "react-router-dom";
import ErrorPage from "./views/Error/ErrorPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { routes } from "./routes";
import { Page } from "./views/Page";
import { Suspense } from "react";

function App() {
  return (
    <div>
      <Routes>
        {routes.map((r) => (
          <Route
            key={r.path}
            path={r.path}
            element={
              r.protected === false ? (
                <Suspense>
                  <r.component />
                </Suspense>
              ) : (
                <ProtectedRoute>
                  <Page />
                </ProtectedRoute>
              )
            }
          />
        ))}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
