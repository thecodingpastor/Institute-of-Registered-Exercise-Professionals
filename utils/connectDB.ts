import mongoose from "mongoose";

// const connectDB = async () => {
//   return mongoose.connect(process.env.LOCAL_MONGO_URI);
// }
const connectDB = async () => {
  // check if we have a connection to the database or if it's currently
  // connecting or disconnecting (readyState 1, 2 and 3)
  // if (mongoose.connection.readyState >= 1) {
  //   return;
  // }
  // const connectionString =
  //   process.env.NODE_ENV !== "production"
  //     ? process.env.LOCAL_MONGO_URI
  //     : process.env.LIVE_MONGO_URI;
  const connectionString = process.env.LOCAL_MONGO_URI;

  mongoose.set("strictQuery", false);
  return (
    mongoose
      .connect(connectionString, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
        // useFindAndModify: false,
        // useCreateIndex: true,
      })
      .then(() => {
        // console.log("DB Connection Successful");
      })
      // Check this later
      .catch((err) => console.error(err))
  );
};

export default connectDB;
