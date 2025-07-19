import { useTranslation } from 'react-i18next';

function Header() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <header className="bg-navy-900 text-white p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">{t('app.title')}</h1>
        <div>
          <button
            onClick={() => changeLanguage('en')}
            className="mr-2 hover:text-gold-500"
          >
            EN
          </button>
          <button
            onClick={() => changeLanguage('fr')}
            className="hover:text-gold-500"
          >
            FR
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;