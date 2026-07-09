import "dotenv/config";
import { app } from "./app.js";
import { connectDatabase } from "./config/database.js";
import { env } from "./config/env.js";
import { bootstrapData } from "./services/bootstrap.js";
import { startPublisher } from "./services/publisher.js";

const start = async () => {
  await connectDatabase();
  await bootstrapData();
  startPublisher();
  app.listen(env.port, "0.0.0.0", () => {
    console.log(`Kryvazent CMS API listening on 0.0.0.0:${env.port}`);
  });
};
start().catch((error) => {
  console.error("Failed to start API", error);
  process.exit(1);
});
