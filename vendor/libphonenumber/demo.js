/**
 * @license
 * Copyright (C) 2010 The Libphonenumber Authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview  Phone Number Parser Demo.
 *
 * @author Nikolaos Trogkanis
 */

goog.require('i18n.phonenumbers.PhoneNumberFormat');
goog.require('i18n.phonenumbers.PhoneNumberType');
goog.require('i18n.phonenumbers.PhoneNumberUtil');
goog.require('i18n.phonenumbers.PhoneNumberUtil.ValidationResult');

var phoneUtil = i18n.phonenumbers.PhoneNumberUtil.getInstance();

function isPossibleNumber(phoneNumber, regionCode) {
  regionCode = regionCode || "us";
  var number = phoneUtil.parseAndKeepRawInput(phoneNumber, regionCode);
  return phoneUtil.isPossibleNumber(number);
}

function isPossibleNumberWithReason(phoneNumber, regionCode) {
  regionCode = regionCode || "us";
  var number = phoneUtil.parseAndKeepRawInput(phoneNumber, regionCode);
  return phoneUtil.isPossibleNumberWithReason(number);
}

function isValidNumber(phoneNumber, regionCode) {
  regionCode = regionCode || "us";
  var number = phoneUtil.parseAndKeepRawInput(phoneNumber, regionCode);
  return phoneUtil.isValidNumber(number);
}

function isValidNumberForRegion(phoneNumber, regionCode) {
  regionCode = regionCode || "us";
  var number = phoneUtil.parseAndKeepRawInput(phoneNumber, regionCode);
  return phoneUtil.isValidNumberForRegion(number, regionCode);
}

function getRegionCodeForNumber(phoneNumber, regionCode) {
  regionCode = regionCode || "us";
  var number = phoneUtil.parseAndKeepRawInput(phoneNumber, regionCode);
  return phoneUtil.getRegionCodeForNumber(number);
}

function getNumberType(phoneNumber, regionCode) {
  regionCode = regionCode || "us";
  var number = phoneUtil.parseAndKeepRawInput(phoneNumber, regionCode);
  var output;
  var PNT = i18n.phonenumbers.PhoneNumberType;
  switch (phoneUtil.getNumberType(number)) {
    case PNT.FIXED_LINE:
      output = 'FIXED_LINE';
      break;
    case PNT.MOBILE:
      output = 'MOBILE';
      break;
    case PNT.FIXED_LINE_OR_MOBILE:
      output = 'FIXED_LINE_OR_MOBILE';
      break;
    case PNT.TOLL_FREE:
      output = 'TOLL_FREE';
      break;
    case PNT.PREMIUM_RATE:
      output = 'PREMIUM_RATE';
      break;
    case PNT.SHARED_COST:
      output = 'SHARED_COST';
      break;
    case PNT.VOIP:
      output = 'VOIP';
      break;
    case PNT.PERSONAL_NUMBER:
      output = 'PERSONAL_NUMBER';
      break;
    case PNT.PAGER:
      output = 'PAGER';
      break;
    case PNT.UAN:
      output = 'UAN';
      break;
    case PNT.UNKNOWN:
      output = 'UNKNOWN';
      break;
  }
  return output;
}

function formatE164(phoneNumber, regionCode) {
  var PNF = i18n.phonenumbers.PhoneNumberFormat;
  regionCode = regionCode || "us";
  var number = phoneUtil.parseAndKeepRawInput(phoneNumber, regionCode);
  return phoneUtil.format(number, PNF.E164);
}

function formatNational(phoneNumber, regionCode) {
  var PNF = i18n.phonenumbers.PhoneNumberFormat;
  regionCode = regionCode || "us";
  var number = phoneUtil.parseAndKeepRawInput(phoneNumber, regionCode);
  return phoneUtil.format(number, PNF.NATIONAL);
}

function formatInternational(phoneNumber, regionCode) {
  var PNF = i18n.phonenumbers.PhoneNumberFormat;
  regionCode = regionCode || "us";
  var number = phoneUtil.parseAndKeepRawInput(phoneNumber, regionCode);
  return phoneUtil.format(number, PNF.INTERNATIONAL);
}

function formatInOriginalFormat(phoneNumber, regionCode) {
  regionCode = regionCode || "us";
  var number = phoneUtil.parseAndKeepRawInput(phoneNumber, regionCode);
  return phoneUtil.formatInOriginalFormat(number, regionCode);
}

function formatOutOfCountryCallingNumber(phoneNumber, regionCode, target) {
  if (!target) { return; }
  var number = phoneUtil.parseAndKeepRawInput(phoneNumber, regionCode);
  return phoneUtil.formatOutOfCountryCallingNumber(number, target);
}

goog.exportSymbol('phoneUtils.isPossibleNumber', isPossibleNumber);
goog.exportSymbol('phoneUtils.isPossibleNumberWithReason', isPossibleNumberWithReason);
goog.exportSymbol('phoneUtils.isValidNumber', isValidNumber);
goog.exportSymbol('phoneUtils.isValidNumberForRegion', isValidNumberForRegion);
goog.exportSymbol('phoneUtils.getRegionCodeForNumber', getRegionCodeForNumber);
goog.exportSymbol('phoneUtils.getNumberType', getNumberType);
goog.exportSymbol('phoneUtils.formatE164', formatE164);
goog.exportSymbol('phoneUtils.formatNational', formatNational);
goog.exportSymbol('phoneUtils.formatInternational', formatInternational);
goog.exportSymbol('phoneUtils.formatInOriginalFormat', formatInOriginalFormat);
goog.exportSymbol('phoneUtils.formatOutOfCountryCallingNumber', formatOutOfCountryCallingNumber);
