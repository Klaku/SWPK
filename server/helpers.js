module.exports = {
  IsValidPhoneNumber: (value) => {
    let output = typeof value != "undefined";
    output = output && value != null;
    output = output && value.toString().trim().length == 9;
    return output;
  },
};
