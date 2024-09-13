import * as z from 'zod'

import { AnimatePresence, motion } from 'framer-motion'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import React, { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import RecommendationCard from './RecommendationCard'
import { useForm } from 'react-hook-form'
import { useMusic } from '../queries/useMusic'
import { zodResolver } from '@hookform/resolvers/zod'

const formSchema = z.object({
	genre: z.string().min(3, { message: 'Tür en az 3 karakter olmalıdır.' }),
	mood: z.string().min(5, { message: 'Duygu durumu en az 5 karakter olmalıdır.' }),
	language: z.enum(['tr', 'en'], { required_error: 'Lütfen bir dil seçin.' })
})

type FormValues = z.infer<typeof formSchema>

const LoadingUI = () => {
	const emojis = ['🎵', '🎶', '🎸', '🥁', '🎹', '🎷', '🎺', '🎻']
	const [currentEmojiIndex, setCurrentEmojiIndex] = useState(0)

	React.useEffect(() => {
		const interval = setInterval(() => {
			setCurrentEmojiIndex((prevIndex) => (prevIndex + 1) % emojis.length)
		}, 500)
		return () => clearInterval(interval)
	}, [])

	return (
		<motion.div
			className="flex flex-col items-center justify-center space-y-8"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
		>
			<motion.div
				className="text-6xl"
				animate={{
					scale: [1, 1.2, 1],
					rotate: [0, 360]
				}}
				transition={{
					duration: 2,
					repeat: Infinity,
					ease: 'easeInOut'
				}}
			>
				{emojis[currentEmojiIndex]}
			</motion.div>
			<motion.div className="flex space-x-2">
				{[...Array(3)].map((_, index) => (
					<motion.span
						key={index}
						className="w-4 h-4 bg-purple-500 rounded-full"
						animate={{
							y: ['0%', '100%', '0%'],
							scale: [1, 0.5, 1]
						}}
						transition={{
							duration: 0.8,
							repeat: Infinity,
							ease: 'easeInOut',
							delay: index * 0.2
						}}
					/>
				))}
			</motion.div>
			<motion.p
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="text-lg font-medium text-white text-center"
			>
				Müzik dünyasında sizin için harika bir öneri arıyoruz...
			</motion.p>
		</motion.div>
	)
}

function MusicForm({ onFormSubmit, onResetForm }: any) {
	const { recommendation, isLoading, error, getRecommendation } = useMusic()
	const [showForm, setShowForm] = useState(true)

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			genre: '',
			mood: '',
			language: 'tr'
		}
	})

	const onSubmit = (data: FormValues) => {
		getRecommendation(data)
		setShowForm(false)
		onFormSubmit()
	}

	const resetForm = () => {
		form.reset()
		setShowForm(true)
		onResetForm()
	}

	const formFields = [
		{ name: 'genre', label: 'Tür', placeholder: 'örn. Rock, Pop, Jazz' },
		{ name: 'mood', label: 'Duygu Durumu', placeholder: 'örn. Mutlu, Hüzünlü, Enerjik' },
		{ name: 'language', label: 'Dil', type: 'select' }
	]

	return (
		<div className="p-6 bg-gray-900 rounded-2xl shadow-xl mt-4">
			<AnimatePresence>
				{showForm ? (
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
							{formFields.map((field) => (
								<FormField
									key={field.name}
									control={form.control}
									name={field.name as 'genre' | 'mood' | 'language'}
									render={({ field: formField }) => (
										<FormItem>
											<FormLabel className="text-white">{field.label}</FormLabel>
											<FormControl>
												{field.type === 'select' ? (
													<Select onValueChange={formField.onChange} defaultValue={formField.value}>
														<SelectTrigger className="bg-white text-gray-900 border-2 border-purple-500 rounded-xl">
															<SelectValue placeholder="Bir dil seçin" />
														</SelectTrigger>
														<SelectContent className="bg-white text-gray-900 rounded-xl border-2 border-purple-500">
															<SelectItem value="en">İngilizce</SelectItem>
															<SelectItem value="tr">Türkçe</SelectItem>
														</SelectContent>
													</Select>
												) : (
													<Input
														placeholder={field.placeholder}
														{...formField}
														className="bg-gray-800 text-gray-100 placeholder-gray-500 border-2 border-purple-500 rounded-xl"
													/>
												)}
											</FormControl>
											<FormMessage className="text-xxs mt-1 text-white opacity-80" />
										</FormItem>
									)}
								/>
							))}
							<div className="flex justify-center pt-6">
								<Button
									type="submit"
									disabled={isLoading}
									className="bg-purple-500 hover:bg-purple-600 text-white rounded-xl transition-colors duration-300 mt-4 text-xl"
								>
									{isLoading ? 'Öneri Alınıyor...' : 'Öneri Al'}
								</Button>
							</div>
						</form>
					</Form>
				) : (
					<motion.div className="space-y-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
						{isLoading ? (
							<LoadingUI />
						) : (
							<>
								{recommendation && <RecommendationCard recommendation={recommendation} />}
								<div className="flex justify-center pt-6">
									<Button
										onClick={resetForm}
										className="bg-purple-500 hover:bg-purple-600 text-white rounded-xl transition-colors duration-300 mt-4 text-xl"
									>
										Yeni Öneri Al
									</Button>
								</div>
							</>
						)}
					</motion.div>
				)}
			</AnimatePresence>
			{error && <p className="text-white opacity-80 mt-4 text-xs">{error}</p>}
		</div>
	)
}

export default MusicForm
