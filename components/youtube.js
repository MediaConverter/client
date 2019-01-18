Vue.component('youtube-search', {
  template: `
    <div>
      <form @submit.prevent="searchYt">
        <input type="text" name="search" placeholder="Search On Yt" v-model="keyword">
        <button type="submit" class="btn btn-dark">Dark</button>
      </form>

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
            <button>GIF</button><br><br>
            <div v-if="mp3 === vid.id.videoId">
              <iframe width="300px" height="50px" scrolling="no" style="border:none;" :src="vid.id.buatmp3"></iframe>
            </div>
          </div>
        </div>
      </div>

    </div>
  `,
  data () {
    return {
      keyword: '',
      videoList: [],
      mp3: ''
    }
  },
  methods: {
    searchYt: async function () {
      try {
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
    }
  }
})
