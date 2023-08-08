require('./bootstrap');

window.Vue = require('vue').default;


import App from './components/App.vue';
import VueRouter from 'vue-router';
import { routes } from './routes';
import { store } from './store';


//Registering vue router
Vue.use(VueRouter);
const router = new VueRouter({
    routes: routes,
    mode: 'history'
});


new Vue({
    render: (h) => h(App),
    store: store,
    router: router,
    created(){
        store.dispatch('getProducts')
        .then(_ =>{})
        .catch(error => {
            console.error(error);
        })
    }
}).$mount('#app')


