import navbar from './navbar.js'
import logo from './logo.js'

var app = new Vue({
    el: '#app',
    components: {
        'product-name' : logo,
        'navbar' : navbar
    },
    data: {
        route : 'homepage'
    },
    methods: {
        changeRoute(payload){
            this.route = payload
        }
    },
})