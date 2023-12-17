import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes';
import { ToastContainer } from 'react-toastify';

const App: React.FC = () => {
  return (
    <Router>
      <Routes />
      <ToastContainer
        autoClose={5000}
        closeOnClick
        draggable
        hideProgressBar={false}
        newestOnTop={false}
        pauseOnFocusLoss={false}
        pauseOnHover
        position="bottom-right"
        rtl={false}
      />
    </Router>
  );
};

export default App;
