module.exports = (mongoose) => {
  const faqSchema = mongoose.Schema(
    {
      question: {
        type: String,
        required: [true, "FAQ Question is Required."],
      },
      Answer: {
        type: String,
        required: [true, "FAQ Answer is Required"],
      },
    },
    { timestamps: true }
  );

  const faq = mongoose.model("faqs", faqSchema);
  return faq;
};
