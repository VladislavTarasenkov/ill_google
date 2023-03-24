function done(number, sheet) {
  sheet.getRange(number, 3, 1, 1).setValue(true);
  sheet.getRange(number, 1, 1, 3).setBackground('#00ff00');
  sheet.getRange(number, 4, 1, 1).setValue("БЛ");
};
