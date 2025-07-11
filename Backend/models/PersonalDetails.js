const mongoose = require('mongoose');

const PersonalDetailsSchema = new mongoose.Schema({
  email: String,
  name: String,
  phone: String,
  fatherName: String,
  motherName: String,
  fatherProfession: String,
  guardianName: String,
  guardianRelation: String,
  religion: String,
  dob: String,
  classroll: String,
  sex: String,
  caste: String,
  minorityCommunity: String,
  differentlyAbled: String,
  disabilityPercent: String,
  domicileWB: String,
  aadhaar: String,
  houseNo: String,
  streetName: String,
  village: String,
  postOffice: String,
  pinCode: String,
  district: String,
  state: String
});

module.exports = mongoose.model('personal_details', PersonalDetailsSchema);
