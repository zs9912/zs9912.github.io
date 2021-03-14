// make sure service worker are supported
if('serviceWorker' in navigator) {
    console.log('SW supported');
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('../sw_cached_pages.js')
        .then(register => console.log('SW registered'))
        .catch(err => console.log('Service worker Error', err))
    })
}else{
    console.log('SW not supported')
}