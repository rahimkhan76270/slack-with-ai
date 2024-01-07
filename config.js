require('dotenv').config()


const config = {
    GEMINI_API: process.env.GEMINI_API,
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_MESSAGINGSENDER_ID: process.env.FIREBASE_MESSAGINGSENDER_ID,
    FIREBASE_APP_ID:process.env.FIREBASE_APP_ID,
    FIREBASE_MEASUREMENT_ID:process.env.FIREBASE_MEASUREMENT_ID
}

export default config;