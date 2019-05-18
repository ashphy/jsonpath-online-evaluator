# JSONPath Online Evaluator [![Build Status](https://travis-ci.org/ashphy/jsonpath-online-evaluator.svg?branch=master)](https://travis-ci.org/ashphy/jsonpath-online-evaluator)
A playground for [JSONPath](http://goessner.net/articles/JsonPath/)

## Requirements
- ruby
- node.js
- yarn
- grunt
- bower

## Build on your environment
Artifacts are placed under the `dist`.

```
  $ bundle install
  $ yarn install
  $ yarn run build
  $ yarn run serve
```

## Build and run with Docker
Run on port `8080`.

```
  $ docker run -it --rm -p 8080:80 $(docker build -q .)
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
