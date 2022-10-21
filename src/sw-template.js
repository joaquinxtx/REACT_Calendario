importScripts(
    'https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js'
);

workbox.loadModule('workbox-background-sync');


workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

const{registerRoute}=workbox.routing;
const {CacheFirst , NetworkFirst , NetworkOnly}=workbox.strategies
const {BackgroundSyncPlugin}=workbox.backgroundSync;

const cacheNetworkFirst =[
   '/api/auth/renew',
   '/api/events'
]
//forma 1 (mas limpio)
registerRoute(
    ({request,url})=>{
        if(cacheNetworkFirst.includes(url?.pathname)) return true 
        
        return false
    },
    new NetworkFirst()
    );
    
    

    
//forma 2 

registerRoute(
    new RegExp('https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css'),
    new CacheFirst()
)

registerRoute(
    new RegExp('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.0-2/css/all.min.css'),
    new CacheFirst()
);





// offLine Post 

const bgSyncPlugin = new BackgroundSyncPlugin('posteos-offline', {
    maxRetentionTime: 24 * 60 // Retry for max of 24 Hours (specified in minutes)
})



registerRoute(
    new RegExp('https://backend-calendario-production.up.railway.app/api/events'),
    new NetworkOnly({
        plugins: [ bgSyncPlugin ]
    }),
    'POST'
)
registerRoute(
    new RegExp('https://backend-calendario-production.up.railway.app/api/events/'),
    new NetworkOnly({
        plugins: [ bgSyncPlugin ]
    }),
    'PUT'
)
registerRoute(
    new RegExp('https://backend-calendario-production.up.railway.app/api/events/'),
    new NetworkOnly({
        plugins: [ bgSyncPlugin ]
    }),
    'DELETE'
)


