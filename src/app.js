import { checkArping } from "./checkArping.js";
import { initializeMQTTClient } from "./mqtt.js";

const mqttClient = initializeMQTTClient(checkArping);

process.on("SIGTERM", () => {
  console.log("Service shutting down...");
  mqttClient.end();
  process.exit(0);
});
