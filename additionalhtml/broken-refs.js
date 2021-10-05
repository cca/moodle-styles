// broken: fixed link pairs
const links = {
    'https://portal.cca.edu/learning/shops-studios-labs/hybrid_studio_resources/#software-coaching':
    'https://portal.cca.edu/learning/academic-technology/training-support/software-coaching/',
    'https://portal.cca.edu/learning/shops-studios-labs/online_studio_resources/#software-coaching':
    'https://portal.cca.edu/learning/academic-technology/training-support/software-coaching/',
    'https://libraries.cca.edu/about-us/about-us/ask-a-librarian/':
    'https://docs.google.com/forms/d/e/1FAIpQLSc1-K0wNRPZOCbM3s3iCUiHql8CR4y5E9Cc79qIOS5xDC6XOg/viewform?usp=sf_link',
    'https://libraries.cca.edu/':
    'https://docs.google.com/document/d/1204OAXIo8iyVJIqpyWpSTD3w3HPczc0SLAKyFH7JCKw/edit?usp=sharing'
}
const broken = Object.keys(links)
document.querySelectorAll('a').forEach(a => {
    if (broken.includes(a.href)) {
        console.log('replacing link', a.href)
        a.href = links[a.href]
    }
})
// images (point to Portal & not Libraries, related to Oct. 2021 outage)
const imgs = {
    'https://libraries.cca.edu/media/images/zoom.original.png':
    'https://portal-media.cca.edu/images/zoom_UzBf8KV.original.png',
    'https://libraries.cca.edu/media/images/voicethread.original.png':
    'https://portal-media.cca.edu/images/voicethread.original.png',
    'https://libraries.cca.edu/media/images/moodle.original.png':
    'https://portal-media.cca.edu/images/moodle.original.png',
    'https://libraries.cca.edu/media/images/librarian_help.original.png':
    'https://portal-media.cca.edu/images/librarian_help.original.png',
    'https://libraries.cca.edu/media/images/help.original.png':
    'https://portal-media.cca.edu/images/help.original.png',
    'https://libraries.cca.edu/media/images/cooperation_pobA9QI.original.png':
    'https://portal-media.cca.edu/images/cooperation.original.png',
    'https://libraries.cca.edu/media/images/asterisk.original.png':
    'https://portal-media.cca.edu/images/asterisk.original.png',
    'https://libraries.cca.edu/media/images/articles.original.png':
    'https://portal-media.cca.edu/images/articles.original.png',
    'https://libraries.cca.edu/media/images/LRC_Coach_Icon_-_white_bg.original.png':
    'https://portal-media.cca.edu/images/lrc_coach_icon.original.png',
    'https://libraries.cca.edu/media/images/Libraries-teal-logo_cB3FpYv.original.jpg':
    'https://portal-media.cca.edu/images/libraries-logo-400.original.original.png'
}
const ibroken = Object.keys(imgs)
document.querySelectorAll('img').forEach(i => {
    if (ibroken.includes(i.src)) {
        console.log('replacing image', i.src)
        i.src = imgs[i.src]
    }
})
