import { useDarkMode } from "../scripts/DarkMode";

export const Navbar = () => {
    const { darkMode, setDarkMode } = useDarkMode();

    const txtColorMode = darkMode ? "Dark Mode" : "Light Mode";

    return (

        <nav className={`navbar navbar-expand-lg fixed-top ${darkMode ? "navbar-dark" : "navbar-light"}`}>
            <div className="container-fluid">
                <a className="navbar-brand" href="../public/index.html"><img src="/logo.png" alt="logo" className="logo" /></a>

                <div id="navbarSupportedContent">

                    {/* oscuro/claro */}
                    <div className="d-flex flex-column align-items-center">
                        <div className="form-check form-switch">
                            <input
                                type="checkbox"
                                className="form-check-input mb-1"
                                checked={darkMode}
                                onChange={() => setDarkMode(!darkMode)}
                            />  
                        </div>

                        <div className="small text-center">
                            <strong>{txtColorMode}</strong>
                        </div>
                    </div>

                    {/* search */}
                    {/*
                    <div className="mx-auto">
                        <form className="d-flex" role="search">
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Search"
                        />
                        <button className="btn btn-outline-success">
                            Search
                        </button>
                        </form>
                    </div>
                    */}


                    {/* perfil */}

                </div>
            </div>
        </nav>
  );
};
