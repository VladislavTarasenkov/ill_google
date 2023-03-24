function do_clean() {
  var open_form = SpreadsheetApp.openById(""); //вставить id таблицы
  var get_list = open_form.getSheetByName("Лист1")
  var lastRow = get_list.getLastRow()
  var my = get_list.getRange("A364:D" + lastRow.toString()).getValues()
  for(var i = 0; i < my.length; i++){
    if(my[i][3] == "БЛ"){
      a = my[i][1]
      var a = JSON.parse(a)
      //console.log(a)
      if("responses" in a == true){
        if(a.responses["Выберите ваш отдел"] == "Запись"){
          //console.log(a.mail)
          if(a.responses["Тема обращения"] == "Больничный (заполняет рук. группы)"){
            if("Продлить от - до" in a.responses){
              clean_br(a.responses["Действие с больничным листом"], a.employee_workmail ,a.responses["Продлить от - до"])
              //MailApp.sendEmail(a.author, a.responses["Действие с больничным листом"], "Проставлено" + "\n\n" + "-" + "\n" + "Отдел мониторинга")
              done_clean(i + 364, get_list)
            }
            /*if("Продлить до" in a.responses){
              clean_br(a.responses["Действие с больничным листом"], a.employee_workmail ,a.responses["Продлить до"])
             
              //MailApp.sendEmail(a.author, a.responses["Действие с больничным листом"], "Проставлено" + "\n\n" + "-" + "\n" + "Отдел мониторинга")
            }*/
            if("Проставить больничный на период" in a.responses){
              clean_br(a.responses["Действие с больничным листом"], a.employee_workmail ,a.responses["Проставить больничный на период"])      
              //MailApp.sendEmail(a.author, a.responses["Действие с больничным листом"], "Проставлено" + "\n\n" + "-" + "\n" + "Отдел мониторинга")
              done_clean(i + 364, get_list)
            }
          }
        }
     }
    }
  }
}
