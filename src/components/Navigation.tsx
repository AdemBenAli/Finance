import { Brain, HelpCircle } from 'lucide-react';

interface NavigationProps {
  currentPage: 'chatbot' | 'quiz';
  onNavigate: (page: 'chatbot' | 'quiz') => void;
}

export default function Navigation({ currentPage, onNavigate }: NavigationProps) {
  return (
    <nav className="bg-gradient-to-r from-slate-900 to-slate-800 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          <div className="flex items-center">
            <h1 className="text-white text-base sm:text-xl font-bold truncate">
              Capital Développement AI
            </h1>
          </div>

          <div className="flex space-x-2 sm:space-x-4">
            <button
              onClick={() => onNavigate('chatbot')}
              className={`flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-2 rounded-lg transition-all duration-300 text-sm sm:text-base ${
                currentPage === 'chatbot'
                  ? 'bg-emerald-600 text-white shadow-lg'
                  : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
              }`}
            >
              <Brain size={18} className="sm:w-5 sm:h-5" />
              <span className="hidden md:inline">Comité IA</span>
              <span className="md:hidden">IA</span>
            </button>

            <button
              onClick={() => onNavigate('quiz')}
              className={`flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-2 rounded-lg transition-all duration-300 text-sm sm:text-base ${
                currentPage === 'quiz'
                  ? 'bg-emerald-600 text-white shadow-lg'
                  : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
              }`}
            >
              <HelpCircle size={18} className="sm:w-5 sm:h-5" />
              <span className="hidden md:inline">Quiz</span>
              <span className="md:hidden">Quiz</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
