'use client'

import { AnimatePresence, motion } from 'framer-motion'
import React, { useState } from 'react'

import AnimatedBackground from '@/components/main/AnimatedBackground'
import MusicForm from '@/features/home/components/MucisForm'
import Shape from '@/components/main/Shape'

const getRandomShape = () => {
	const shapes = ['circle', 'square', 'triangle', 'diamond']
	return shapes[Math.floor(Math.random() * shapes.length)]
}

const HomePage = () => {
	const [showForm, setShowForm] = useState(true)

	return (
		<div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
			<AnimatedBackground />

			{[...Array(30)].map((_, i) => {
				const shape = getRandomShape()
				const size = Math.random() * 60 + 20
				return (
					<Shape
						key={i}
						shape={shape}
						style={{
							position: 'absolute',
							width: `${size}px`,
							height: `${size}px`,
							top: `${Math.random() * 100}%`,
							left: `${Math.random() * 100}%`,
							background: 'rgba(255, 255, 255, 0.1)'
						}}
					/>
				)
			})}

			<motion.div
				initial={{ opacity: 0, scale: 0.9 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.5 }}
				className="relative z-10 w-full max-w-md bg-white bg-opacity-10 backdrop-blur-xl rounded-xl shadow-2xl overflow-hidden"
			>
				<div className="p-8">
					<motion.h1
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.3, duration: 0.5 }}
						className="text-4xl font-bold mb-4 text-center text-white"
					>
						Müzik Önerici
					</motion.h1>
					<AnimatePresence mode="wait">
						{showForm ? (
							<motion.p
								key="form-message"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.5 }}
								className="text-lg text-center mb-4 text-gray-200"
							>
								Türe ve ruh halinize göre bir sonraki favori şarkınızı keşfedin!
							</motion.p>
						) : (
							<motion.p
								key="recommendation-message"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.5 }}
								className="text-lg text-center mb-6 text-gray-200"
							>
								Sizin için önerim, umarım beğenerek dinlersiniz.
							</motion.p>
						)}
					</AnimatePresence>
					<MusicForm onFormSubmit={() => setShowForm(false)} onResetForm={() => setShowForm(true)} />
				</div>
			</motion.div>
		</div>
	)
}

export default HomePage
