import "dotenv/config";

const config = {
  checkInterval: process.env.CHECK_INTERVAL || 10 * 1000,
  offlineThreshold: process.env.OFFLINE_THRESHOLD || 3 * 60 * 1000,
  deviceIP: process.env.DEVICE_IP || "192.168.10.100",
  mqtt: {
    host: process.env.MQTT_HOST || "localhost",
    port: process.env.MQTT_PORT || 1883,
    username: process.env.MQTT_USERNAME || "mosquitto",
    topic: process.env.MQTT_TOPIC || "ping2mqtt/iphone/status",
  },
};

export default config;
