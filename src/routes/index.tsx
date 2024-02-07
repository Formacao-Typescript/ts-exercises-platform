import { Routes as RouterRoutes, Route } from 'react-router-dom';

import PublicRoute from './PublicRoute';
import { Dashboard, Journey } from '../pages';

const Routes: React.FC = () => {
  return (
    <RouterRoutes>
      {/* PUBLIC ROUTES */}
      <Route
        path="/"
        element={
          <PublicRoute>
            <Dashboard />
          </PublicRoute>
        }
      />
      <Route
        path="/journey/:id"
        element={
          <PublicRoute>
            <Journey />
          </PublicRoute>
        }
      />
    </RouterRoutes>
  );
};

export default Routes;
