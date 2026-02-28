import homeImage from "../assets/home.jpg"

export default function About({}) {
    return (
        <div>
            <img src={homeImage} alt="Home" className="w-full h-full object-cover object-top" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>
        </div>
    )
}