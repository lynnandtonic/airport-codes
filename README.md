# Airport Codes

A website that tries to make sense of those three-letter airport codes.

## Contributing

If you'd like to add an airport or fix an error, please:

- [Submit an issue](https://github.com/lynnandtonic/airport-codes/issues) or
- Submit a pull request or
- Contact us on Twitter: [@lynnandtonic](https://twitter.com/lynnandtonic) or [@nickcrohn](https://twitter.com/nickcrohn)

## Working Locally

```
npm install

npm run dev
```

## Adding/Editing Airport Content

Airport content can be found in `/data` in individual files. Use the three-letter airport code as the filename (e.g. `phx.json`).

Content in each `json` file:

- `id` = three-letter code (e.g. phx)
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

Adding a `json` file to `/data` will automatically render it. You do not need to manually add the path anywhere.

### Images

- Please use photos from Flickr that are licensed under Creative Commons.
- If photos are not available on Flickr, please use Wikipedia with the same license.
- Please save out 4 sizes of each image as a JPG with the filename convention `code-photographer.jpg`
  - Card, 250px height, put in `assets/images/card`
  - Small, 500px width, put in `assets/images/small`
  - Medium, 900px width, put in `assets/images/medium`
  - Large, 1500px width, put in `assets/images/large`
- Please optimize images

- Add variable and photographer name to `/assets/globals/image-names.styl`. The photographer name must match how it is spelled in the image file name. So if an image is named `abq-david-basanta.jpg` you would add `'abq': 'david-basanta'` to the `image-names.styl`.

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

## License

[GNU General Public License v3.0](http://choosealicense.com/licenses/gpl-3.0/)

Because of the Creative Commons licensed images used on this site, any derivatives _CAN NOT_ be for commercial or paid use.
