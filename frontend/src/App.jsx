import { useTranslation } from 'react-i18next';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';

function App() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-roboto">
      <Header />
      <main className="max-w-7xl mx-auto p-6">
        <Dashboard />
      </main>
    </div>
  );
}

export default App;