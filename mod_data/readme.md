# Database Activities

We store templates from [database][moodle_db] activities that InST has designed here, since it is difficult to edit them (and track changes) in Moodle's interface.

Database activities are very flexible because they allow you to define a set of fields of various types, templates for viewing an individual entry, list of entries, and submitting a new entry, as well as custom JavaScript that loads on all of those template pages. You can fill in gaps and create your own activities easily, but because of their variable structure they cannot be hooked up to activity completion or grades automatically.

To apply the code stored here, copy-paste into the HTML source view (the icon is angle brackets with a slash in between `</>`). You will also need to create fields with matching names and types; each activity should have a schema.csv which cannot be imported in any way but outlines what fields you need to create. Inputs (on the add form) and values (on the list and single views) for these fields are rendered in templates using double-bracketed `[[fieldname]]` syntax. There are also special double-hashmarked template fields that link to actions (e.g. `##delete##`) or user info (e.g. `##user##`).

## Bugs and Gotchas

DB `number` fields are rendered as text inputs. We can fix this with the activity's JS; see towards the top of timetracker.js for an example..

When you edit an entry with a date, the date resets to one day earlier. You can change it back but it's easy to miss and annoying to do every time. We might be able to fix this with JS: 1) identify you're on an entry being editing (it will have a `rid` parameter in the URL), 2) set the date to one day later than its current value.

The way the list view renders, you cannot use a single table, because the header has to be rendered in its own table. Moodle's rich text filters won't let you open but not close a tag, so you can't open a table in the header and close it in the footer. This also means each repeated entry has to also be _in its own table_. This is terrible for accessibility and we should migrate to non-table elements and a CSS grid.

[moodle_db]: https://docs.moodle.org/401/en/Database_activity
