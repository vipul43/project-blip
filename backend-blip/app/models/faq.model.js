module.exports = (mongoose) => {
  const faqSchema = mongoose.Schema(
    {
      question: {
        type: String,
        required: [true, "FAQ Question is Required."],
      },
      answer: {
        type: String,
        required: [true, "FAQ Answer is Required"],
      },
      by: {
        type: String,
        required: [true, "By is Required"],
        enum: {
          values: ["User", "Partner", "Admin"],
        },
      },
      name: {
        type: String,
      },
    },
    { timestamps: true }
  );

  const faq = mongoose.model("faqs", faqSchema);
  return faq;
};
