function Header() {
  return (
    <header className="bg-navy-900 text-white p-6 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold font-roboto">SportPulse Analytics</h1>
        <nav className="space-x-6">
          <a href="#nhl" className="hover:text-gold-500 transition duration-300 font-open-sans text-lg">NHL</a>
          <a href="#nfl" className="hover:text-gold-500 transition duration-300 font-open-sans text-lg">NFL</a>
          <a href="#golf" className="hover:text-gold-500 transition duration-300 font-open-sans text-lg">Golf</a>
          <a href="#tennis" className="hover:text-gold-500 transition duration-300 font-open-sans text-lg">Tennis</a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
