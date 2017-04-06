# homebridge-lights

A [Homebridge](https://github.com/nfarina/homebridge) plugin that controls a
custom light solution by sending out HTTP requests based on Siri requests.

## Configuration

Add the following to your Homebridge configuration file for each light,
where `light_id` is the the ID of the light, `server_address` is the address
of your [home automation server](https://github.com/vsaarinen/home-automation)
and `username` and `password` your credentials to said server:

```json
{
  [...]
  "accessories": [
    {
      "accessory": "light",
      "name": "Living room",
      "light_id": "1",
      "server_address": "https://your.server.address",
      "username": "your_username",
      "password": "your_password"
    },
    {
      "accessory": "light",
      "name": "Dining room",
      "light_id": "2",
      "server_address": "https://your.server.address",
      "username": "your_username",
      "password": "your_password"
    },
    [...]
  ],
}
