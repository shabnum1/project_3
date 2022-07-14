const mongoose = require("mongoose");

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<==========================  VALIDATORS  ===========================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\\

// 1st Validator ==>

const isValidObjectId = (objectId) => {
  return mongoose.Types.ObjectId.isValid(objectId);
};

// 2nd Validator ==>

const objectValue = (value) => {
  if (typeof value === "undefined" || value === null || typeof value === "boolean" || typeof value === "number") return false;
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

// 9th Validator ==>

const pincodeRegex = (value) => {
  let pincodeRegex = /^[1-9][0-9]{5}$/;
  if (pincodeRegex.test(value))
    return true;
}

// 10th Validator ==>

const ratingRegex = (value) => {
  let ratingRegex = /^[1-5]{1}$/;
  if (ratingRegex.test(value))
    return true;
}

// 11th Validator ==>

const strRegex = (value) => {
  let strRegex = /^[A-Za-z\s]{0,}[\.,'-]{0,1}[A-Za-z\s]{0,}[\.,'-]{0,}[A-Za-z\s]{0,}[\.,'-]{0,}[A-Za-z\s]{0,}[\.,'-]{0,}[A-Za-z\s]{0,}[\.,'-]{0,}[A-Za-z\s]{0,}$/;
  if (strRegex.test(value))
    return true;
}

// 12th Validator ==>

const isValidISBN =function (ISBN){
  const ISBNRegex = /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/
  return ISBNRegex.test(ISBN)
}

// 13th Validator ==>

const isValidArray = (value) => {
  if (Array.isArray(value)) {
      for (let i = 0; i < value.length; i++) {
          if (value[i].trim().length === 0 || typeof (value[i]) !== "string") { return false }
      }
      return true
  } else { return false }
}

// 14th Validator ==>

const booleanValue = (value) => {
  if (typeof value === "undefined" || typeof value === "string" || value === null || typeof value === "number" || typeof value === true) return false;
  if (typeof value === false && value.length === 0) return false;
  return true;
};

// 15th Validator ==>

const numberValue = (value) => {
  if (typeof value === "undefined" || value === null || typeof value === "boolean" || typeof value === "string") return false;
  if (typeof value === "number" && value.length === 0) return false;
  return true;
};

// 16th Validator ==>

const isValidDate =function(date){
  const isValidDate = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/
  return isValidDate.test(date)
}

// 17th Validator ==>
//to upload book cover link 
const urlRegex = (value) => {
  let urlRegex = /(https|http?:\/\/.*\.(?:png|gif|webp|jpeg|jpg))/i;
  if (urlRegex.test(value))
    return true;
}


module.exports = { isValidObjectId, objectValue, nameRegex, emailRegex, keyValue, mobileRegex, passwordRegex, isValidTitle, pincodeRegex, isValidISBN, isValidArray, booleanValue, numberValue, isValidDate, ratingRegex, strRegex, urlRegex };     // EXPORTING THEM
                                                                                                        