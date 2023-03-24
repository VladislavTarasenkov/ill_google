function doPost(e) {
  const ss = SpreadsheetApp.openById('') // вставляем id таблицы
  let sheet = ss.getSheetByName('Лист1')

  
  sheet.appendRow([new Date(), e.postData.contents])
  sheet.setRowHeightsForced(sheet.getLastRow(), 1, 21)
  
  
  return ContentService.createTextOutput(JSON.stringify(e)).setMimeType(ContentService.MimeType.JSON)
}
