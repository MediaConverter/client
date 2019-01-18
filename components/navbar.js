export default  {
    template : `
        <b-navbar toggleable="md" type="dark" variant="info">
            <div class="container" style="max-width: 700px;">
                <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
                <b-collapse is-nav class="d-flex justify-content-center" id="nav_collapse">
                    <b-navbar-nav >
                        <b-nav-item @click="toBackground('homepage')" href="#">Yutub to Mp3</b-nav-item>
                        <b-nav-item @click="toBackground('background')" href="#">Apus Background</b-nav-item>
                    </b-navbar-nav>
                </b-collapse>
            </div> 
        </b-navbar>  
    `,
    methods: {
        toBackground (route){
            this.$emit('change-route', route)
        }
    },
}
