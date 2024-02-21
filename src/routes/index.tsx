import { Routes as RouterRoutes, Route } from 'react-router-dom';

import PublicRoute from './PublicRoute';
import { Dashboard, DiscordCallback, Journey, Topic } from '../pages';
import AuthRoute from './AuthRoute';

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
      <Route
        path="/auth"
        element={
          <AuthRoute>
            <h1>potencia</h1>
          </AuthRoute>
        }
      >
        <Route path="discord/callback" element={<DiscordCallback />}></Route>
      </Route>
    </RouterRoutes>
  );
};

export default Routes;
