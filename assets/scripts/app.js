Vue.use(VueMask.VueMaskPlugin)

var vm = new Vue({
  el: "#main-form",

  data: function () {
    return {
      endPointURL:
        "https://hook.integromat.com/2fhtb23qdi1cci7qq6p5kxd24u1215d3", // Change your endpoint URL here
      buttonText: "Next",
      showButton: true,
      formStep: 0,
      showError: false,
      showConfirmation: false,
      showArrow: true,
      city: "",
      stateAbbreviation: "",
      stateZipCode: "",
      finalObject: {},
      formStepData: [
        // ----- Step 0
        {
          question: "Where do you need your walk-in tub installed?",
          value: null,
          pattern: /(^\d{5}$)|(^\d{5}-\d{4}$)/,
        },

        // Step 1
        {
          question: "What type of property do you own?",
          value: "",
          pattern: /[a-z0-9]/,
        },

        // Step 2
        {
          question: "Where is your bathroom located?",
          value: "",
          pattern: /[a-z0-9]/,
        },

        // Step 3
        {
          question:
            "How many doors will the installers need to pass through to reach your bathing area?",
          value: "",
          pattern: /[a-z0-9]/,
        },

        // Step 4
        {
          question: "Where are the faucets in your bathtub/shower?",
          value: "",
          pattern: /[a-z0-9]/,
        },

        // ----- Step 5
        {
          question: "What features do you need?",
          subQuestion: "(check all that apply)",
          features: [],
          featuresText: "",
          pattern: /[a-z0-9]/,
        },

        // Step 6
        {
          question: "What kind of water heater do you have?",
          value: "",
          pattern: /[a-z0-9]/,
        },

        // ------- Step 7
        {
          question: "What is the gallon capacity of your water heater?",
          gallonNumber: "",
          gallonDontKnow: "",
          patternGallonNumber: /[0-9]{3}/,
          patternGallonDontKnow: /[a-z0-9]/,
        },

        // Step 8
        {
          question: "Do you use a wheelchair in your home?",
          value: "",
          pattern: /[a-z0-9]/,
        },

        // Step 9
        {
          question: "Do you need a bariatric model?",
          subQuestion: "(designed for buyers over 300 lbs)",
          value: "",
          pattern: /[a-z0-9]/,
        },

        // ----- Step 10
        {
          question: "Time for 3 measurements!",
          subQuestion: "(enter in inches please)",
          bathroomDoorFrameWidth: "",
          bathtubShowerLength: "",
          bathtubShowerWidth: "",
          patternMeasures: /[0-9]{3}/,
        },

        // Step 11
        {
          question:
            "If you accept our quote, how would you pay for your walk-in tub?",
          value: "",
          pattern: /[a-z0-9]/,
        },

        // ----- Step 12
        {
          question: "Time to post 3 photos!",
          subQuestion: "(wide angle shots please)",
          bathtubPhotoURL: "",
          bathroomDoorFramePhotoURL: "",
          waterHeaterPhotoURL: "",
        },

        // ----- Step 13
        {
          question: "Almost done!",
          firstName: "",
          lastName: "",
          pattern: /[a-z0-9]/,
        },

        // ----- Step 14
        {
          question: "Last step!",
          phoneNumber: "",
          emailAddress: "",
          patternPhone: /^1?\s?(\([0-9]{3}\)[- ]?|[0-9]{3}[- ]?)[0-9]{3}[- ]?[0-9]{4}$/,
          patternEmail: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        },
      ],
    }
  },

  methods: {
    increaseFormStep: function () {
      console.log(this.formStep)

      switch (this.formStep) {
        case 0:
          this.fireStep0()
          this.scrollToTop()
          break

        case 5:
          this.fireStep5()
          this.scrollToTop()
          break

        case 7:
          this.fireStep7()
          this.scrollToTop()
          break

        case 10:
          this.fireStep10()
          this.scrollToTop()
          break

        case 12:
          this.fireStep12()
          this.scrollToTop()
          break

        case 13:
          this.fireStep13()
          this.scrollToTop()
          break

        case 14:
          this.fireStep14()
          this.scrollToTop()
          break

        default:
          this.standardStepFire()
          this.scrollToTop()
          break
      }
    },

    fireStep0: function () {
      if (
        this.formStepData[this.formStep].pattern.test(
          this.formStepData[this.formStep].value
        )
      ) {
        axios
          .get(
            "https://maps.googleapis.com/maps/api/geocode/json?address=" +
              this.formStepData[0].value +
              "&key=AIzaSyB-tH8jD9dvfm8RaijJmjKt2K5XuEJkUcA"
          )
          .then(function (response) {
            console.log(response.data)
            var responseArray = response.data.results[0].address_components
            responseArray.map(function (item) {
              var types = item.types

              types.map(function (type) {
                if (type === "locality") {
                  vm.city = item.short_name
                } else if (type === "neighborhood") {
                  vm.city = item.short_name
                } else if (type === "administrative_area_level_1") {
                  vm.stateAbbreviation = item.short_name
                }
              })
            })

            vm.stateZipCode = vm.formStepData[0].value
            vm.formStep++
            vm.showError = false
          })
          .catch(function (error) {
            vm.showError = true
            console.log(error)
          })
      } else {
        this.showError = true
      }
    },

    fireStep5: function () {
      if (this.formStepData[this.formStep].features.length === 0) {
        this.showError = true
      } else {
        this.resetError()
        this.standardStepFire()
      }
    },

    fireStep7: function () {
      console.log(this.formStepData[7].gallonNumber)
      console.log(this.formStepData[7].gallonUnknown)
    },

    fireStep10: function () {
      this.standardStepFire()
    },

    fireStep12: function () {
      this.standardStepFire()
    },

    fireStep13: function () {
      if (
        this.formStepData[this.formStep].pattern.test(
          this.formStepData[this.formStep].firstName
        ) &&
        this.formStepData[this.formStep].pattern.test(
          this.formStepData[this.formStep].lastName
        )
      ) {
        this.formStep++
        this.showError = false
      } else {
        this.showError = true
      }
    },

    fireStep14: function () {
      if (
        this.formStepData[this.formStep].patternPhone.test(
          this.formStepData[this.formStep].phoneNumber
        ) &&
        this.formStepData[this.formStep].patternEmail.test(
          this.formStepData[this.formStep].emailAddress
        )
      ) {
        this.finalObject = {
          firstName: this.formStepData[5].firstName,
          lastName: this.formStepData[5].lastName,
          phoneNumber: this.formStepData[6].phoneNumber,
          emailAddress: this.formStepData[6].emailAddress,
          projectAddress: this.formStepData[4].value,
          city: this.city,
          zipCode: this.stateZipCode,
          state: this.stateAbbreviation,
          numWindowsInstalled: this.formStepData[1].value,
          howSoon: this.formStepData[2].value,
          financing: this.formStepData[3].value,
        }

        axios({
          method: "post",
          url: this.endPointURL,
          data: this.finalObject,
        })
          .then(function (response) {
            console.log(response)
          })
          .catch(function (error) {
            console.log(error)
          })

        this.formStep++
        this.showError = false
      } else {
        this.showError = true
      }
    },

    standardStepFire: function () {
      console.log(this.formStepData[this.formStep].value)

      if (
        this.formStepData[this.formStep].pattern.test(
          this.formStepData[this.formStep].value
        )
      ) {
        this.formStep++
        this.showError = false
      } else {
        this.showError = true
      }
    },

    resetError: function () {
      this.showError = false
    },

    onSelectRadio: function (event) {
      this.formStepData[this.formStep].value = event.target.value
      this.resetError()
      this.increaseFormStep()
    },

    onSelectCheckbox: function (event) {
      this.resetError()

      this.formStepData[5].featuresText = this.formStepData[5].features.join(
        ", "
      )
    },

    scrollToTop: function () {
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      })
    },
  },
})
