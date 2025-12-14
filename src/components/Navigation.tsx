import { Brain, HelpCircle } from 'lucide-react';

interface NavigationProps {
  currentPage: 'chatbot' | 'quiz';
  onNavigate: (page: 'chatbot' | 'quiz') => void;
}

export default function Navigation({ currentPage, onNavigate }: NavigationProps) {
  return (
    <nav className="bg-gradient-to-r from-slate-900 to-slate-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-white text-xl font-bold">Capital Développement AI</h1>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={() => onNavigate('chatbot')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                currentPage === 'chatbot'
                  ? 'bg-emerald-600 text-white shadow-lg'
                  : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
              }`}
            >
              <Brain size={20} />
              <span className="hidden sm:inline">AI Investment Committee</span>
              <span className="sm:hidden">Committee</span>
            </button>

            <button
              onClick={() => onNavigate('quiz')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                currentPage === 'quiz'
                  ? 'bg-emerald-600 text-white shadow-lg'
                  : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
              }`}
            >
              <HelpCircle size={20} />
              <span className="hidden sm:inline">Capital Development Quiz</span>
              <span className="sm:hidden">Quiz</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
