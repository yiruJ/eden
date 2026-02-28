import logo from "../assets/logo.png"
import '../index.css'

export default function NavBar({}) {
    return (
        <div className="flex items-center fixed left-0 w-full h-1/17 z-10 px-6 bg-[#2F7F34]/10 backdrop-blur-md">
            <img src={logo} alt="Logo" className="w-12 h-12"/>
            <div className="flex gap-[5vw] mx-auto">
                <a href="#about" className="navTool navTool-hover">About</a>
                <a href="#programs" className="navTool navTool-hover">Programs</a>
                <a href="#instruments" className="navTool navTool-hover">Instruments</a>
                <a href="#teachers" className="navTool navTool-hover">Teachers</a>
                <a href="#pricing" className="navTool navTool-hover">Pricing</a>
            </div>
            <button className="bg-[#2F7F34] button button-hover">Sign up for trial</button>
        </div>
    )
}