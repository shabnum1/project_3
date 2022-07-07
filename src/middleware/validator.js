const mongoose = require("mongoose");

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<==========================  VALIDATORS  ===========================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\\

// 1st Validator ==>

const isValidObjectId = (objectId) => {
  return mongoose.Types.ObjectId.isValid(objectId);
};

// 2nd Validator ==>

const objectValue = (value) => {
  if (typeof value === "undefined" || value === null || typeof value === "boolean") return false;
  if (typeof value === "string" && value.length === 0) return false;
  return true;
};

// 3rd Validator ==>

const keyValue = (value) => {
  if (Object.keys(value).length === 0) return false;
  return true;
};

// 4th Validator ==>

const nameRegex = (value) => {
  let nameRegex =  /^(?![\. ])[a-zA-Z\. ]+(?<! )$/;
  if (nameRegex.test(value)) return true;
};

// 5th Validator ==>

const isValidTitle = (title) => {
  return ['Mr', 'Mrs', 'Miss'].indexOf(title) !== -1
};

// 6th Validator ==>

const emailRegex = (value) => {
  let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-z\-0-9]+\.)+[a-z]{2,}))$/;
  if (emailRegex.test(value)) return true;
};

// 7th Validator ==>

const mobileRegex = (value) => {
  let mobileRegex = /^[6-9]\d{9}$/;
  if (mobileRegex.test(value))
    return true;
}

// 8th Validator ==>

const passwordRegex = (value) => {
  let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,15}$/
  ;
  if (passwordRegex.test(value))
    return true;
}

const pincodeRegex = (value) => {
  let pincodeRegex = /^[1-9][0-9]{5}$/;
  if (pincodeRegex.test(value))
    return true;
}

// const ISBNregex = (value) => {
//   let ISBNregex = !/^\+?([1-9]{3})\)?[-. ]?([0-9]{10})$/
//   if (ISBNregex.test(value))
//   return true;
// }

const isValidISBN =function (ISBN){
  const ISBNRegex = /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/
  return ISBNRegex.test(ISBN)
}


const isValidArray = (value) => {
  if (Array.isArray(value)) {
      for (let i = 0; i < value.length; i++) {
          if (value[i].trim().length === 0 || typeof (value[i]) !== "string") { return false }
      }
      return true
  } else { return false }
}

const booleanValue = (value) => {
  if (typeof value === "undefined" || typeof value === "string" || value === null || typeof value === "number" || typeof value === true) return false;
  if (typeof value === false && value.length === 0) return false;
  return true;
};

const numberValue = (value) => {
  if (typeof value === "undefined" || value === null || typeof value === "boolean") return false;
  if (typeof value === "number" && value.length === 0) return false;
  return true;
};

const isValidDate =function(date){
  const isValidDate = /^\d{4}[\-\/\s]?((((0[13578])|(1[02]))[\-\/\s]?(([0-2][0-9])|(3[01])))|(((0[469])|(11))[\-\/\s]?(([0-2][0-9])|(30)))|(02[\-\/\s]?[0-2][0-9]))$/
  return isValidDate.test(date)
}
// const isISBN =function(value){
//   const isISBN = !/^\+?([1-9]{3})\)?[-. ]?([0-9]{10})$/
//   return isISBN.test(value)
// }

  

// const ISBNvalue = (value) => {
//   if (typeof value === "undefined" || value === null || typeof value === "boolean") return false;
//   if (typeof value === "number" && value.length === 0) return false;
//   return true;
// };


module.exports = { isValidObjectId, objectValue, nameRegex, emailRegex, keyValue, mobileRegex, passwordRegex, isValidTitle, pincodeRegex, isValidISBN, isValidArray, booleanValue, numberValue, isValidDate }; 
                                                                                                        // EXPORTING THEM