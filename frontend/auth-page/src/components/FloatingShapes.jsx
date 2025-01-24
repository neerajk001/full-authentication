import { motion } from 'framer-motion'
import React  from 'react'

const FloatingShapes = ({ delay, size, color, top, left }) => {
  return (
    <motion.div
      className={`absolute rounded-full ${color} ${size} opacity-20 blur-2xl`}
      style={{ top, left }}
      initial={false}
      animate={{
        y: ["0", "-100", "100", "0"],  // Vertical movement in pixels
        x: ["0", "-100", "-0"],  // Horizontal movement in pixels
        rotate: [0 , 360],      // Full rotation
      }}
      transition={{
        duration: 20,
        ease: "linear",
        repeat: Infinity,
        repeatType: "loop",
        delay: delay,
      }}
      aria-hidden="true"
    />
  )
}

export default FloatingShapes