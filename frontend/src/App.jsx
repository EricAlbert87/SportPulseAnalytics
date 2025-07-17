import { useTranslation } from 'react-i18next';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';

function App() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <Header />
      <main className="p-4">
        <Dashboard />
      </main>
      <h1>Hello, SportPulse Analytics!</h1>;
    </div>
  );

}

export default App;
