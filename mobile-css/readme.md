# Moodle Mobile App

**NOTE**: the only CSS customization we do on the mobile app is hiding the progress indicator in the Course Overview block, but since we do not use that block anymore _this code is no longer necessary_. However, we will retain it in case we want to make customizations in the future.

## App CSS Documentation

The Premium app subscription lets us specify a stylesheet in the `mobilecssurl` setting of our Moodle instance that points to a file in Moodle's root\*. Moodle Mobile has [documentation on creating custom themes](https://moodledev.io/general/app/customisation/remote-themes).

The Moodle app (as of 2021) uses an "Ionic5" style framework, there is [documentation here](https://docs.moodle.org/dev/Ionic5_style_migration_guide). We can also read Moodle's [Mobile Themes doc](https://docs.moodle.org/dev/Moodle_Mobile_Themes) which has some example themes and inspect the app itself at https://github.com/moodlehq/moodleapp (see the "src/components" directory).

We can view the mobile app in a browser at https://latest.apps.moodledemo.net/ or https://main.apps.moodledemo.net/. For some reason, entering CCA's URL does not work on these sites (as of summer 2023), but we can enter "student" or "instructor" to view demo sites from those perspectives and then inspect the page source to learn how the app is structured so we can target different elements with CSS. See ["using hosted versions of the app"](https://moodledev.io/general/app/development/setup/app-in-browser#using-the-hosted-versions-of-the-app).

## Updating Our CSS

1. Enter the right k8s context (e.g. with `set -gx NS moo-stg1` and the libraries-k8s tools).
1. `npm run mobile` builds CSS & copies it to the Moodle server.
1. Refresh data in the app (App settings > Synchronization > Refresh icon under CCA site).

I tried appending a hash increment like https://moodle.cca.edu/theme/ccamobile/mobile.css#23 onto our mobile URL but in practice synchronizing the app worked better.

\* We used to be able to place the CSS file under the "local" directory, but that stopped working due to an upgrade to either Moodleor the mobile app. Files in the /theme/ directory have to be part of a full Moodle theme and might cause errors.
