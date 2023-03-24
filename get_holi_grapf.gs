function get_holi_grapf(name, date) {
  var open_gr = SpreadsheetApp.openById("");// вставить id таблицы
  var test1 = 0
  var test2 = 0
  var test3 = 1
  var index_test = 0
  for(var i = 0; i < date.length; i++){
    if(test1 == 0){
      test1 = date[i].toLocaleDateString("en-GB").slice(3,5)
    }else{
      test2 = date[i].toLocaleDateString("en-GB").slice(3,5)
      if(test1 != test2){
        test3 = 2
        index_test = i
        break
      }
    }
    
  }
  if(test3 == 1){
    var month_num = date[0].toLocaleDateString("en-GB").slice(3,5)
    var month = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
    var year = date[0].toLocaleDateString("en-GB").slice(6, )
    //var weak = ISO8601_week_no(day)
    var open_graph = open_gr.getSheetByName(month[month_num - 1] + " " + year);
    var lastRowWeak = open_graph.getLastRow();
    var lastcolmWeak = open_graph.getLastColumn();
    var my_gr = open_graph.getRange(1, 1, lastRowWeak, lastcolmWeak).getValues();
    //console.log(my_br.length)
    var index_name = -1
    var date_row = -1
    for(var i = 0; i < my_gr.length; i++){
        if(my_gr[i].includes(name)){
          var index_name = i
        }
        if(my_gr[i].includes("ФИО")){
          var date_row = i
        }
        if(index_name != -1 && date_row != -1){
          break
        }
      }
    for(var i = 0; i < my_gr[0].length; i++){
      if(typeof(my_gr[date_row][i]) == "object"){
        if(my_gr[date_row][i].toLocaleDateString("en-GB") == date[0].toLocaleDateString("en-GB")){
          var index_date = i
          break
        }
      }
    }
    var dates_holy = my_gr[index_name].slice(index_date, index_date + date.length)
    for(var i = 0; i < dates_holy.length; i++){
      if(dates_holy[i] != ""){
        dates_holy[i] = "О"
      }else{
        dates_holy[i] = "От"
      }
    }
    
    dates_holy = [dates_holy]
    console.log(dates_holy)
    open_graph.getRange(index_name + 1,  index_date + 1, dates_holy.length, dates_holy[0].length).setValues(dates_holy)
    /*if(my_gr[index_name][index_date] != ""){
      open_graph.getRange(index_name + 1,  index_date + 1,1, 1).setValue("О")
    }else{
      open_graph.getRange(index_name + 1,  index_date + 1,1, 1).setValue("От")
    }*/
  }else{
      var dates1 = date.slice(0, index_test)
      var dates2 = date.slice(index_test, )
      var month_num = dates1[0].toLocaleDateString("en-GB").slice(3,5)
      var month = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
      var year = dates1[0].toLocaleDateString("en-GB").slice(6, )
      //var weak = ISO8601_week_no(day)
      var open_graph = open_gr.getSheetByName(month[month_num - 1] + " " + year);
      var lastRowWeak = open_graph.getLastRow();
      var lastcolmWeak = open_graph.getLastColumn();
      var my_gr = open_graph.getRange(1, 1, lastRowWeak, lastcolmWeak).getValues();
      //console.log(my_br.length)
      var index_name = -1
      var date_row = -1
      for(var i = 0; i < my_gr.length; i++){
          if(my_gr[i].includes(name)){
            var index_name = i
          }
          if(my_gr[i].includes("ФИО")){
            var date_row = i
          }
          if(index_name != -1 && date_row != -1){
            break
          }
        }
      for(var i = 0; i < my_gr[0].length; i++){
        if(typeof(my_gr[date_row][i]) == "object"){
          if(my_gr[date_row][i].toLocaleDateString("en-GB") == date[0].toLocaleDateString("en-GB")){
            var index_date = i
            break
          }
        }
      }
      var dates_holy = my_gr[index_name].slice(index_date, index_date + dates1.length)
      for(var i = 0; i < dates_holy.length; i++){
        if(dates_holy[i] != ""){
          dates_holy[i] = "О"
        }else{
          dates_holy[i] = "От"
        }
      }
      
      dates_holy = [dates_holy]
      open_graph.getRange(index_name + 1,  index_date + 1, dates_holy.length, dates_holy[0].length).setValues(dates_holy)
      var month_num = dates2[0].toLocaleDateString("en-GB").slice(3,5)
      var month = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
      var year = dates2[0].toLocaleDateString("en-GB").slice(6, )
      //var weak = ISO8601_week_no(day)
      var open_graph = open_gr.getSheetByName(month[month_num - 1] + " " + year);
      var lastRowWeak = open_graph.getLastRow();
      var lastcolmWeak = open_graph.getLastColumn();
      var my_gr = open_graph.getRange(1, 1, lastRowWeak, lastcolmWeak).getValues();
      //console.log(my_br.length)
      var index_name = -1
      var date_row = -1
      for(var i = 0; i < my_gr.length; i++){
          if(my_gr[i].includes(name)){
            var index_name = i
          }
          if(my_gr[i].includes("ФИО")){
            var date_row = i
          }
          if(index_name != -1 && date_row != -1){
            break
          }
        }
      for(var i = 0; i < my_gr[0].length; i++){
        if(typeof(my_gr[date_row][i]) == "object"){
          if(my_gr[date_row][i].toLocaleDateString("en-GB") == date[0].toLocaleDateString("en-GB")){
            var index_date = i
            break
          }
        }
      }
      var dates_holy = my_gr[index_name].slice(index_date, index_date + dates2.length)
      for(var i = 0; i < dates_holy.length; i++){
        if(dates_holy[i] != ""){
          dates_holy[i] = "О"
        }else{
          dates_holy[i] = "От"
        }
      }
      
      dates_holy = [dates_holy]
      open_graph.getRange(index_name + 1,  index_date + 1, dates_holy.length, dates_holy[0].length).setValues(dates_holy)
      

  }
}
