import React from 'react';
import {CONTACT} from '../constants';
import {motion} from 'framer-motion'

const Contact = () => {
    return (

<div

 className="border-t border-stone-900 pb-20">
<motion.h2 
whileInView={{opacity:1, y:0}}
initial={{opacity:0, y:-100}}
transition={{duration:1}}
className="my-10 text-center text-4xl"> Reach Me </motion.h2>
<motion.div
whileInView={{opacity:1, y:0}}
initial={{opacity:0, y:-100}}
transition={{duration:2}}
 className="text-center tracking-tighter">
    <motion.p 
    whileInView={{opacity:1, y:0}}
    initial={{opacity:0, y:-100}}
    transition={{duration:2}}
    className="my-4">
        {CONTACT.address}
    </motion.p>
    <motion.p 
    whileInView={{opacity:1, y:0}}
    initial={{opacity:0, y:-100}}
    transition={{duration:2}}
    className="my-4">
        {CONTACT.phoneNo}
        </motion.p>

        <motion.a 
        whileInView={{opacity:1, y:0}}
        initial={{opacity:0, y:-100}}
        transition={{duration:2}}
        href="mailto:hadebayorhussseini@gmail.com" className="border-b">
            {CONTACT.email}
        </motion.a>


</motion.div>

</div>



    )
};

export default Contact;