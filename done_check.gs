function done_check_plus(number) {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.getRange('D' + number).activate();
  spreadsheet.getCurrentCell().setValue('TRUE');
  spreadsheet.getRange("D" + number).activate();
  spreadsheet.getActiveRangeList().setBackground('#00ff00');
}
function done_check_minus(number) {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.getRange('D' + number).activate();
  spreadsheet.getCurrentCell().setValue('TRUE');
  spreadsheet.getRange("D" + number).activate();
  spreadsheet.getActiveRangeList().setBackground('#ff0000');
}
