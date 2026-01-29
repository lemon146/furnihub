import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    const connection = await mongoose.connect(
      `${process.env.MONGODBURI}/${process.env.DATABASE}`,
    );

    console.log("DATABASE connected:", connection.connection.name);
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

export default dbConnection;
