// https://moodle.cca.edu/admin/tool/uploaduser/index.php
if (location.pathname.match('/admin/tool/uploaduser/index.php')) {
    // remove any "Default values" (cannot figure out how to do with via admin settings!)
    document.querySelectorAll('#id_defaultheader input[type="text"]').forEach((el) => {
        el.value = ''
    })
}
