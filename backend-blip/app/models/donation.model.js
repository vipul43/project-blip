module.exports = (mongoose) => {
  const donationSchema = mongoose.Schema(
    {
      partnerId: {
        type: mongoose.ObjectId,
        required: [true, "Partner Id is Required."],
      },
      donorName: {
        type: String,
        required: [true, "Donor Name is Required."],
        validate: {
          validator: (donorName) => {
            return !!donorName && donorName.length <= 20;
          },
          message: "{VALUE} is not a valid Donor Name.",
        },
      },
      donorPhone: {
        type: String,
        trim: true,
        required: [true, "Donor Phone Number is Required."],
        validate: {
          validator: (donorPhone) => {
            if (donorPhone) {
              var re = new RegExp(/^[0-9]{10}$/);
              return re.test(donorPhone);
            } else {
              return true;
            }
          },
          message: "{VALUE} is not a valid Phone Number.",
        },
      },
      donorEmail: {
        type: String,
        lowercase: true,
        trim: true,
        required: [true, "Donor Email is Required."],
        validate: {
          validator: (donorEmail) => {
            var re = new RegExp(
              /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            );
            return re.test(donorEmail);
          },
          message: "{VALUE} is not a valid Email.",
        },
      },
      donationType: {
        type: String,
        required: [true, "Donation Type is Required."],
        enum: {
          values: ["Whole Blood", "Power Red", "Platelet", "Plasma"],
          message: "{VALUE} is not supported.",
        },
      },
      donationQuantity: {
        type: String,
        required: [true, "Donation Quantity is Required."],
      },
      donationDescription: {
        type: String,
        required: [true, "Donation Description is Required."],
        validate: {
          validator: (donationDescription) => {
            if (!!donationDescription) {
              return donationDescription.length <= 50;
            } else {
              return true;
            }
          },
          message: "{VALUE} is not a valid Donation Description.",
        },
      },
      donationStatus: {
        type: String,
        required: [true, "Donation Status is Required."],
        enum: {
          values: [
            "DONATED",
            "ASSIGNED",
            "SEPARATED",
            "TRANSFERRED",
            "REACHED",
            "TERMINATED",
          ],
          message: "{VALUE} is not supported.",
        },
        default: "DONATED",
      },
      isAssigned: {
        type: Boolean,
        required: [true, "Is Assigned? is Required."],
        default: false,
      },
      userId: {
        type: mongoose.ObjectId,
        required: [true, "User Id is Required"],
        default: new mongoose.Types.ObjectId(),
      },
      donationName: {
        type: String,
        required: [true, "Donation Name is Required."],
        validate: {
          validator: (donationName) => {
            return !!donationName && donationName.length <= 20;
          },
          message: "{VALUE} is not a valid Donation Name.",
        },
        default: "Not Yet Assigned.",
      },
      isArchived: {
        type: Boolean,
        required: [true, "Is Archived? is Required."],
        default: false,
      },
      issues: [
        {
          issueName: {
            type: String,
            required: [true, "Issue Name is Required."],
            validate: {
              validator: (issueName) => {
                return (
                  !!issueName && issueName.length >= 5 && issueName.length <= 20
                );
              },
              message: "{VALUE} is not a valid Issue Name.",
            },
          },
          issueDescription: {
            type: String,
            required: [true, "Issue Description is Required."],
            validate: {
              validator: (issueDescription) => {
                return (
                  !!issueDescription &&
                  issueDescription.length >= 10 &&
                  issueName.length <= 50
                );
              },
              message: "{VALUE} is not a valid Issue Description.",
            },
          },
          issueRaised: {
            type: Date,
            required: [true, "Issue Raised Date Time is Required."],
          },
        },
      ],
    },
    { timestamps: true }
  );

  const donation = mongoose.model("donations", donationSchema);
  return donation;
};
