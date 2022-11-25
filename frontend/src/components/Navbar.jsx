import { Link } from "react-router-dom"
import { useLogout } from "../hooks/useLogout"
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()

    const handleLogout = (e) => {
        e.preventDefault()
        logout()
    }

    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1>List of ToDo's</h1>
                </Link>
                <nav>
                    {user && (                   
                        <div>
                            <span>{user.email}</span>
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                    )}
                    {!user && (
                        <div>
                            <Link to="/login">Login</Link>
                            <Link to="/register">Register</Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    )
}

export default Navbar