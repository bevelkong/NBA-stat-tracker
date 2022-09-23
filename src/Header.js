import logo from "./nbalogo.jpg"
import "./Header.css"

function Header(){
    return(
        <div>
            <h1 className="body">Find an NBA player's stats for the year</h1>
            <img className="img" src={logo} alt="Logo" />
        </div>
    )
}

export default Header;