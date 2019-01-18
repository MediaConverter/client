Vue.component('youtube-search', {
  template: `
    <div class="mt-4 d-flex flex-column align-items-center ">
      <form @submit.prevent="searchYt">
        <input type="text" name="search" placeholder="Search On Yt" v-model="keyword">
        <button type="submit" class="btn btn-dark">Search Youtube</button>
      </form>
      <br>
      <form @submit.prevent="getGif">
        <input type="text" name="search" placeholder="Search GIF" v-model="gifname">
        <button type="submit" class="btn btn-dark">Search GIF</button>
      </form>

      <div class="container">
        <img :src="gifname">
      </div>

      <div class="container">
        <div class="row my-5" v-for="vid in videoList">
          <div class="col-6">
            <iframe width="420" height="315"
              :src="vid.id.link">
            </iframe>
          </div>
          <div class="col-6 my-2">
            <p>{{ vid.snippet.description }}</p>
            <button @click="convertMp3(vid.id.videoId)">MP3</button>
            <button @click="convertGif(vid.id.videoId)">GIF</button><br><br>
            <div v-if="mp3 === vid.id.videoId">
              <iframe width="300px" height="50px" scrolling="no" style="border:none;" :src="vid.id.buatmp3"></iframe>
            </div>
            <div v-if="gif === vid.id.videoId">
              <b-form-group id="urlGroup" horizontal :label-cols="4" breakpoint="md" label="Url"
                label-for="url">
                <b-form-input id="url" v-model='vid.id.buatAnhar'></b-form-input>
              </b-form-group>
              <b-form-group id="cutStartGroup" horizontal :label-cols="4" breakpoint="md" description="start from ... (in second)" label="Start"
                label-for="cutStart">
                <b-form-input id="cutStart" v-model="cut.start"></b-form-input>
              </b-form-group>
              <b-form-group id="cutDurationGroup" horizontal :label-cols="4" breakpoint="md" label="Duration" label-for="cutDuration">
                <b-form-input id="cutDuration" v-model="cut.duration"></b-form-input>
              </b-form-group>
              <b-form-group id="captionGroup" horizontal :label-cols="4" breakpoint="md" label="Caption" label-for="caption">
                <b-form-input id="caption" v-model="text"></b-form-input>
              </b-form-group>
              <button @click.prevent="convertToGif(vid.id.videoId, vid.id.buatAnhar)"> Convert to GIF </button>
            </div>
            <div v-if="resultgif === vid.id.videoId ">
              <p> Converting to gif, it will take about a minute to convert </p>
              <p> Search this gifname later</p>
              <br>
              <h4>Gif name: {{resultgifname}} </h4>
            </div>
          </div>
        </div>
      </div>

    </div>
  `,
  data () {
    return {
      url_local: 'http://localhost:3000',
      keyword: '',
      videoList: [],
      mp3: '',
      gif: '',
      resultgif: '',
      resultgifname: '',

      // url: '',
      fetchUrl: '',
      cut: {
        start: 0,
        duration: 3
      },
      startSeconds: 0,
      text: '',
      gifname: ''
    }
  },
  methods: {
    searchYt: async function () {
      try {
        this.gifname = ''
        const { data } = await axios.get(`http://localhost:3000/youtube?search=${this.keyword}`)
        console.log(data)
        data.items.forEach((vid, i) => {
          if (vid.id.videoId) {
            vid.id.link = `https://www.youtube.com/embed/${vid.id.videoId}`
            vid.id.buatAnhar = `https://www.youtube.com/watch?v=${vid.id.videoId}`
            vid.id.buatmp3 = `https://www.download-mp3-youtube.com/api/?api_key=Mzg4OTEyMzc4&format=mp3&video_id=${vid.id.videoId}&button_color=11512f&text_color=dddddd`
          } else {
            data.items.splice(i, 1)
          }
        });
        console.log(data.items)
        this.videoList = data.items
      } catch ({response}) {
        console.error(response.data)
      }
    },
    convertMp3: function (id) {
      this.mp3 = id
      this.gif = ''
      this.resultgif = ''
    },
    convertGif: function(id){
      this.mp3 = ''
      this.gif = id
      this.resultgif = ''
    },
    convertToGif(id, url) {
      axios({
        url: this.url_local + '/gif',
        method: "post",
        data: {
          "fetchUrl": url,
          "noMd5": "true",
          "cut": {
            "start": this.cut.start,
            "duration": this.cut.duration
          },
          "captions": [
            {
              "startSeconds": this.startSeconds,
              "text": this.text
            }
          ]
        }
      })
        .then(({ data }) => {
          console.log(data)
          this.resultgifname = data.gfyname
          this.resultgif = id
          this.mp3 = ''
          this.gif = ''
        })
        .catch(error => {
          console.log(error.response)
        })
    },
    getGif() {
      axios({
        method: "GET",
        url: this.url_local + `/gif/${this.gifname}`
      })
        .then(({ data }) => {
          console.log(data.gifUrl)
          this.gifname = data.gifUrl
        })
        .catch(error => {
          console.log(error.response)
        })
    }
  }
})
