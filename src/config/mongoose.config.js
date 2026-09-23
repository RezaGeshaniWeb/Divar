const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('اتصال به دیتابیس برقرار شد.')
    } catch (err) {
        console.log(err?.message ?? 'اتصال به دیتابیس ناموفق بود.')
        throw err
    }
}

module.exports = connectDB
