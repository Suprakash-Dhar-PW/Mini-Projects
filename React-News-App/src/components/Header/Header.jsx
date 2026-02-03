const Header = ({ dark, toggleDark }) => {
  return (
    <nav className="navbar navbar-primary bg-primary px-3">

      <h4 className="text-white m-0 badge bg-dark fs-4 pb-3">
        React News App
      </h4>

      <button
        className="btn btn-light btn-sm"
        onClick={toggleDark}
      >
        {dark ? "Light Mode" : "Dark Mode"}
      </button>

    </nav>
  );
};

export default Header;
