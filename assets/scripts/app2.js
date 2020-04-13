Vue.config.devtools = true
Vue.use(VueMask.VueMaskPlugin)

var vm = new Vue({
  el: "#finance-form",

  data: function () {
    return {
      endPointURL:
        "https://hook.integromat.com/2fhtb23qdi1cci7qq6p5kxd24u1215d3",
      applicantFirstName: "",
      applicantLastName: "",
    }
  },

  mounted: function () {
    var finalObject = JSON.parse(sessionStorage.getItem("finalObject"))
    this.applicantFirstName = finalObject.firstName
    this.applicantLastName = finalObject.lastName

    // this.finalObject = {
    //   zipCode: this.stateZipCode,
    //   propertyOwned: this.formStepData[1].value,
    //   bathroomLocation: this.formStepData[2].value,
    //   doorsRequired: this.formStepData[3].value,
    //   faucetsLocation: this.formStepData[4].value,
    //   features: this.formStepData[5].featuresText,
    //   waterHeaterType: this.formStepData[6].value,
    //   gallonCapacity: this.formStepData[7].gallonFinalAnswer,
    //   wheelChairUse: this.formStepData[8].value,
    //   bariatricModelNeeded: this.formStepData[9].value,
    //   bathroomDoorFrameWidth: this.formStepData[10].bathroomDoorFrameWidth,
    //   bathtubShowerLength: this.formStepData[10].bathtubShowerLength,
    //   bathtubShowerWidth: this.formStepData[10].bathtubShowerWidth,
    //   paymentMethod: this.formStepData[11].value,
    //   bathtubShowerPhoto: this.formStepData[12].bathtubShowerPhoto.url,
    //   bathroomDoorFramePhoto: this.formStepData[12].bathroomDoorFramePhoto
    //     .url,
    //   waterHeaterPhoto: this.formStepData[12].bathroomDoorFramePhoto.url,
    //   lastName: this.formStepData[13].lastName,
    //   streetAddress: this.formStepData[13].streetAddress,
    //   phoneNumber: this.formStepData[14].phoneNumber,
    //   emailAddress: this.formStepData[14].emailAddress,
    // }
  },
})
