const youtube = require('./controller/youtubeVideo');
const routes = () => {
    const route = [
        { url: '/youtube', route: youtube },
    ];
    return route;
}
module.exports = { routes }