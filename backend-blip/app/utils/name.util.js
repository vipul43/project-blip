const { uniqueNamesGenerator, adjectives, animals, NumberDictionary  } = require('unique-names-generator');
const errors = require("./errors.util.js");

const numberDictionary = NumberDictionary.generate({ min: 100, max: 999 });
exports.genRandomName = async () => {
    try {
        const randomName = uniqueNamesGenerator({
            dictionaries: [adjectives, animals, numberDictionary],
            separator: '-',
            style: 'lowerCase',
            length: 3
        });
        return randomName;
      } catch (error) {
        throw errors.RANDOM_NAMEGEN_FAILED;
      }
};