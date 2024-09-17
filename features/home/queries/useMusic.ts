// import { getMusicRecommendation } from '../services/Music'
// import { useState } from 'react'

// interface MusicFormData {
//   genre: string
//   mood: string
//   language: 'tr' | 'en'
// }

// export function useMusic() {
//   const [recommendation, setRecommendation] = useState<string>('')
//   const [isLoading, setIsLoading] = useState<boolean>(false)
//   const [error, setError] = useState<string | null>(null)

//   const getRecommendation = async (formData: MusicFormData) => {
//     setIsLoading(true)
//     setError(null)
//     try {
//       const result = await getMusicRecommendation(formData.genre, formData.mood, formData.language)
//       setRecommendation(result)
//     } catch (err) {
//       setError('Failed to get music recommendation. Please try again.')
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return { recommendation, isLoading, error, getRecommendation }
// }



import { useState } from 'react'
import { getMusicRecommendation } from '../services/Music'

interface MusicFormData {
  genre: string
  mood: string
  language: 'tr' | 'en'
}

interface Recommendation {
  songName: string
  artist: string
  album?: string
  link: string
}

export function useMusic() {
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const getRecommendation = async (formData: MusicFormData) => {
    setIsLoading(true)
    setError(null)
    try {
      const result = await getMusicRecommendation(formData.genre, formData.mood, formData.language)
      const [songName, artist, album] = result.split(' - ')
      setRecommendation({
        songName,
        artist,
        album,
        link: `https://www.youtube.com/results?search_query=${encodeURIComponent(`${songName} ${artist}`)}`
      })
    } catch (err) {
      setError('Failed to get music recommendation. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return { recommendation, isLoading, error, getRecommendation }
}