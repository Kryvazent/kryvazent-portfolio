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
  app.listen(env.port, () => console.log(`Kryvazent CMS API listening on port ${env.port}`));
};
start().catch((error) => {
  console.error("Failed to start API", error);
  process.exit(1);
});
