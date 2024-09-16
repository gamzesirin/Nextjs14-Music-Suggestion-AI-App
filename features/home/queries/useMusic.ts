import { getMusicRecommendation } from '../services/Music'
import { useState } from 'react'

interface MusicFormData {
  genre: string
  mood: string
  language: 'tr' | 'en'
}

export function useMusic() {
  const [recommendation, setRecommendation] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const getRecommendation = async (formData: MusicFormData) => {
    setIsLoading(true)
    setError(null)
    try {
      const result = await getMusicRecommendation(formData.genre, formData.mood, formData.language)
      setRecommendation(result)
    } catch (err) {
      setError('Failed to get music recommendation. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return { recommendation, isLoading, error, getRecommendation }
}