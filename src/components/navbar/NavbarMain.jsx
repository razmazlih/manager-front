import { Link } from "react-router-dom";

function NavbarMain() {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
            </ul>
        </nav>
    );
}

export default NavbarMain;
