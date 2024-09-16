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
    return language === 'tr' 
      ? `Gül Pembe - Barış Manço - Yeni bir gün 🌹`
      : `Bohemian Rhapsody - Queen - A Night at the Opera 🎸`
  }
}

export { getMusicRecommendation }