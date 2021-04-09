# CSS
CSS is generated from SASS in `/sass` to `/out`. 

`out/index.css` can be used as universal CSS for the site and `index.css.map` can be used to link it to the SASS if needed (more commonly used for debugging).

## Quick Overview of SASS
We are using SCSS, a SASS type that resembles CSS more and accepts normal CSS.

Modules are prefixed with an underscore and can be included in the `/sass/index.scss` file.

The nicest feature of SASS is the nesting, which you should use if possible. Find more information on the [SASS site](https://sass-lang.com/).