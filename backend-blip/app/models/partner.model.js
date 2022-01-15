module.exports = (mongoose) => {
  const partnerSchema = mongoose.Schema(
    {
      partnerName: {
        type: String,
        required: [true, "Partner Name is Required."],
        validate: {
          validator: (partnerName) => {
            return (
              !!partnerName &&
              partnerName.length >= 5 &&
              partnerName.length <= 10
            );
          },
          message: "Invalid Partnername.",
        },
      },
      email: {
        type: String,
        required: [true, "Email is Required."],
        validate: {
          validator: (email) => {
            var re = new RegExp(
              /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            );
            return re.test(email);
          },
          message: "Invalid Email.",
        },
      },
      phone: {
        type: String,
        required: [true, "Phone Number is Required."],
        validate: {
          validator: (phone) => {
            if (phone) {
              var re = new RegExp(/^[0-9]{10}$/);
              return re.test(phone);
            } else {
              return true;
            }
          },
          message: "Invalid Phone Number.",
        },
      },
      type: {
        type: String,
        enum: {
          values: ["Donation Center", "Hospital"],
          message: "{VALUE} is not supported",
        },
      },
      address: {
        houseno: {
          type: String,
          required: [true, "House No is Required."],
          validate: {
            validator: (houseno) => {
              return !!houseno && houseno.length <= 10;
            },
            message: "Invalid Area And Street.",
          },
        },
        area_and_street: {
          type: String,
          required: [true, "Area And Street is Required."],
          validate: {
            validator: (area_and_street) => {
              return (
                !!area_and_street &&
                area_and_street.length >= 10 &&
                area_and_street.length <= 100
              );
            },
            message: "Invalid Area And Street.",
          },
        },
        landmark: {
          type: String,
          validate: {
            validator: (landmark) => {
              if (!!landmark) {
                return landmark.length <= 50;
              } else {
                return true;
              }
            },
            message: "Invalid Last Name.",
          },
        },
        country: {
          type: String,
          required: [true, "Country is Required."],
        },
        state: {
          type: String,
          required: [true, "State is Required."],
        },
        pincode: {
          type: String,
          required: [true, "Pincode is Required."],
          validate: {
            validator: (pincode) => {
              if (pincode) {
                var re = new RegExp(/^[0-9]{6}$/);
                return re.test(pincode);
              } else {
                return true;
              }
            },
            message: "Invalid Pincode.",
          },
        },
        city_town_district: {
          type: String,
          required: [true, "City/Town/District is Required."],
        },
      },
      password: {
        type: String,
        required: [true, "Password is Required."],
      },
    },
    { timestamps: true }
  );

  const partner = mongoose.model("partners", partnerSchema);
  return partner;
};
