import { HashRouter as Router } from 'react-router-dom';
import Routes from './routes';
import { ToastContainer } from 'react-toastify';
import GlobalStyles from './styles/GlobalStyles';
import './styles/index.css';
import PageTransitionBubble from './components/PageTransitionBubble';
import FTSLoading from './components/FTSLoading';

const App: React.FC = () => {
  return (
    <Router>
      <GlobalStyles />
      <FTSLoading />
      <PageTransitionBubble />
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
        theme="dark"
      />
    </Router>
  );
};

export default App;
