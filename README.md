# ping2mqtt

A node service that ping a device with arping and send a mqtt message when the divice turns online or offline.

## Prerequisites

- A MQTT Broker is running (https://mosquitto.org/)
- Arping installed

## Installation

1. `npm install`
2. `cp .env.example .env` then adjust
3. `npm run start` or `npm run start:dev`
