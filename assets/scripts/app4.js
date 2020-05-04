Vue.config.devtools = true
Vue.use(VueMask.VueMaskPlugin)

var vm = new Vue({
  el: "#review-form",

  data: function () {
    return {
      endPointURL:
        "https://hook.integromat.com/c4iwda0n617ovsch80x2lnwuydcwu558",
      reviewObject: {},
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
