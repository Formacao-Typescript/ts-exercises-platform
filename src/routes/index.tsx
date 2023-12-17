import { Routes as RouterRoutes, Route } from 'react-router-dom';

import PublicRoute from './PublicRoute';
import { Dashboard } from '../pages';

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
    </RouterRoutes>
  );
};

export default Routes;
