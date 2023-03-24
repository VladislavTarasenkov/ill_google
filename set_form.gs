function set_form() {
  var open_form = SpreadsheetApp.openById("");  //вставить id таблицы
  var get_list = open_form.getSheetByName("Лист1")
  var lastRow = get_list.getLastRow()
  var my = get_list.getRange("A365:D" + lastRow.toString()).getValues()
  //console.log(my)
  for(var i = 0; i < my.length; i++){
    if(my[i][2] == false){
      a = my[i][1]
      var a = JSON.parse(a)
      console.log(a)
      if("responses" in a == true){
        if(a.responses["Выберите ваш отдел"] == "Запись"){
          //console.log(a.mail)
          if(a.responses["Тема обращения"] == "Больничный (заполняет рук. группы)"){
            if("Продлить от - до" in a.responses){
              if(a.employee_workmail == ""){
                done(i + 365, get_list)
              }else{
                get_ill(a.responses["Действие с больничным листом"], a.employee_workmail ,a.responses["Продлить от - до"])
                done(i + 365, get_list)
              }
              
              console.log(a.employee_workmail)
              
              //MailApp.sendEmail(a.author, a.responses["Действие с больничным листом"], "Проставлено" + "\n\n" + "-" + "\n" + "Отдел мониторинга")
            }
            /*if("Продлить до" in a.responses){

              //get_ill(a.responses["Действие с больничным листом"], a.employee_workmail ,a.responses["Продлить до"])
              done(i + 361)
              //MailApp.sendEmail(a.author, a.responses["Действие с больничным листом"], "Проставлено" + "\n\n" + "-" + "\n" + "Отдел мониторинга")
            }*/
            if("Проставить больничный на период" in a.responses){
              console.log(a.employee_workmail)
              if(a.employee_workmail == ""){                
                done(i + 365, get_list)
              }else{
                get_ill(a.responses["Действие с больничным листом"], a.employee_workmail ,a.responses["Проставить больничный на период"])
                done(i + 365, get_list)
              }
              
                     
              //MailApp.sendEmail(a.author, a.responses["Действие с больничным листом"], "Проставлено" + "\n\n" + "-" + "\n" + "Отдел мониторинга")
            }
          }
        }
     }
    }
  }
  /*if("responses" in a == true){
    if(a.responses["Выберите ваш отдел"] == "Запись"){
      if(a.responses["Тема обращения"] == "Больничный (заполняет рук. группы)"){
        if("Закрыть этой датой" in a.responses){
          console.log("work")
          //get_ill(a.responses["Действие с больничным листом"], a.responses["Сотрудник"],a.responses["Закрыть этой датой"])
        }
        if("Продлить до" in a.responses){
          //get_ill(a.responses["Действие с больничным листом"], a.responses["Сотрудник"],a.responses["Продлить до"])
        }
        if("Проставить больничный на период" in a.responses)
        //get_ill(a.responses["Действие с больничным листом"], a.responses["Сотрудник"],a.responses["Проставить больничный на период"])
      }
    }
  }*/

}
