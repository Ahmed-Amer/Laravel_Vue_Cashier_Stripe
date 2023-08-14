<template>
    <div class="content">

        <div class="row mt-3" v-if="products.length">
            <div class="col-md-4" v-for="product in products" :key="product.id">
                <div class="card mb-3">
                    <router-link :to="{ name: 'products.show', params: { slug: product.slug } }">
                        <img class="card-img" src="https://dummyimage.com/420x260/fff/aaa" alt="Vans">
                    </router-link>

                    <div class="card-body">
                        <h4 class="card-title">{{ product.name }}</h4>
                        <h6 class="card-subtitle mb-2 text-muted">
                            <span v-for="category in product.categories" :key="category.id" v-text="category.name"
                                class="me-2"></span>
                        </h6>
                        <div class="buy d-flex justify-content-between align-items-center">
                            <div class="price text-success">
                                <h5 class="mt-4" v-text="formatCurrency(product.price)"></h5>
                            </div>
                            <button class="btn btn-danger mt-3" @click="$store.commit('addToCart', product)"> Add to
                                Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row mt-3" v-else>Loading...</div>
        
</div>
</template>

<script>
export default {
    methods: {
        formatCurrency(amount) {
            amount = (amount / 100);
            return amount.toLocaleString("en-US", { style: "currency", currency: "USD" });
        },
        testingfun(amiunt){
            return amount / 100;
            console.log(amount);
        }
    },
    computed: {
        products() {
            return this.$store.state.products
        }
    }
}
</script>
<style scoped>
.btn {
    background-color: #bcd0c7 !important;
    border-color: #bcd0c7 !important;
    color:black;
}
</style>