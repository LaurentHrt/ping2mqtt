import mqtt from "mqtt";
import config from "./config.js";

export function initializeMQTTClient(onConnect) {
  const { host, port, username } = config.mqtt;
  const mqttClient = mqtt.connect(`mqtt://${host}:${port}`, {
    username,
  });

  mqttClient.on("connect", () => {
    console.log("Connected to MQTT broker");
    onConnect(mqttClient);
  });

  mqttClient.on("error", (err) => {
    console.error("MQTT error:", err);
  });

  return mqttClient;
}
