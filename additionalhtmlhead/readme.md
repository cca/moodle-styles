# Additional HTML \<head\>

The content of the `additionalhtmlhead` setting is "added to the bottom of the HEAD tag for every page." We add our validation `<meta>` tags here, for Google Search Console and MoodleNet, on the production instance. Staging doesn't need these but we include a staging HTML file for future use.

The names of the HTML files for each instance should be set to their respective kubernetes namespace (to simplify our npm build scripts).

## Adding JS to the Grading Interface

The grading interface for assignments, which has a URL that looks like `/mod/assign/view.php?id=$ASSIGNMENT&rownum=0&action=grader&userid=$USER`, does not include the content of the other two `additionalhtml` settings, but it does include this head. The only way to customize the grading interface with JavaScript is to include a `<script>` tag here.

We need to customize the grading interface as part of our effort to [streamline the Internships ILA approval process](https://github.com/cca/moodle-styles/issues/32).
