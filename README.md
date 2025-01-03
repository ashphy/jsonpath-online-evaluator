# JSONPath Online Evaluator [![CI](https://github.com/ashphy/jsonpath-online-evaluator/actions/workflows/ci.yml/badge.svg?branch=master)](https://github.com/ashphy/jsonpath-online-evaluator/actions/workflows/ci.yml)
A playground for [JSONPath](http://goessner.net/articles/JsonPath/)

## Requirements
- node.js

## Private Hosting

### Hosting static files

Download at [releases](https://github.com/ashphy/jsonpath-online-evaluator/releases).

### Run on docker

[Public docker image](https://hub.docker.com/r/ashphy/jsonpath-online-evaluator) is available

```bash
 $ docker run -d -p 8080:80 ashphy/jsonpath-online-evaluator:latest
```

## Development
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/ashphy/jsonpath-online-evaluator)

or on your local machine

```
  $ npm install
  $ npm run dev # Starting the dev server
  $ npm run build # Building the static files
```

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
