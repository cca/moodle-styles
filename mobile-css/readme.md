# Moodle Mobile App

The Premium app subscription lets us specify a stylesheet in the `mobilecssurl` setting of our Moodle instance that points to a file under the app's theme directory\*. Moodle Mobile has [documentation on creating custom themes](https://moodledev.io/general/app/customisation/remote-themes).

The Moodle app recently (mid 2021) migrated to a new "Ionic5" style framework, there is [documentation here](https://docs.moodle.org/dev/Ionic5_style_migration_guide). You can also read Moodle's [Mobile Themes doc](https://docs.moodle.org/dev/Moodle_Mobile_Themes) which has some example themes and inspect the app itself at https://github.com/moodlehq/moodleapp (see the "src/components" directory).

You can view the mobile app in a browser at https://latest.apps.moodledemo.net/ or https://main.apps.moodledemo.net/. For some reason, entering CCA's URL does not work on these sites (as of summer 2023), but you enter "student" or "instructor" to view demo sites from those perspectives and then inspect the page source to learn how the app is structured so you can target different elements with CSS. See ["using hosted versions of the app"](https://moodledev.io/general/app/development/setup/app-in-browser#using-the-hosted-versions-of-the-app).

1. `npm run mobile` builds CSS & copies it to the Moodle server (you will need to be in either the staging or production cluster context with an `NS` variable set to the right app namespace)
2. Refresh your data (CCA site > profile > preferences > **Synchronize now**)
3. I've previously tried appending a hash increment like https://moodle.cca.edu/theme/ccamobile/mobile.css#23 onto our mobile URL but in practice the step above works better

\* You used to be able to place the CSS file under the "local" directory, but that stopped working due to either the upgrade to Moodle 4.0 or the 4.1 app
