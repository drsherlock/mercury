# mercury

#### To start -

- CONFIG=PATH_TO_CONFIG_FILE yarn start
- CONFIG=PATH_TO_CONFIG_FILE yarn start:dev

Example - CONFIG=./config.json yarn start

Example config.json file -

```
{
  "PORT": 8080,
  "STRATEGY": "RANDOM",
  "SERVERS": [
    {
      "URL": "http://localhost:3000",
      "WEIGHT": 1
    },
    {
      "URL": "http://localhost:3001",
      "WEIGHT": 5
    },
    {
      "URL": "http://localhost:3002",
      "WEIGHT": 5
    }
  ],
  "PROFILER": false
}
```
