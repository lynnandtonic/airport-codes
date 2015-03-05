# Airport Codes

A website that tries to make sense of those three-letter airport codes.

## Contributing

If you'd like to add an airport or fix an error, please:

- [Submit an issue](https://github.com/lynnandtonic/airport-codes/issues)
- Submit a pull request
- Contact us on Twitter: [@lynnandtonic](https://twitter.com/lynnandtonic) or [@nickcrohn](https://twitter.com/nickcrohn)

## Working Locally

```
npm install
gulp
```

## Editing Content

Most site content is written in Jade templates which produce the site HTML.

The Jade files are located in `/templates` and `/src/views/templates`.

Note that these aren't markdown files and the syntax and whitespace you use does matter quite a bit. See the [Jade documentation](http://jade-lang.com) to see how to use Jade.

## Editing CSS

This site uses [Stylus for preprocessing](http://learnboost.github.io/stylus/). Please follow the established indentation and commenting patterns.

Stylus files are located in `/assets`.

### Declaration Order

Please use the following loose declaration order:

* Box-model properties
* Display and Positioning
* Backgrounds
* Borders
* Box Shadows
* Fonts and Colors
* Other