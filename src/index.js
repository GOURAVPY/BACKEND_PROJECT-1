import connectDB from './db/index.js';
import { configDotenv } from 'dotenv';

configDotenv()

connectDB();

// (async () => {
//   try {
//     await mongoose.connect(`${process.env.MONGO_URI0}/${DB_NAME}`);
//     app.on('error', () => {
//       console.log('ERR', error);
//       throw error;
//     });
//     app.listen(`listening on port${process.env.PORT}`);
//   } catch (error) {
//     console.log('error', error);
//     throw err;
//   }
// })();
