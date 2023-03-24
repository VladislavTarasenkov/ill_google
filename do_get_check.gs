function do_get_check(list, name) {
  var open_graph = SpreadsheetApp.openById(""); //вставить id таблицы
  var n = list[0].toLocaleDateString("en-GB")
  var m = list[1].toLocaleDateString("en-GB")
  console.log(list)
  var int_month = n.slice(3, 5)
  var int_month2 = n.slice(3, 5)
  var year_now = n.slice(6,)
  var year_now2 = m.slice(6,)
  var date1 = list[0]
  var date2 = list[1]
  //console.log(year_now2)
  //var doing = "Открыть больничный"
  
  var month = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
  if(int_month == int_month2 &  year_now == year_now2){  
      var month_name = month[int_month - 1] + " " + year_now;
      var graph2 = open_graph.getSheetByName(month_name);
      var lastRow = graph2.getLastRow();
      var lastcolm = graph2.getLastColumn();
      var my_graph = graph2.getRange(1, 1, lastRow, lastcolm).getValues();
      var index_name = -1
      var date_row = -1
      for(var i = 0; i < my_graph.length; i++){
        if(my_graph[i].includes(name)){
          var index_name = i
        }
        if(my_graph[i].includes("ФИО")){
          var date_row = i
        }
        if(index_name != -1 && date_row != -1){
          break
        }
      }
      var index_day1 = -1
      var index_day2 = -1
      for(var i = 0; i < my_graph[date_row].length; i++){ //индексы дат в графике
        if(typeof(my_graph[date_row][i]) == "object"){
          if(index_day1 != -1 && index_day2 != -1){
              break
          }
          if(my_graph[date_row][i].toLocaleDateString("en-GB") == date1.toLocaleDateString("en-GB")){
            //console.log(my_graph[date_row][i].toLocaleDateString("en-GB"))
            //console.log(date1.toLocaleDateString("en-GB"))
            index_day1 = i
          }
          if(my_graph[date_row][i].toLocaleDateString("en-GB") == date2.toLocaleDateString("en-GB")){
            //console.log(my_graph[date_row][i].toLocaleDateString("en-GB"))
            //console.log(date2.toLocaleDateString("en-GB"))
            index_day2 = i
          }
        }
      }
      var set_br = my_graph[index_name].slice(index_day1,index_day2 + 1)
      var flag = "OK";
      for(i in set_br){
        if(set_br[i] != "БЛ" & set_br[i] != "бол"){
          flag = "error"
          break
        }
      }
    if(flag == "OK"){
      return flag
    }else{
      return flag
    }
  }
}
