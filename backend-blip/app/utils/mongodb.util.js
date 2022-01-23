const errors = require("./errors.util.js");

exports.connect = (db) => {
  db.mongoose
    .connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to the database!");
    })
    .catch((err) => {
      console.log("Cannot connect to the database!", err);
      process.exit();
    });
};

exports.createOne = async (saveModel, saveObj) => {
  try {
    const newObj = new saveModel(saveObj);
    const error = newObj.validateSync();
    if (error) {
      throw errors.INVALID_PAYLOAD;
    }
    const result = await newObj.save();
    return result;
  } catch (error) {
    if (error === errors.INVALID_PAYLOAD) {
      throw errors.INVALID_PAYLOAD;
    } else {
      throw errors.CREATION_FAILED;
    }
  }
};

exports.findOne = async (findModel, findObj) => {
  try {
    const result = await findModel.findOne(findObj);
    return result;
  } catch (error) {
    throw errors.VALIDATION_FAILED;
  }
};

exports.updateOne = async (updateModel, findObj, updateObj, updateConfig) => {
  try {
    const result = await updateModel.updateOne(findObj, updateObj, updateConfig);
    return result;
  } catch (error) {
    throw errors.UPDATION_FAILED;
  }
};

exports.findAll = async (findAllModel) => {
  try {
    const findObj = {};
    const result = await findAllModel.find(findObj);
    return result;
  } catch(error) {
    throw errors.VALIDATION_FAILED;
  }
};

exports.deleteOne = async (deleteModel, deleteObj) => {
  try {
    const result = await deleteModel.deleteOne(deleteObj);
    return result;
  } catch (error) {
    throw errors.DELETION_FAILED;
  }
};
