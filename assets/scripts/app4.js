Vue.config.devtools = true
Vue.use(VueMask.VueMaskPlugin)
Vue.component("star-rating", VueStarRating.default)

var vm = new Vue({
  el: "#review-form",

  data: function () {
    return {
      endPointURL:
        "https://hook.integromat.com/c4iwda0n617ovsch80x2lnwuydcwu558",
      reviewObject: {},
      reviewerRating: 5,
      reviewerFirstName: "",
      reviewerLastName: "",
      reviewerPhone: "",
      reviewerEmail: "",
      reviewerReview: "",
    }
  },

  methods: {
    sendReviewInfo: function () {
      this.reviewObject = {
        reviewerRating: this.reviewerRating,
        reviewerFirstName: this.reviewerFirstName,
        reviewerLastName: this.reviewerLastName,
        reviewerPhone: this.reviewerPhone,
        reviewerEmail: this.reviewerEmail,
        reviewerReview: this.reviewerReview,
      }

      console.log(this.reviewObject)

      axios({
        method: "post",
        url: this.endPointURL,
        data: this.reviewObject,
      })
        .then(function (response) {
          window.location.href = "thankyou"
        })
        .catch(function (error) {
          console.log(error)
        })
    },
  },
})
