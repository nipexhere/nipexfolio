
import profilePic from "../assets/Adebayo.png" 
import {HERO_CONTENT} from "../constants/index.js";
import {motion} from "framer-motion"



const containerVariants = {
    hidden: { opacity: 0, x: -100},
    visible: {
        opacity:3,
        x:0,
        transition: {
            duration:0.5,
            staggerChildren:0.5,

        }
    }
}
const childVariants = {
    hidden: {opacity:0, x: +100},
    visible: {opacity:1, x: 0, transition: {duration:1}}

}

const Hero = () => {
    return (
        <div className="pb-4 lg:mb-36">
            <div className="flex flex-wrap lg:flex-row-reverse">
                <div className="w-full lg:w-1/2">
                <div className="flex justify-center lg:p-8">
                <motion.img 
                src={profilePic}
                 alt="Nipex"
                  className ="border h-50 border-stone-900 rounded-4xl"
                 width={300}
                 height={300}
                  initial={{x:100, opacity:0}}
                 animate={{x:0, opacity:1 }}
                 transition={{ duration:1, delay:1.5}} />

                </div>
            </div>

            <div className="w-full lg:w-1/2">
            <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants} 

            className="flex flex-col items-center lg:items-start mt-10">
                <motion.h2
                variants={childVariants}
                 className="pb-2 text-4xl tracking-tighter lg:text-8xl">Adebayo Oseni (Nipex)</motion.h2>
                <motion.span
                variants={childVariants} className="text-2xl text-amber-300">Frontend Developer</motion.span>
                <motion.p 
                variants={childVariants}
                className="mt-4 text-lg text-stone-300 lg:text-2xl">
                   {HERO_CONTENT.greeting}</motion.p> 
                   <motion.p
                   variants={childVariants}> {HERO_CONTENT.introduction} </motion.p> 
                   <motion.p
                   variants={childVariants}>{HERO_CONTENT.description} 
                    </motion.p>
                    <motion.a
                    variants={childVariants} href="/AdebayoResume.pdf" 
                    target="_blank"
                    rel="noopener noreferrer"
                    download 
                    className="mt-4 inline-block rounded-full bg-amber-300 px-6 py-3 text-lg font-semibold text-black hover:bg-amber-400">
         Download my Resume 
         </motion.a>
            </motion.div>
            </div>
            </div>


        </div>
    )
}
export default Hero;