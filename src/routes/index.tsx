import { Routes as RouterRoutes, Route } from 'react-router-dom';

import PublicRoute from './PublicRoute';
import { Dashboard, Journey, Topic, Activity } from '../pages';

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
        path="/journey/:journeyId"
        element={
          <PublicRoute>
            <Journey />
          </PublicRoute>
        }
      >
        <Route path="topic/:topicId" element={<Topic />}></Route>
      </Route>
    </RouterRoutes>
  );
};

export default Routes;
