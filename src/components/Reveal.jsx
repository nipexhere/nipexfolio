import { motion as Motion, useReducedMotion } from 'framer-motion';

// Fades content up the first time it scrolls into view.
function Reveal({ as = 'div', children, delay = 0, ...props }) {
  const reduceMotion = useReducedMotion();
  const Component = Motion[as];

  return (
    <Component
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      whileInView={{ opacity: 1, y: 0 }}
      {...props}
    >
      {children}
    </Component>
  );
}

export default Reveal;
