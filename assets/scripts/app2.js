Vue.config.devtools = true
Vue.use(VueMask.VueMaskPlugin)

var vm = new Vue({
  el: "#finance-form",

  data: function () {
    return {
      endPointURL:
        "https://hook.integromat.com/1gbrqhqicya3af45sjiyxc3qvffb0961",
      viewportWidth: window.innerWidth,
      showCoApplicant: false,
      financeObject: {},

      applicantFirstName: "",
      applicantLastName: "",
      applicantPhoneNumber: "",
      applicantEmailAddress: "",
      applicantStreetAddress: "",
      applicantCity: "",
      applicantState: "",
      applicantZipCode: "",
      applicantBirthDate: "",
      applicantSSNumber: "",
      applicantGrossMonthlyIncome: "",

      coApplicantFirstName: "",
      coApplicantLastName: "",
      coApplicantStreetAddress: "",
      coApplicantCity: "",
      coApplicantState: "",
      coApplicantZipCode: "",
      coApplicantBirthDate: "",
      coApplicantSSNumber: "",
      coApplicantGrossMonthlyIncome: "",
    }
  },

  mounted: function () {
    var finalObject = JSON.parse(sessionStorage.getItem("finalObject"))
    console.log(finalObject)

    this.applicantFirstName = finalObject.firstName
    this.applicantLastName = finalObject.lastName
    this.applicantPhoneNumber = finalObject.phoneNumber
    this.applicantEmailAddress = finalObject.emailAddress
    this.applicantStreetAddress = finalObject.streetAddress
    this.applicantCity = finalObject.city
    this.applicantState = finalObject.state
    this.applicantZipCode = finalObject.zipCode
  },

  methods: {
    sendFinanceInfo: function () {
      this.financeObject = {
        applicantFirstName: this.applicantFirstName,
        applicantLastName: this.applicantLastName,
        applicantStreetAddress: this.applicantStreetAddress,
        applicantCity: this.applicantCity,
        applicantState: this.applicantState,
        applicantZipCode: this.applicantZipCode,
        applicantBirthDate: this.applicantBirthDate,
        applicantSSNumber: this.applicantSSNumber,
        applicantGrossMonthlyIncome: this.applicantGrossMonthlyIncome,

        coApplicantFirstName: this.coApplicantFirstName,
        coApplicantLastName: this.coApplicantLastName,
        coApplicantStreetAddress: this.coApplicantStreetAddress,
        coApplicantCity: this.coApplicantCity,
        coApplicantState: this.coApplicantState,
        coApplicantZipCode: this.coApplicantZipCode,
        coApplicantBirthDate: this.coApplicantBirthDate,
        coApplicantSSNumber: this.coApplicantSSNumber,
        coApplicantGrossMonthlyIncome: this.coApplicantGrossMonthlyIncome,
      }

      axios({
        method: "post",
        url: this.endPointURL,
        data: this.financeObject,
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
