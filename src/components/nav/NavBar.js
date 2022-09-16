import { Link, useNavigate } from "react-router-dom"

import "./NavBar.css"

export const NavBar = () => {
    const localKandyUser = localStorage.getItem("honey_user")
    const kandyUserObject = JSON.parse(localKandyUser)
    const navigate = useNavigate()

    return (
        <ul className="navbar">
            <li className="navbar__item active"><Link className="navbar__link" to="/bottleList">List of Bottles</Link></li>
            <li className="navbar__item active"><Link className="navbar__link" to="/NewBottleForm">New Bottle</Link></li>
            <li className="navbar__item active"><Link className="navbar__link" to="/InventoryAudit">New Inventory Audit</Link></li>
            <li className="navbar__item active"><Link className="navbar__link" to="/AuditButtons">Past Audits</Link></li>
            {
                localStorage.getItem("honey_user")
                    ? <li className="navbar__item navbar__logout">
                        <Link className="navbar__link" to="" onClick={() => {
                            localStorage.removeItem("honey_user")
                            navigate("/", { replace: true })
                        }}>Logout</Link>
                    </li>
                    : ""
            }
        </ul>
    )
}
