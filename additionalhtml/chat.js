// if we're signed in & not on an admin page
if (!location.pathname.match('/admin/') && !!document.querySelector('.usermenu .avatar.current')) {
    // use libraryh3lp Presence API https://dev.libraryh3lp.com/presence.html
    fetch('https://libraryh3lp.com/presence/jid/cca-instructional-support/chat.libraryh3lp.com/text')
        .then(resp => resp.text())
        .then(status => {
            // only display if we are signed in
            if (status == 'available' || status == 'chat') {
                // jQuery not available yet
                let div = document.createElement('div')
                div.className = 'needs-js'
                document.querySelector('body').append(div)
                let x = document.createElement("script");
                x.async = true;
                x.src = "https://libraryh3lp.com/js/libraryh3lp.js?17190";
                let y = document.getElementsByTagName("script")[0];
                y.parentNode.insertBefore(x, y);
            }
        })
}
