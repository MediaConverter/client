Vue.component('gif', {
  template: `
  <div>
    <b-form-group id="cutStartGroup" horizontal :label-cols="4" breakpoint="md" description="start from ... (in second)" label="Start"
      label-for="cutStart">
      <b-form-input id="cutStart"></b-form-input>
    </b-form-group>
    <b-form-group id="cutDurationGroup" horizontal :label-cols="4" breakpoint="md" label="Duration" label-for="cutDuration">
      <b-form-input id="cutDuration"></b-form-input>
    </b-form-group>
    <b-form-group id="captionGroup" horizontal :label-cols="4" breakpoint="md" label="Caption" label-for="caption">
      <b-form-input id="caption"></b-form-input>
    </b-form-group>
    <button @click.prevent="convert"> Convert to GIF </button>
  </div>
  `,
  data() {
    return {
      url: 'http://localhost:3000',
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
    convertToGif() {
      axios({
        method: "POST",
        url: this.url + '/gif',
        data: {
          "fetchUrl": this.fetchUrl,
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
        })
        .catch(error => {
          console.log(error.response)
        })
    },
    getGif() {
      axios({
        method: "GET",
        url: this.url + `/gif/${gifname}`
      })
        .then(({ data }) => {
          console.log(data)
        })
        .catch(error => {
          console.log(error.response)
        })
    }
  }
})