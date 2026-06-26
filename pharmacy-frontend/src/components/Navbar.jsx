import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav>
            <Link to="/">Categories</Link> |{" "}
            <Link to="/products">Products</Link> |{" "}
            <Link to="/sales">Sales</Link> |{" "}
            <Link to="/alerts">Alerts</Link>
        </nav>
    );
}

export default Navbar;