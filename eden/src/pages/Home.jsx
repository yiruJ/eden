import NavBar from "../components/NavBar"
import About from "../components/About"
import '../index.css'

export default function Home({}) {
    return (
        <div className="flex flex-col w-full h-min-h-screen relative">
            <NavBar />
            <About />
        </div>
    )
}