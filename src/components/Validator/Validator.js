const regExObj = {
  mail: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  alnum: /^[a-z0-9]+$/i,
  string: /^[a-zA-Z\s]*$/,
  number: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
};

const errorMessages = {
  notmail: "Please enter valid mail address",
  invalidLength: "Please maintain the limit",
  notequal: "The value doesn't match",
  required: "The value is required and can't be empty",
  notstring: "Value entered is not a string",
  notInt: "Value entered is not a number",
  notAlnum: "Value entered is not alphanumeric",
  notminVal: "Number entered is smaller than minimum value",
  notmaxVal: "Number entered is bigger than maximum value",
  notless: "Value is not less than the compared value",
  notmore: "Value is not more than the compared value",
};

const minVal = (value, param = 1) => {
  if (isIntOnly(value) && isIntOnly(param)) {
    return +value.trim() >= +param ? true : false;
  } else {
    return false;
  }
};

const maxVal = (value, param = 1) => {
  if (isIntOnly(value) && isIntOnly(param)) {
    return +value.trim() <= +param ? true : false;
  } else {
    return false;
  }
};

const minLength = (value, param = 5) => {
  return value[0].trim().length >= param ? true : false;
};

const maxLength = (value, param = 5) => {
  return value[0].trim().length <= param ? true : false;
};

const isMail = (value) => {
  return value[0].trim().toString().match(regExObj.mail) ? true : false;
};

const isAlnum = (value) => {
  return value[0].trim().toString().match(regExObj.alnum) ? true : false;
};

const isStringOnly = (value) => {
  return value[0].trim().match(regExObj.string) ? true : false;
};

const isIntOnly = (value) => {
  return value[0].trim().match(regExObj.number) ? true : false;
};

const isEqual = (value) => {
  return value[0].trim() === value[1].trim();
};

const isRequired = (value) => {
  return value[0].trim().length !== 0;
};

const isLessThan = (value) => {
  return parseFloat(value[0].trim()) < parseFloat(value[1].trim());
};

const isMoreThan = (value) => {
  return parseFloat(value[0].trim()) > parseFloat(value[1].trim());
};

const Validate = (value = "", type = "") => {
  let result = {
    isValid: true,
    errorMsg: true,
  };

  value = value?.trim().split("|") || [""];
  type = type.trim().split("|");

  let validity = true;
  let errors = [];

  type.map((check) => {
    let length;

    switch (check.trim().split(" ")[0]) {
      case "minVal":
        length = +check.trim().split(" ")[1];
        validity = validity && minVal(value, length);
        errors.push(minVal(value, length) ? "" : errorMessages.notminVal);
        break;
      case "maxVal":
        length = +check.trim().split(" ")[1];
        validity = validity && maxVal(value, length);
        errors.push(maxVal(value, length) ? "" : errorMessages.notmaxVal);
        break;
      case "minLength":
        length = +check.trim().split(" ")[1];
        validity = validity && minLength(value, length);
        errors.push(
          minLength(value, length)
            ? ""
            : [errorMessages.invalidLength, `minimum ${length}`].join(" ")
        );
        break;
      case "maxLength":
        length = +check.trim().split(" ")[1];
        validity = validity && maxLength(value, length);
        errors.push(
          maxLength(value, length)
            ? ""
            : [errorMessages.invalidLength, `maximum ${length}`].join(" ")
        );
        break;
      case "isMail":
        validity = validity && isMail(value);
        errors.push(isMail(value) ? "" : errorMessages.notmail);
        break;
      case "isAlnum":
        validity = validity && isAlnum(value);
        errors.push(isAlnum(value) ? "" : errorMessages.notAlnum);
        break;
      case "isStringOnly":
        validity = validity && isStringOnly(value);
        errors.push(isStringOnly(value) ? "" : errorMessages.notstring);
        break;
      case "isNumberOnly":
        validity = validity && isIntOnly(value);
        errors.push(isIntOnly(value) ? "" : errorMessages.notInt);
        break;
      case "isEqual":
        validity = validity && isEqual(value);
        errors.push(isEqual(value) ? "" : errorMessages.notequal);
        break;
      case "isRequired":
        validity = validity && isRequired(value);
        errors.push(isRequired(value) ? "" : errorMessages.required);
        break;
      case "isLessThan":
        validity = validity && isLessThan(value);
        errors.push(isLessThan(value) ? "" : errorMessages.notless);
        break;
      case "isMoreThan":
        validity = validity && isMoreThan(value);
        errors.push(isMoreThan(value) ? "" : errorMessages.notmore);
        break;
      default:
        validity = false;
        errors.push("wrong validator selected!!!!");
        console.log("illegal move my guy", check);
    }
  });

  result.isValid = validity;
  const notNullErr = errors.filter((err) => {
    if (err.length > 2) return err;
  });
  result.errorMsg =
    errors.join(" ").trim() === "" ? null : notNullErr.join(", ").trim();

  return result;
};

export default Validate;
