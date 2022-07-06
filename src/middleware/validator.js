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
  let nameRegex =  /^[A-Za-z\s]{0,}[\.]{0,1}$/;;
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
  let mobileRegex = /^[\]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$/;
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
  let pincodeRegex = /^[1-9][0-9]{5}$/
  ;
  if (pincodeRegex.test(value))
    return true;
}


module.exports = { isValidObjectId, objectValue, nameRegex, emailRegex, keyValue, mobileRegex, passwordRegex, isValidTitle, pincodeRegex }; 
                                                                                                        // EXPORTING THEM