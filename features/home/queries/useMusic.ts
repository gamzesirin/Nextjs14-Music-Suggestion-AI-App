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

// features/home/services/Music.ts

import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(
  process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string
)

const getMusicRecommendation = async (genre: string, mood: string, language: 'tr' | 'en'): Promise<string> => {
  const model: GenerativeModel = genAI.getGenerativeModel({ model: 'gemini-pro' })
  const prompt: string = `You are a music expert. Suggest a song that fits the given genre and mood. The recommendation should include: song name, artist name, and album name (if applicable), separated by " - ". Keep the response under 300 characters. Only return the recommendation in the format "Song Name - Artist Name - Album Name 🎵", don't add anything else. Use an appropriate emoji at the end instead of 🎵 if you wish. Do not include "by" before the artist name.

Genre: ${genre}
Mood: ${mood}
Language: ${language === 'tr' ? 'Turkish' : 'English'}`

  try {
    const result = await model.generateContent(prompt)
    let recommendation: string = result.response.text()

    recommendation = recommendation.replace(/\[object Object\]/g, '')
    recommendation = recommendation.replace(/\[\[\w+\]\]/g, '')
    recommendation = recommendation.replace(/\s+/g, ' ')
    recommendation = recommendation.trim()

    const parts = recommendation.split(' - ')
    if (parts.length < 2) {
      throw new Error('Invalid recommendation format')
    }

    return recommendation
  } catch (error) {
    console.error('Error getting music recommendation:', error)
    
    const fallbackSongs = language === 'tr' 
      ? [
          "Gül Pembe - Barış Manço - Yeni bir gün 🌹",
          "Sor - Serdar Ortaç - Mesafe 🎤",
          "Araba - Mustafa Sandal - Araba 🚗",
          "Firuze - Sezen Aksu - Firuze 💎",
          "Deli - Demet Akalın - Pırlanta 💃"
        ]
      : [
          "Bohemian Rhapsody - Queen - A Night at the Opera 🎸",
          "Imagine - John Lennon - Imagine 🕊️",
          "Billie Jean - Michael Jackson - Thriller 🕴️",
          "Like a Rolling Stone - Bob Dylan - Highway 61 Revisited 🎭",
          "Smells Like Teen Spirit - Nirvana - Nevermind 🥁"
        ];
    
    return fallbackSongs[Math.floor(Math.random() * fallbackSongs.length)];
  }
}

export { getMusicRecommendation }