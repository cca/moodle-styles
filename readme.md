# CCA Moodle Styles

Front-end Moodle files (images, JS, styles).

## Moodle Mobile App

The Premium app subscription lets us specify a stylesheet in the `mobilecssurl` setting of our Moodle instance that points to an **internal, web-accessible path** in Moodle e.g. the "local" directory.

It is hard to know how to style the mobile app because we cannot inspect its web view to see how the HTML is structured. You can read Moodle's [Mobile Themes doc](https://docs.moodle.org/dev/Moodle_Mobile_Themes) which has some example themes and also inspect the app itself at https://github.com/moodlehq/moodleapp (see the "src/components" directory).

1. write CSS using information above & compress it using `npx gulp mobile`
2. `scp` it into our Moodle's "local" directory
3. update the `mobilecssurl` appending a version hash e.g. `https://moodle.cca.edu/local/mobile.css#12` to force a fresh download
4. test in the mobile app, you may need to sign out and back in again

Hopefully we make step 2 (and maybe even 3) more automated in the future.
