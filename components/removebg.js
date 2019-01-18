Vue.component('remove-background', {
    template : `
    <div class="mt-4 d-flex flex-column align-items-center ">
        <h3> Image Background Remover </h3>
        <div class="card">
            <div class="card-body">
                <div class="input-group mb-3">
                    <div class="custom-file">
                        <b-form-file v-model="image" :state="Boolean(image)" style="" placeholder="Choose a file..."></b-form-file>
                        <label class="custom-file-label" for="inputGroupFile01">Choose file</label>
                    </div>
                </div>    
                <div>
                    <button @click.prevent="upload" type="submit" class="btn-primary">Upload</button>
                </div>
                <div v-if="loading" class="d-flex justify-content-center mt-4">
                    <div class="lds-dual-ring"></div>
                </div>
                <div class="form-group"  v-if="result_image">
                    <label> Result : </label> 
                    <div>
                        <img :src="result_image" style="max-width: 700px;">
                        <a clas="btn-primary" target="_blank" download :href="result_image">
                            Download Image
                        </a>
                        <iframe :src="share_link"></iframe>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    `,
    data () {
        return { 
            loading : false,
            image: '',
            result_image : '',
            share_link : ''
        }
    },
    methods: {
        upload(){
            this.loading = true;
            this.result_image = ''
            const formData = new FormData()
            formData.append('file', this.image)
            axios.post('http://localhost:3000/images', formData)
            .then(({data}) => {
                this.loading = false
                console.log(data,"===========")
                this.result_image = data.image.image.result_image_url
                this.share_link = `https://www.facebook.com/plugins/share_button.php?href=${data.image.image.result_image_url}&layout=button_count&size=large&mobile_iframe=true&width=97&height=28&appId" width="97" height="28" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true" allow="encrypted-media`
                console.log(data.image.image.result_image_url,"gambar output")
            })
            .catch(err => {
                this.loading = false
                swal("Oops! Something wrong!", `${err}`, "error");
                console.log(err)
            })
        }
    },
})