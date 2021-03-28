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
      "URL": "http://localhost:3000"
    },
    {
      "URL": "http://localhost:3001"
    }
  ]
}
```
