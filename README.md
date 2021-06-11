# mercury
mercury is a load balancer built using node.js.

## Usage -
- yarn install
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
      "WEIGHT": 1,
      "FAILURE_TIMEOUT": 20,
      "MAX_FAILURES": 3
    },
    {
      "URL": "http://localhost:3001",
      "WEIGHT": 5,
      "FAILURE_TIMEOUT": 20,
      "MAX_FAILURES": 3
    },
    {
      "URL": "http://localhost:3002",
      "WEIGHT": 5,
      "FAILURE_TIMEOUT": 10,
      "MAX_FAILURES": 3
    }
  ]
}
```

Available Strategies -
- RANDOM
- ROUND_ROBIN
- WEIGHTED_RANDOM
- WEIGHTED_ROUND_ROBIN
- LEAST_CONNECTIONS

## Load Test -
To load test, install [Apache Bench](http://httpd.apache.org/docs/current/programs/ab.html) and [GNUPlot](http://www.gnuplot.info/).

Example -
1. ab -n 10000 -c 100 -g benchmark.tsv "http://localhost:8080/"
2. gnuplot apache-benchmark.p

## TODO -
- Write tests
- Koa?
- SSL termination
- Logging
- Weighted Least Connection strategy
- Hash/IP based strategy
- Typescript?
- Docker

## Contributing
You can contribute to code of the website by forking it and sending me a pull request after making changes or you can suggest features, report bugs here on github.

## LICENSE
Licensed under [MIT](https://github.com/drsherlock/mercury/blob/main/LICENSE).
