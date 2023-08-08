<template>
    <div class="row mt-3">
        
            <div class="d-flex flex-row justify-content-around">
                <div class="col-md-6">
                    <img class="card-img" src="https://dummyimage.com/640x640/bbb/555" alt="Vans">
                </div>

                <div class="col-md-4" v-if="product">
                    <h6 class="subtitle mb-2 text-muted" >
                        <span v-for="category in product.categories" :key="category.id" v-text="category.name"
                            class="me-2"></span>
                    </h6>
                    <h4 class="title">{{ product.name }}</h4>

                    <p class="card-text text-justify">{{ product.description }} </p>
                    <hr>

                    <div class="buy d-flex justify-content-around align-items-center">
                        <div class="price text-success">
                            <h5 class="mt-4" v-text="formatCurrency(product.price)"></h5>
                        </div>
                        <button 
                         class="btn btn-danger mt-3"
                         @click="$store.commit('addToCart' , product)"> Add to Cart</button>
                    </div>
                </div>
            </div>
    </div>
</template>

<script>
export default {
    methods: {
        formatCurrency(amount) {
            amount = (amount / 100);
            return amount.toLocaleString("en-US", { style: "currency", currency: "USD" });
        }
    },
    computed: {
        products() {
            return this.$store.state.products
        },
        product() {
            return this.products.find(product => product.slug === this.$route.params.slug)
        }
    }
}
</script>
