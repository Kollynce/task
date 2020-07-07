/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component('example-component', require('./components/ExampleComponent.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    data: {
        hasError: true,
        newItem: { 'name': '','quantity': '','price': '','total': '' },
        items: []
    },
    mounted: function mounted() {
        this.getVueItems();
    },
    methods: {
        updateQuantity(event) {
            this.newItem.quantity = event.target.value
            this.newItem.total = this.newItem.quantity * this.newItem.price
        },
        updatePrice(event) {
            this.newItem.price = event.target.value
            this.newItem.total = this.newItem.quantity * this.newItem.price
        },
        getVueItems: function getVueItems() {
            let _this = this;

            axios.get('/vueitems').then(function (response) {
                _this.items = response.data;
            });
        },
        createItem: function createItem() {
            let input = this.newItem;
            let _this = this;
            if (input['name'] === '' || input['quantity'] === '' || input['price'] === '' ) {
                this.hasError = false;
            } else {
                this.hasError = true;
                axios.post('/vueitems', input).then(function (response) {
                    _this.newItem = { 'name': '','quantity': '','price': '','total': ''};
                    _this.getVueItems();
                });
            }
        }
    }
});
