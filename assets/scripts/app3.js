Vue.config.devtools = true;
Vue.use(VueMask.VueMaskPlugin);

var vm = new Vue({
  el: "#warranty-registration-form",

  data: function () {
    return {
      endPointURL:
        "https://hook.integromat.com/m6mv0ahzp2m1dl9slkh7i13o4wu1q7wd",
      financeObject: {},

      warrantyFirstName: "",
      warrantyLastName: "",
      warrantyEmail: "",
      warrantyPhone: "",
      warrantyInstallationDate: "",
      warrantySerialNumber: "",
    };
  },

  methods: {
    sendWarrantyInfo: function () {
      this.financeObject = {
        warrantyFirstName: this.warrantyFirstName,
        warrantyLastName: this.warrantyLastName,
        warrantyEmail: this.warrantyEmail,
        warrantyPhone: this.warrantyPhone,
        warrantyInstallationDate: this.warrantyInstallationDate,
        warrantySerialNumber: this.warrantySerialNumber,
      };

      axios({
        method: "post",
        url: this.endPointURL,
        data: this.financeObject,
      })
        .then(function (response) {
          window.location.href = "thankyou";
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
});
