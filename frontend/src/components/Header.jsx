function Header() {
  return (
    <header className="bg-blue-800 text-white p-4 shadow-md">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">SportPulse Analytics</h1>
        <nav className="space-x-4">
          <a href="#nhl" className="hover:underline">NHL</a>
          <a href="#nfl" className="hover:underline">NFL</a>
          <a href="#golf" className="hover:underline">Golf</a>
          <a href="#tennis" className="hover:underline">Tennis</a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
