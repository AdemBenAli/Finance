import { useState } from 'react';
import Navigation from './components/Navigation';
import Chatbot from './components/Chatbot';
import Quiz from './components/Quiz';

function App() {
  const [currentPage, setCurrentPage] = useState<'chatbot' | 'quiz'>('chatbot');

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />

      {currentPage === 'chatbot' ? <Chatbot /> : <Quiz />}
    </div>
  );
}

export default App;
