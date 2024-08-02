import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/travel-buddy';

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/travel-buddy', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: 'travel-buddy',
        });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

export default connectDB;
