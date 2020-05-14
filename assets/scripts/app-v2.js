Vue.config.devtools = true
Vue.use(VueMask.VueMaskPlugin)

var options = {
  defaultTrigger: "click",
}
Vue.use(VTooltip, options)

var vm = new Vue({
  el: "#main-form",

  data: function () {
    return {
      endPointURL:
        "https://hook.integromat.com/gt4oteoha41z8aqnv57dj0f1rl2qgz9w", // Change your endpoint URL here
      buttonText: "Next",
      showButton: true,
      showSpinner1: false,
      showSpinner2: false,
      showSpinner3: false,
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

        // ----- Step 1
        {
          question: "What features do you need?",
          subQuestion: "(check all that apply)",
          features: [],
          featuresText: "",
          pattern: /[a-z0-9]/,
        },

        // ----- Step 2
        {
          question: "Time for 3 measurements!",
          subQuestion: "(enter in inches please)",
          bathroomDoorFrameWidth: "",
          bathtubShowerLength: "",
          bathtubShowerWidth: "",
          patternMeasures: /[0-9]{2,3}/,
        },

        // ----- Step 3
        {
          question: "Time to post 3 photos!",
          subQuestion: "(wide angle shots please)",
          bathtubShowerPhoto: {
            url: "../assets/media/empty-photo-image.png",
            retakeVisible: false,
          },
          bathroomDoorFramePhoto: {
            url: "../assets/media/empty-photo-image.png",
            retakeVisible: false,
          },
          waterHeaterPhoto: {
            url: "../assets/media/empty-photo-image.png",
            retakeVisible: false,
          },
        },

        // ----- Step 4
        {
          question: "Almost done!",
          firstName: "",
          lastName: "",
          streetAddress: "",
          pattern: /[a-z0-9]/,
        },

        // ----- Step 5
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

        case 1:
          this.fireStep1()
          this.scrollToTop()
          break

        case 2:
          this.fireStep2()
          this.scrollToTop()
          break

        case 3:
          this.fireStep3()
          this.scrollToTop()
          break

        case 4:
          this.fireStep4()
          this.scrollToTop()
          break

        case 5:
          this.fireStep5()
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

    fireStep1: function () {
      if (this.formStepData[this.formStep].features.length === 0) {
        this.showError = true
      } else {
        this.resetError()
        this.standardStepFire()
      }
    },

    fireStep2: function () {
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

    fireStep3: function () {
      if (
        this.formStepData[3].bathtubShowerPhoto.url.includes("appspot") &&
        this.formStepData[3].bathroomDoorFramePhoto.url.includes("appspot") &&
        this.formStepData[3].waterHeaterPhoto.url.includes("appspot")
      ) {
        this.formStep++
        this.showError = false
      } else {
        this.showError = true
      }
    },

    fireStep4: function () {
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

    fireStep5: function () {
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
          features: this.formStepData[1].featuresText,
          bathroomDoorFrameWidth: this.formStepData[2].bathroomDoorFrameWidth,
          bathtubShowerLength: this.formStepData[2].bathtubShowerLength,
          bathtubShowerWidth: this.formStepData[2].bathtubShowerWidth,
          bathtubShowerPhoto: this.formStepData[3].bathtubShowerPhoto.url,
          bathroomDoorFramePhoto: this.formStepData[3].bathroomDoorFramePhoto
            .url,
          waterHeaterPhoto: this.formStepData[3].bathroomDoorFramePhoto.url,
          firstName: this.formStepData[4].firstName,
          lastName: this.formStepData[4].lastName,
          streetAddress: this.formStepData[4].streetAddress,
          city: this.city,
          state: this.stateAbbreviation,
          phoneNumber: this.formStepData[5].phoneNumber,
          emailAddress: this.formStepData[5].emailAddress,
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

    stopInfoClickPropagation: function (e) {
      e.stopPropagation()
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

      this.formStepData[this.formStep].featuresText = this.formStepData[
        this.formStep
      ].features.join(", ")
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
              vm.showSpinner1 = true
            },
            function (error) {
              console.log(error)
            },
            function () {
              uploadImageTask.snapshot.ref
                .getDownloadURL()
                .then(function (downloadURL) {
                  vm.showSpinner1 = false
                  vm.formStepData[3].bathtubShowerPhoto.url = downloadURL
                  vm.formStepData[3].bathtubShowerPhoto.retakeVisible = true
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
              vm.showSpinner2 = true
            },
            function (error) {
              console.log(error)
            },
            function () {
              uploadImageTask.snapshot.ref
                .getDownloadURL()
                .then(function (downloadURL) {
                  vm.showSpinner2 = false
                  vm.formStepData[3].bathroomDoorFramePhoto.url = downloadURL
                  vm.formStepData[3].bathroomDoorFramePhoto.retakeVisible = true
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
              vm.showSpinner3 = true
            },
            function (error) {
              console.log(error)
            },
            function () {
              uploadImageTask.snapshot.ref
                .getDownloadURL()
                .then(function (downloadURL) {
                  vm.showSpinner3 = false
                  vm.formStepData[3].waterHeaterPhoto.url = downloadURL
                  vm.formStepData[3].waterHeaterPhoto.retakeVisible = true
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
