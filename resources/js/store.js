import axios from 'axios';
import vue from 'vue';
import vuex from 'vuex';

vue.use(vuex);

export const store = new vuex.Store({
    state: {
        products : [],
        cart : [],
        order : {},
    },
    getters: {
       
    },
    mutations: {
        setProducts(state, products) {
            state.products = products;
        },
        addToCart(state, product) {
            let productInCartIndex = state.cart.findIndex(item => item.slug === product.slug );
            if(productInCartIndex != -1){
                state.cart[productInCartIndex].quantity++;
                return;
            } 
            product.quantity = 1;
            state.cart.push(product);
        },
        removeFromCart(state, index) {
            state.cart.splice(index , 1);
        },
        setCart(state, cart) {
            state.cart = cart;
        },
        setOrder(state, order) {
            state.order = order;
        },
       
    },
    actions: {

        getProducts({ commit }) {
            axios.get('/api/products')
            .then(response => {
                commit('setProducts' , response.data);
            })
            .catch(error => {
                console.error(error);
            });
        },
        clearCart({ commit }){
            commit('setCart' , []);
        }
       
      
    }
})
