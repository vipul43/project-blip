module.exports = (mongoose) => {
  const partnerSchema = mongoose.Schema(
    {
      partnerName: {
        type: String,
        required: [true, "Partner Name is Required."],
      },
      email: {
        type: String,
        required: [true, "Email is Required."],
      },
      phone: String,
      type: String,
      address: {
        houseno: {
          type: String,
          required: [true, "House No is Required."],
        },
        area_and_street: {
          type: String,
          required: [true, "Area And Street is Required."],
        },
        city_town_district: {
          type: String,
          required: [true, "City/Town/District is Required."],
        },
        state: {
          type: String,
          required: [true, "State is Required."],
        },
        pincode: {
          type: String,
          required: [true, "Pincode is Required."],
        },
        landmark: String,
        country: {
          type: String,
          required: [true, "Country is Required."],
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
