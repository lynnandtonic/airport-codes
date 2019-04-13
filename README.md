# Airport Codes

A website that tries to make sense of those three-letter airport codes.

## Contributing

If you'd like to add an airport or fix an error, please:

- [Submit an issue](https://github.com/lynnandtonic/airport-codes/issues) or
- Submit a pull request or
- Contact us on Twitter: [@lynnandtonic](https://twitter.com/lynnandtonic)

## Working Locally

This repo has a lot of images, so may take some time to clone. If you'd like to speed up that process, you can clone only the latest (and not the entire commit history) by cloning with this command:

With SSH:

```
git clone --depth=1 git@github.com:lynnandtonic/airport-codes.git
```

With HTTPS:

```
git clone --depth=1 https://github.com/lynnandtonic/airport-codes.git
```

To build the site locally:

```
npm install
npm run dev
```

## Adding/Editing Airport Content

Airport content can be found in `/data` in individual files. Use the three-letter airport code as the filename (e.g. `phx.json`).

Content in each `json` file:

- `id` = three-letter code (e.g. phx)
- `name` = airport name (Sky Harbor International Airport)
- `city` = primary city name (Phoenix)
- `state` = state name, if applicable (Arizona)
- `stateShort` = state abbreviation, if applicable (AZ)
- `country` = country name (USA)
- `description` = description, accepts markdown, use \* for emphasis on letters
- `imageCredit` = name of photographer
- `imageCreditLink` = URL of photographer's Flickr page

You can also optionally add for aid in searching:

- `city2` = another city or county the airport may be known for

Adding a `json` file to `/data` will automatically render it. You do not need to manually add the path anywhere.

### Images

- Please use photos from Flickr that are licensed under Creative Commons.
- If photos are not available on Flickr, please use Wikipedia with the same license.
- Images should be named with this convention: `code.jpg`
- To generate the 4 sizes of the image (large, medium, small, and card):
  - Save out the image as a JPG at large size (1500px wide) with the filename `assets/images/large/code.jpg`
  - **Please optimize images** ([tinyjpg.com](https://tinyjpg.com/) is a good tool to do that)
  - Run `./sharp.js assets/images/large/code.jpg`
- If you’d like to save out the image sizes manually, these are the sizes needed:
  - card - 220px *height*
  - small - 500px width
  - medium - 900px width
  - large - 1500px width

- Add variable to `/assets/globals/image-names.styl`. The code must match the airport code. So if an image is named `abq.jpg` you would add `'abq': '',` to the `image-names.styl`.

## Editing Templates

Most site content is written in Pug templates which produce the site HTML.

The Pug files are located in `/templates` and `/src/views/templates`.

Note that these aren't markdown files and the syntax and whitespace you use does matter quite a bit. See the [Pug documentation](http://pugjs.com) to see how to use Pug.

## Editing CSS

This site uses [Stylus for preprocessing](http://learnboost.github.io/stylus/). Please follow the established indentation and commenting patterns.

Stylus files are located in `/assets`.

### Declaration Order

Please use the following loose declaration order:

- Box-model properties
- Display and Positioning
- Backgrounds
- Borders
- Box Shadows
- Fonts and Colors
- Other

## License

[GNU General Public License v3.0](http://choosealicense.com/licenses/gpl-3.0/)

Because of the Creative Commons licensed images used on this site, any derivatives _CAN NOT_ be for commercial or paid use.

<3
