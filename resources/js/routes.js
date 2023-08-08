
export const routes = [
    { 
        path: '/', 
        name: 'products.index', 
        component: () => import('./components/products/Index.vue') 
    },
    { 
        path: '/product/:slug', 
        name: 'products.show', 
        component: () => import('./components/products/Show.vue') 
    },
    { 
        path: '/checkout', 
        name: 'order.checkout', 
        component: () => import('./components/order/Checkout.vue') 
    },
    { 
        path: '/summary', 
        name: 'order.summary', 
        component: () => import('./components/order/Summary.vue') 
    },
    { 
        path : '/:pathMatch(.*)*', 
        component: () => import('./components/products/Index.vue') 
    }
]
