import app from "./app";
import mongoose from "mongoose";
import config from "./app/config";

const main = async () => {
  try {
    await mongoose.connect(config.dbUrl as string);
    app.listen(config.port, () => {
      console.log(`App is listening on port: ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
};

main();
