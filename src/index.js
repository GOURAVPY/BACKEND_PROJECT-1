import connectDB from './db/index.js';
import { configDotenv } from 'dotenv';
import { app } from './app.js';

configDotenv();

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`serevr is running at port: ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log('DB ERROR', error);
  });

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
