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

## Adding/Editing Airport Content

Airport content can be found in `/data` in individual files. Use the three-letter airport code as the filename (e.g. `phx.json`).

Content in each `json` file:

- `id` = three-letter code (e.g. phx)
- `classname` = three-letter code (phx)
- `code` = three-letter code (phx)
- `name` = airport name (Sky Harbor International Airport)
- `city` = primary city name (Phoenix)
- `state` = state name, if applicable (Arizona)
- `stateShort` = state abbreviation, if applicable (AZ)
- `country` = country name (USA)
- `description` = description, accepts markdown, use * for emphasis on letters
- `imageCredit` = name of photographer
- `imageCreditLink` = URL of photographer's Flickr page

You can also optionally add for aid in searching:

- `city2` = another city or county the airport may be known for
- `city3` = another city or county the airport may be known for

Add the airport to `/data/index.js`.

### Images

- Please use photos from Flickr that are licensed under Creative Commons.
- Please save out 4 sizes of each image with the filename convention `code-photographer.jpg`
  - Card, 250px height, put in `assets/images/_card`
  - Small, 500px width, put in `assets/images/_small`
  - Medium, 900px width, put in `assets/images/_medium`
  - Large, 1500px width, put in `assets/images/_large`
- Please optimize images

- Add variable and image name to `/assets/globals/image-names.styl`. That will look something like this: `$aus = 'aus-jon-collier.jpg'`
- Add image paths for card, small, medium, and large to `assets/components/backgrounds.styl`.

## Editing Templates

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
