# Additional HTML \<head\>

The content of the `additionalhtmlhead` setting is "added to the bottom of the HEAD tag for every page." We add our validation `<meta>` tags here, for Google Search Console and MoodleNet, on the production instance. Staging doesn't need these but we include a staging HTML file for future use.

The names of the HTML files for each instance should be set to their respective kubernetes namespace (to simplify our npm build scripts).

## Adding JS to the Grading Interface

The grading interface for assignments, which has a URL that looks like `/mod/assign/view.php?id=$ASSIGNMENT&rownum=0&action=grader&userid=$USER`, does not include the content of the other two `additionalhtml` settings, but it does include this head. The only way to customize the grading interface with JavaScript is to include a `<script>` tag here.

We need to customize the grading interface as part of our effort to [streamline the Internships ILA approval process](https://github.com/cca/moodle-styles/issues/32).

## Alerts and Modal Dialogs

```js
require(["core/notification", "core/toast"], function(notification, toast) {
    // https://github.com/moodle/moodle/blob/main/lib/amd/src/notification.js
    // modal dialog you have to dismiss
    notification.alert("title","main body can use HTML <br>","button text (default OK)")

    // boolean dialog with callbacks depending on the button clicked
    notification.confirm("title","body","yes btn label","no btn label", function yescb() {
        // callback
    }, function nocb() {})

    // like confirm but no btn = "Cancel" and has no callback
    notification.saveCancel("title","body","save btn label","cancel btn label", function savecb() {
        // callback
    })

    // like saveCancel but returns a promise instead of using a callback
    notification.saveCancelPromise("title","body","save btn label").then(function() {
        // callback
    })

    // toasts are short-lived messages that disappear after 4 seconds, types: success, danger, warning, info (default)
    // https://componentlibrary.moodle.com/admin/tool/componentlibrary/docspage.php/moodle/javascript/toast/
    // https://github.com/moodle/moodle/blob/main/lib/amd/src/toast.js
    // config options are similar to notifications (title, subtitle, autohide, close button, delay)
    toast.add("body can use HTML", { type: "success" })
})
```

To see more options, you can require one of the libraries and look at the funtion signatures. There's `notification.exception` which accepts only an error object, for instance. There is also a `core/modal` library which has more options but is more complex to use. See the [Moodle JavaScript documentation](https://moodledev.io/docs/4.1/guides/javascript/modal) for more information.
