import React from 'react'
import { motion } from 'framer-motion'

const AnimatedBackground: React.FC = () => {
	return (
		<motion.div
			className="fixed inset-0 z-0"
			initial={{ background: 'linear-gradient(45deg, #ff00cc, #3333ff)' }}
			animate={{
				background: [
					'linear-gradient(45deg, #ff00cc, #3333ff)',
					'linear-gradient(45deg, #3333ff, #00ff99)',
					'linear-gradient(45deg, #00ff99, #ff00cc)'
				]
			}}
			transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
		/>
	)
}

export default AnimatedBackground
