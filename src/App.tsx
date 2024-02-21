import { HashRouter as Router } from 'react-router-dom';
import Routes from './routes';
import { ToastContainer } from 'react-toastify';
import GlobalStyles from './styles/GlobalStyles';
import './styles/index.css';

const App: React.FC = () => {
  return (
    <Router>
      <GlobalStyles />
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
