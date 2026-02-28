import { motion } from "motion/react"
import RotatingText from "../components/RotatingText"

export default function About({}) {
    return (
        <div className="pt-[20vh] flex flex-col items-center min-h-screen gap-[2vw]">
            <h1 className="flex flex-col items-center gap-[1vw] text-[4vw] font-bold text-[#2F7F34] text-center">
                <motion.div layout transition={{ type: "tween", duration: 0.4, ease: "easeInOut" }} className="flex items-center gap-4">
                    <motion.span layout transition={{ type: "tween", duration: 0.4, ease: "easeInOut" }}>Cultivating</motion.span>
                    <RotatingText
                        texts={['Growth', 'Mastery', 'Technique', 'Confidence']}
                        mainClassName="px-3 bg-[#2F7F34] text-white overflow-hidden py-1 justify-center rounded-lg"
                        staggerFrom={"last"}
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "-120%" }}
                        staggerDuration={0.025}
                        splitLevelClassName="overflow-hidden pb-0.5"
                        transition={{ type: "spring", damping: 30, stiffness: 400, layout: { type: "tween", duration: 0.4, ease: "easeInOut" } }}
                        rotationInterval={2000}
                    />
                </motion.div>
                Through Music
            </h1>
            <p className="text-[1.3vw] text-center text-[#1E5222] w-6/12">
                Nurturing the next generation of musicians with a foundation built on technique, passion, and artistic expression.
            </p>
            <div className="flex items-center justify-center gap-[1vw] text-[1vw]">
                <a href="#contact" className="bg-[#2F7F34] button button-hover">Trial Lesson</a>
                <a href="#programs"className="bg-[#ED3045]/60 button button-hover">Explore Programs</a>
            </div>
        </div>
    )
}
