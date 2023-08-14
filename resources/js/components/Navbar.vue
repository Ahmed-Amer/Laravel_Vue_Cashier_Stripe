<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round"
                    stroke-linejoin="round" stroke-width="2" class=" text-dark p-2" viewBox="0 0 24 24">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                </svg> | Shopping Cart</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <router-link tag="li" class="nav-item" :to="{ name: 'products.index' }">
                        Products
                    </router-link>
                </ul>

                <nav class="justify-content-end">
                    <router-link class="btn btn-secondary" :to="{ name: 'order.checkout' }">
                        Basket <span class="inline-block ms-1">({{ this.$store.state.cart.length }} item)</span>
                    </router-link>
                </nav>

            </div>
        </div>
    </nav>
</template>
<style scoped>
svg {
    width: 40px;
    height: 40px;
    background-color: #bcd0c7;
    border-radius: 50%;
    margin-right: 5px;
    color:black;
}
.nav-item{
    cursor: pointer;
}
.btn{
    background-color: #bcd0c7 !important;
    border-color:#bcd0c7 !important ;
    color:black;
}
</style>
