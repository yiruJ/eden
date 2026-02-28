import logo from "../assets/logo.png"
import '../index.css'

export default function NavBar({}) {
    return (
        <div className="flex items-center fixed top-[2vh] left-0 w-full z-10 px-6">
            <img src={logo} alt="Logo" className="w-12 h-12"/>
            <div className="flex gap-[5vw] mx-auto ">
                <a href="#about" className="navTool navTool-hover">ABOUT</a>
                <a href="#instruments" className="navTool navTool-hover">INSTRUMENTS</a>
                <a href="#teachers" className="navTool navTool-hover">TEACHERS</a>
                <a href="#pricing" className="navTool navTool-hover">PRICING</a>
            </div>
            <button className="button button-hover">Sign up for trial</button>
        </div>
    )
}