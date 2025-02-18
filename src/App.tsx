import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Intro from './pages/Intro';
import Game from './pages/Game';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </Router>
  );
}

export default App;
