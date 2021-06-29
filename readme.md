# CCA Moodle Styles

Front-end Moodle files (images, JS, styles).

## Moodle Mobile App

The Premium app subscription lets us specify a stylesheet in the `mobilecssurl` setting of our Moodle instance that points to an **internal, web-accessible path** in Moodle e.g. the "local" directory.

The Moodle app recently (mid 2021) migrated to a new "Ionic5" style framework, there is [documentation here](https://docs.moodle.org/dev/Ionic5_style_migration_guide). You can also read Moodle's [Mobile Themes doc](https://docs.moodle.org/dev/Moodle_Mobile_Themes) which has some example themes and inspect the app itself at https://github.com/moodlehq/moodleapp (see the "src/components" directory).

1. `npm run mobile` builds CSS & copies it to the Moodle server (you will need to be on the VPN and your user will need to own the local/mobile.css file for this step to work)
2. update the `mobilecssurl` appending a version hash e.g. `https://moodle.cca.edu/local/mobile.css#12` to force a fresh download
3. test in the mobile app, you may need to sign out and back in again

## Theme Assets

**scss**

SCSS which you insert this code in the text area under Site Administration > Appearance > Themes > Boost > Advanced Settings. You can run `npm run css` to copy the SCSS to your clipboard & open this administration page.

**js**

We insert custom scripts into the `additionalhtml > footer` settings area. Our scripts are all under the additionalhtml directory. You can run `npm run js` to build the JavaScript and open the settings page.

**HTML blocks**

These are custom HTML blocks which we keep a copy of for efficient editing. You can create blocks in Moodle easily enough, and edit their HTML there, but it can be hard to copy and keep them consistent without an external file like this. It is best to refer to image assets _outside of Moodle_ because Moodle does some peculiar handling of file paths that can break if you copy/paste the source of an HTML block.
