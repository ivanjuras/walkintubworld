Vue.config.devtools = true
Vue.use(VueMask.VueMaskPlugin)

var vm = new Vue({
  el: "#main-form",

  data: function () {
    return {
      endPointURL:
        "https://hook.integromat.com/81eb1lajvi88gb2fymruu7eu435wetrm", // Change your endpoint URL here
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
          gallonFinalAnswer: "",
          patternGallonNumber: /[0-9]{2,3}/,
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
          question: "Do you need a bariatric model in your home?",
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
          patternMeasures: /[0-9]{2,3}/,
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
          bathtubShowerPhoto: {
            url: "./assets/media/empty-photo-image.png",
            retakeVisible: false,
          },
          bathroomDoorFramePhoto: {
            url: "./assets/media/empty-photo-image.png",
            retakeVisible: false,
          },
          waterHeaterPhoto: {
            url: "./assets/media/empty-photo-image.png",
            retakeVisible: false,
          },
        },

        // ----- Step 13
        {
          question: "Almost done!",
          firstName: "",
          lastName: "",
          streetAddress: "",
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
      if (
        this.formStepData[this.formStep].patternGallonNumber.test(
          this.formStepData[this.formStep].gallonNumber
        ) ||
        this.formStepData[this.formStep].patternGallonDontKnow.test(
          this.formStepData[this.formStep].gallonDontKnow
        )
      ) {
        if (this.formStepData[this.formStep].gallonNumber) {
          this.formStepData[
            this.formStep
          ].gallonFinalAnswer = this.formStepData[this.formStep].gallonNumber
        } else {
          this.formStepData[this.formStep].gallonDontKnow = "I don't know"
          this.formStepData[
            this.formStep
          ].gallonFinalAnswer = this.formStepData[this.formStep].gallonDontKnow
        }

        this.showError = false
        this.formStep++
      } else {
        this.showError = true
      }
    },

    fireStep10: function () {
      if (
        this.formStepData[this.formStep].patternMeasures.test(
          this.formStepData[this.formStep].bathroomDoorFrameWidth
        ) &&
        this.formStepData[this.formStep].patternMeasures.test(
          this.formStepData[this.formStep].bathtubShowerLength
        ) &&
        this.formStepData[this.formStep].patternMeasures.test(
          this.formStepData[this.formStep].bathtubShowerWidth
        )
      ) {
        this.showError = false
        this.formStep++
      } else {
        this.showError = true
      }
    },

    fireStep12: function () {
      if (
        this.formStepData[12].bathtubShowerPhoto.url.includes("appspot") &&
        this.formStepData[12].bathroomDoorFramePhoto.url.includes("appspot") &&
        this.formStepData[12].waterHeaterPhoto.url.includes("appspot")
      ) {
        this.formStep++
        this.showError = false
      } else {
        this.showError = true
      }
    },

    fireStep13: function () {
      if (
        this.formStepData[this.formStep].pattern.test(
          this.formStepData[this.formStep].firstName
        ) &&
        this.formStepData[this.formStep].pattern.test(
          this.formStepData[this.formStep].lastName
        ) &&
        this.formStepData[this.formStep].pattern.test(
          this.formStepData[this.formStep].streetAddress
        )
      ) {
        console.log(this.formStepData[this.formStep].streetAddress)

        this.formStep++
        this.showError = false
        this.buttonText = "Get Quote"
        this.showArrow = false
        this.showConfirmation = true
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
          zipCode: this.stateZipCode,
          propertyOwned: this.formStepData[1].value,
          bathroomLocation: this.formStepData[2].value,
          doorsRequired: this.formStepData[3].value,
          faucetsLocation: this.formStepData[4].value,
          features: this.formStepData[5].featuresText,
          waterHeaterType: this.formStepData[6].value,
          gallonCapacity: this.formStepData[7].gallonFinalAnswer,
          wheelChairUse: this.formStepData[8].value,
          bariatricModelNeeded: this.formStepData[9].value,
          bathroomDoorFrameWidth: this.formStepData[10].bathroomDoorFrameWidth,
          bathtubShowerLength: this.formStepData[10].bathtubShowerLength,
          bathtubShowerWidth: this.formStepData[10].bathtubShowerWidth,
          paymentMethod: this.formStepData[11].value,
          bathtubShowerPhoto: this.formStepData[12].bathtubShowerPhoto.url,
          bathroomDoorFramePhoto: this.formStepData[12].bathroomDoorFramePhoto
            .url,
          waterHeaterPhoto: this.formStepData[12].bathroomDoorFramePhoto.url,
          firstName: this.formStepData[13].firstName,
          lastName: this.formStepData[13].lastName,
          streetAddress: this.formStepData[13].streetAddress,
          city: this.city,
          state: this.stateAbbreviation,
          phoneNumber: this.formStepData[14].phoneNumber,
          emailAddress: this.formStepData[14].emailAddress,
        }

        sessionStorage.setItem("finalObject", JSON.stringify(this.finalObject))

        axios({
          method: "post",
          url: this.endPointURL,
          data: this.finalObject,
        })
          .then(function (response) {
            window.location.href = "thankyou"
          })
          .catch(function (error) {
            console.log(error)
          })
      } else {
        this.showError = true
      }
    },

    standardStepFire: function () {
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

    bathtubShowerTakePhoto: function (event) {
      var bathTubShowerInputFile = document.getElementById(
        "bathtub-shower-take"
      )

      bathTubShowerInputFile.click()

      bathTubShowerInputFile.addEventListener(
        "change",
        function () {
          var image = this.files[0]
          var imageName = image.name

          var imageStorageRef = firebase.storage().ref("images/" + imageName)
          var uploadImageTask = imageStorageRef.put(image)

          uploadImageTask.on(
            "state_changed",
            function (snapshot) {
              var progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            },
            function (error) {
              console.log(error)
            },
            function () {
              uploadImageTask.snapshot.ref
                .getDownloadURL()
                .then(function (downloadURL) {
                  vm.formStepData[12].bathtubShowerPhoto.url = downloadURL
                  vm.formStepData[12].bathtubShowerPhoto.retakeVisible = true
                })
            }
          )
        },
        false
      )
    },

    bathroomDoorFrameTakePhoto: function (event) {
      var bathroomDoorFrameInputFile = document.getElementById(
        "bathroom-door-frame-take"
      )

      bathroomDoorFrameInputFile.click()

      bathroomDoorFrameInputFile.addEventListener(
        "change",
        function () {
          var image = this.files[0]
          var imageName = image.name

          var imageStorageRef = firebase.storage().ref("images/" + imageName)
          var uploadImageTask = imageStorageRef.put(image)

          uploadImageTask.on(
            "state_changed",
            function (snapshot) {
              var progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            },
            function (error) {
              console.log(error)
            },
            function () {
              uploadImageTask.snapshot.ref
                .getDownloadURL()
                .then(function (downloadURL) {
                  vm.formStepData[12].bathroomDoorFramePhoto.url = downloadURL
                  vm.formStepData[12].bathroomDoorFramePhoto.retakeVisible = true
                })
            }
          )
        },
        false
      )
    },

    waterHeaterTakePhoto: function (event) {
      var waterHeaterInputFile = document.getElementById("water-heater-photo")

      waterHeaterInputFile.click()

      waterHeaterInputFile.addEventListener(
        "change",
        function () {
          var image = this.files[0]
          var imageName = image.name

          var imageStorageRef = firebase.storage().ref("images/" + imageName)
          var uploadImageTask = imageStorageRef.put(image)

          uploadImageTask.on(
            "state_changed",
            function (snapshot) {
              var progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            },
            function (error) {
              console.log(error)
            },
            function () {
              uploadImageTask.snapshot.ref
                .getDownloadURL()
                .then(function (downloadURL) {
                  vm.formStepData[12].waterHeaterPhoto.url = downloadURL
                  vm.formStepData[12].waterHeaterPhoto.retakeVisible = true
                })
            }
          )
        },
        false
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
