/* eslint-disable no-undef */
import mongoose from "mongoose";

const connection = {};

async function connect() {
  if (connection.isConnected) {
    // console.log("already connected");
    return;
  }
  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState;
    if (connection.isConnected === 1) {
      // console.log("use previous connection");
      return;
    }
    await mongoose.disconnect();
  }

  const db = await mongoose.connect(process.env.DB_URI);
  // console.log("new connection");
  connection.isConnected = db.connections[0].readyState;
}

async function disconnect() {
  if (connection.isConnected) {
    if (process.env.NODE_ENV === "production") await mongoose.disconnect();
    connection.isConnected = false;
  } else {
    // console.log("not disconnected");
  }
}

const db = { connect, disconnect };

export default db;

// const connectMongo = async () => {
//   try {
//     const { connection } = await mongoose.connect(process.env.DB_URI);

//     if (connection.readyState === 1) {
//       return Promise.resolve(true);
//     }
//   } catch (error) {
//     return Promise.reject(error);
//   }
// };

// export default connectMongo;
