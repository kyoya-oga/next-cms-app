import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI as string;

let connection: any = null;
const dbConnect = async () => {
  try {
    if (!connection) {
      connection = await mongoose.connect(uri);
    }
    return connection;
  } catch (error) {
    console.log('db connection fail: ', error);
  }
};

export default dbConnect;
