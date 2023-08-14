<template>
    <div class="checkout">
        <div class="row d-flex flex-row justify-content-center">
            <div class="col-md-8">
                <div class="mt-5">
                    <table class="table">
                        <thead class="table-success">
                            <tr>
                                <th scope="col">Item</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Price</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in cart" :key="item.id">
                                <td class="p-4" v-text="item.name"></td>
                                <td class="p-4" v-text="item.quantity"></td>
                                <td class="p-4" v-text="cartLineTotal(item)"></td>
                                <td class="w-10 text-right">
                                    <button class="btn btn-sm btn-danger mt-2"
                                        @click="$store.commit('removeFromCart', index)">Remove</button>
                                </td>
                            </tr>
                            <tr>
                                <td class="p-4 fw-bold">Total Amount</td>
                                <td class="p-4 fw-bold" v-text="cartQuantity"></td>
                                <td class="p-4 fw-bold" v-text="cartTotal"></td>
                                <td class="w-10 text-right"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="mt-5 mb-5">
                    <div class="row">
                        <div class="col-md-6 form-group">
                            <label for="firstname">First Name</label>
                            <input type="text" class="form-control"
                                :class="[{ 'is-invalid': errorFor('customer.first_name') }]" name="first_name"
                                v-model="customer.first_name" :disabled="paymentProcessing">
                            <span class="form-error">{{ errorFor('customer.first_name') }}</span>
                        </div>

                        <div class="col-md-6 form-group">
                            <label for="lastname">Last Name</label>
                            <input type="text" class="form-control"
                                :class="[{ 'is-invalid': errorFor('customer.last_name') }]" name="last_name"
                                v-model="customer.last_name" :disabled="paymentProcessing">
                            <span class="form-error">{{ errorFor('customer.last_name') }}</span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12 form-group">
                            <label for="email">Email</label>
                            <input type="text" class="form-control" :class="[{ 'is-invalid': errorFor('customer.email') }]"
                                name="email" v-model="customer.email" :disabled="paymentProcessing">
                            <span class="form-error">{{ errorFor('customer.email') }}</span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4 form-group">
                            <label for="address">Address</label>
                            <input type="text" class="form-control"
                                :class="[{ 'is-invalid': errorFor('customer.address') }]" name="address"
                                v-model="customer.address" :disabled="paymentProcessing">
                            <span class="form-error">{{ errorFor('customer.address') }}</span>
                        </div>
                        <div class="col-md-4 form-group">
                            <label for="city">City</label>
                            <input type="text" class="form-control" :class="[{ 'is-invalid': errorFor('customer.city') }]"
                                name="city" v-model="customer.city" :disabled="paymentProcessing">
                            <span class="form-error">{{ errorFor('customer.city') }}</span>
                        </div>
                        <div class="col-md-2 form-group">
                            <label for="state">State</label>
                            <input type="text" class="form-control" :class="[{ 'is-invalid': errorFor('customer.state') }]"
                                name="state" v-model="customer.state" :disabled="paymentProcessing">
                            <span class="form-error">{{ errorFor('customer.state') }}</span>
                        </div>
                        <div class="col-md-2 form-group">
                            <label for="zip_code">Zip</label>
                            <input type="text" class="form-control"
                                :class="[{ 'is-invalid': errorFor('customer.zip_code') }]" name="zip_code"
                                v-model="customer.zip_code" :disabled="paymentProcessing">
                            <span class="form-error">{{ errorFor('customer.zip_code') }}</span>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-12 form-group">
                            <label for="card-element">Credit Card Info</label>
                            <div id="card-element"></div>
                        </div>
                    </div>

                    <div class="text-center">
                        <buttton class="btn btn-md btn-primary ps-5 pe-5 mt-3" @click="processPayment"
                            :disabled="paymentProcessing">
                            {{ paymentProcessing ? 'Processing' : 'Pay Now' }}
                        </buttton>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { loadStripe } from '@stripe/stripe-js';
export default {
    data() {
        return {
            stripe: {},
            cardElement: {},
            customer: {
                first_name: '',
                last_name: '',
                email: '',
                address: '',
                city: '',
                state: '',
                zip_code: ''
            },
            paymentProcessing: false,
            errors: null
        }
    },
    async mounted() {
        this.stripe = await loadStripe("put_your_publish_key");
        const elements = this.stripe.elements();
        this.cardElement = elements.create('card', {
            classes: {
                base: 'form-control'
            }
        });

        this.cardElement.mount('#card-element');
    },
    methods: {
        cartLineTotal(item) {
            let amount = item.price * item.quantity;
            amount = (amount / 100);
            return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
        },
        async processPayment() {
            this.paymentProcessing = true;

            const { paymentMethod, error } = await this.stripe.createPaymentMethod(
                'card', this.cardElement, {
                billing_details: {
                    name: this.customer.first_name + ' ' + this.customer.last_name,
                    email: this.customer.email,
                    address: {
                        line1: this.customer.address,
                        city: this.customer.city,
                        state: this.customer.state,
                        postal_code: this.customer.zip_code
                    }
                }
            }
            );

            if (error) {
                this.paymentProcessing = false;
                console.error(error);
            } else {
                console.log(paymentMethod);
                this.customer.payment_method_id = paymentMethod.id;
                this.customer.amount = this.$store.state.cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
                this.customer.cart = JSON.stringify(this.$store.state.cart);

                axios.post('/api/purchase', this.customer)
                    .then((response) => {
                        this.paymentProcessing = false;
                        console.log(response);

                        this.$store.commit('setOrder', response.data);
                        this.$store.dispatch('clearCart');

                        this.$router.push({ name: 'order.summary' });
                    })
                    .catch((error) => {
                        this.paymentProcessing = false;
                        console.error(error);
                    });
            }
        },
        errorFor(field) {
            return this.errors != null && this.errors[field] ? this.errors[field][0] : null;
        }
    },
    computed: {
        cart() {
            return this.$store.state.cart;
        },
        cartQuantity() {
            return this.$store.state.cart.reduce((acc, item) => acc + item.quantity, 0);
        },
        cartTotal() {
            let amount = this.$store.state.cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
            amount = (amount / 100);
            return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
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