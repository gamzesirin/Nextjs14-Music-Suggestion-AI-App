import { Card, CardContent } from '@/components/ui/card'

import React from 'react'
import { motion } from 'framer-motion'

interface RecommendationCardProps {
	recommendation: {
		songName: string
		artist: string
		album?: string
		link: string
	}
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({ recommendation }) => {
	const { songName, artist, album, link } = recommendation

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -20 }}
			transition={{ duration: 0.5 }}
		>
			<Card className="w-full max-w-md mx-auto bg-gradient-to-br from-purple-500 to-indigo-600 text-white shadow-xl rounded-xl overflow-hidden">
				<CardContent className="space-y-4 p-4">
					<div>
						<h2 className="text-xl font-semibold">Şarkı: {songName}</h2>
						<h3 className="text-lg">Sanatçı: {artist}</h3>
						{album && <p className="text-sm opacity-75">Albüm: {album}</p>}
					</div>
					<a
						href={link}
						target="_blank"
						rel="noopener noreferrer"
						className="block mt-4 bg-white text-purple-600 px-4 py-2 rounded-full text-center font-semibold hover:bg-opacity-90 transition-colors duration-300"
					>
						Şarkıyı Dinle
					</a>
				</CardContent>
			</Card>
		</motion.div>
	)
}

export default RecommendationCard
