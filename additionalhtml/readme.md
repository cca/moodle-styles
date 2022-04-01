# CCA Moodle `additionalhtml` settings

We use the three `additionalhtml` settings (`head`, `topofbody`, `footer`) to add customizations to our Moodle theme. These are powerful settings because they are applied to every page on the site, giving us the ability to apply fixes across the whole app without relying on plugins or settings.

## Alerts

We use `additionalhtmltopofbody` for warnings or important announcements. To post an  alert:

1. Open the alert.html file in this folder and edit its text content to match. You can nest whatever HTML you need inside the `<div>` tag and change the "alert" class for different coloring, but do not modify the `<script>` or change the div's `id` attribute.
2. Go to Admin > Additional HTML > "When BODY is opened" [additionalhtmltopofbody](https://moodle.cca.edu/admin/search.php?query=additionalhtmltopofbody)
3. Copy-paste alert.html into the text area and **Save changes**
4. Remember to remove the alert when it is no longer needed

Is there a major problem breaking the Moodle login? Here is how to work around SSO authentication being down:

1. Run a shell on the Moodle GKE pod - `kubectl -n $NAMESPACE exec (kubectl -n $NAMESPACE get pods -o custom-columns=":metadata.name" | grep moodle) -it -- /bin/bash`
2. Disable SSO logins using [moosh](https://moosh-online.com/commands/) - `cd /bitnami/moodle; moosh -n auth-manage disable cas`
3. Go to the Moodle website and login with the manual administrator account (shared with the appropriate people in Dashlane)
4. Proceed with steps above
5. Remember to re-enable SSO once it's fixed, either using the admin site under [Authentication Plugins](https://moodle.cca.edu/admin/category.php?category=authsettings) or with `moosh -n auth-manage enable cas`

We can also put in Moodle in maintenance mode with `moosh -n maintenance-on`. It's recommended to do this while setting up the alert so users don't land on the manual login page and become frustrated when their CCA credentials don't work.

## Customizations

Add CSS edits under the theme, e.g.  Site administration > Appearance > Themes > Boost > Advanced Settings > `Raw SCSS`.

`additionalhtmlfooter` is the spot for JavaScript. Note that code loaded here happens _before jQuery_ or require.js are loaded, so we are pretty much forced to run a `setInterval` loop to wait for other resources to be available if we need them.

This repo's npm script `npm run js` runs a gulp build process over all the .js files in this directory, copies the result to your clipboard, and opens the appropriate Moodle settings page to paste into. We'll need to `npm install` the dependencies for this.

Note that, since all these scripts are concatenated together, syntax errors can be generated—to be safe, end each file in a semicolon if appropriate, to prevent the already-minified ga.js file from looking like a function call.

## Misc. Notes

Moodle documentation for these settings resides here: https://docs.moodle.org/38/en/Header_and_footer

Formerly its own repo at https://github.com/cca/moodle_additionalhtml

## LICENSE

[ECL Version 2.0](https://opensource.org/licenses/ECL-2.0)
