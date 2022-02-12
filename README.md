# JSONPath Online Evaluator [![CI](https://github.com/ashphy/jsonpath-online-evaluator/actions/workflows/ci.yml/badge.svg)](https://github.com/ashphy/jsonpath-online-evaluator/actions/workflows/ci.yml)
A playground for [JSONPath](http://goessner.net/articles/JsonPath/)

## Requirements
- node.js

## Build on your environment
Artifacts placed under the `build`.

```
  $ npm install
  $ npm start # Starting the dev server
  $ npm run build # Building the static files
```

## Run on docker

[Public docker image](https://hub.docker.com/r/ashphy/jsonpath-online-evaluator) is available

```bash
 $ docker run -d -p 8080:80 ashphy/jsonpath-online-evaluator:latest
```

## Hosting static files

Download at [releases](https://github.com/ashphy/jsonpath-online-evaluator/releases).

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License
[MIT](http://opensource.org/licenses/MIT)

## Author
[Kazuki Hamasaki](http://ashphy.com)
