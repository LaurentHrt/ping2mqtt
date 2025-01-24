import config from "./config.js";
import { exec } from "child_process";

// State Tracking
let lastResponseTime = Date.now();
let isOnline = false;

// Function to run arping and check response
export function checkArping(mqttClient) {
  const { deviceIP, offlineThreshold, checkInterval } = config;
  const { topic } = config.mqtt;

  exec(`sudo arping -R -C 1 -w 10 -W 2 ${deviceIP}`, (error, stdout) => {
    const now = Date.now();
    const timestamp = new Date().toISOString();

    if (!error && stdout.includes(deviceIP)) {
      // Device responded
      if (!isOnline) {
        console.log(`[${timestamp}] Device is online.`);
        mqttClient.publish(
          topic,
          JSON.stringify({
            status: "online",
            timestamp,
          }),
        );
        isOnline = true;
      }
      lastResponseTime = now;
    } else {
      // Device did not respond
      if (now - lastResponseTime >= offlineThreshold && isOnline) {
        console.log(`[${timestamp}] Device is offline.`);
        mqttClient.publish(
          topic,
          JSON.stringify({
            status: "offline",
            timestamp,
          }),
        );
        isOnline = false;
      }
    }

    // Schedule the next check
    setTimeout(() => checkArping(mqttClient), checkInterval);
  });
}
