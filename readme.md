# CCA Moodle Styles

Front-end Moodle files (images, JS, styles). There are npm scripts to apply the changes from the local project to our remote Moodle instances. They rely on a `NS` namespace variable set to either our staging or production namespace. See `npm run` for the list of commands.

## Theme Assets

### Styles

SCSS which you insert this code in the text area under Site Administration > Appearance > Themes > Boost > Advanced Settings.

### Scripts

We insert custom scripts into the `additionalhtml > footer` settings area. Our scripts are all under the additionalhtml directory.

### HTML blocks

These are custom HTML blocks which we keep a copy of for efficient editing. You can create blocks in Moodle easily enough, and edit their HTML there, but it can be hard to copy and keep them consistent without an external file like this. It is best to refer to image assets _outside of Moodle_ because Moodle does some peculiar handling of file paths that can break if you copy/paste the source of an HTML block.

## LICENSE

[ECL Version 2.0](https://opensource.org/licenses/ECL-2.0)
