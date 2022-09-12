import { Link, useNavigate } from "react-router-dom"

import "./NavBar.css"

export const NavBar = () => {
    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)
    const navigate = useNavigate()

    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/locations">Locations</Link>
            </li>
            <li className="navbar__item active"><Link className="navbar__link" to="/ProductContainer">Products</Link></li>
            <li className="navbar__item active"><Link className="navbar__link" to="/productForm">New Product</Link></li>
            <li className="navbar__item active"><Link className="navbar__link" to="/employeeForm">New Employee</Link></li>
            {
                localStorage.getItem("kandy_user")
                    ? <li className="navbar__item navbar__logout">
                        <Link className="navbar__link" to="" onClick={() => {
                            localStorage.removeItem("kandy_user")
                            navigate("/", { replace: true })
                        }}>Logout</Link>
                    </li>
                    : ""
            }
        </ul>
    )
}
