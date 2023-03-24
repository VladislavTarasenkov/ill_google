function check(doing, name, dates) {
  var name = name.replace(/\s+/g, ' ').trim()
  if(doing == "Открыть больничный"){
    var open_graph = SpreadsheetApp.openById(""); //вставить id таблицы
    var n = dates
    var int_month = n.slice(5, 7)
    var int_month2 = n.slice(18, 20)
    var year_now = n.slice(0, 4)
    var year_now2 = n.slice(13, 17)
    var date1 = new Date(n.slice(0, 10))
    var date2 = new Date(n.slice(13,))
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
          if(my_graph[i].includes("дата")){
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
    if(int_month != int_month2 ||  year_now != year_now2){
      var list_dif_dates = []
      var list_dif_dates2 = []
      var firstday = 0
      var date1 = n.slice(0, 10)
      var date2 = n.slice(13,)
      console.log(date2)
      for(var i = 1; i < 35; i++){
        var j = getFutureDate(i, date1).toLocaleDateString("en-GB")
        var int_month3 = j.slice(3, 5)
        console.log(int_month3)
        if(int_month2 == int_month3){
          date1 = new Date(date1)
          date2 = new Date(date2)
          list_dif_dates.push(date1)
          list_dif_dates.push(getFutureDate(i - 1, date1))
          list_dif_dates2.push(getFutureDate(i, date1))
          list_dif_dates2.push(date2)
          break
        }
        //console.log(list_dif_dates2)
        //console.log(list_dif_dates)
        
      }
      console.log(list_dif_dates)
      console.log(list_dif_dates2)
      if(do_get_check(list_dif_dates, name) == "OK"){
        var mm = do_get_check(list_dif_dates2, name)
        return mm
      }else{
        return "error"
      }

    }
  }else{
    var n = dates
    var list_dif_dates = []
    var list_dif_dates2 = []
    var b = n.slice(8,)
    console.log(n)
    console.log(b)
    var int_month = n.slice(5, 7)
    if(b < 2){  
      for(var i = 1; i < 2; i++){
        var j = getPastDate(i, new Date(n)).toLocaleDateString("en-GB")
        var int_month3 = j.slice(3, 5)
        //console.log(j)
        //console.log(int_month)
        if(int_month != int_month3){          
          date1 = new Date(n)
          date2 = new Date(n)
          list_dif_dates.push(getPastDate(i - 1, date1))
          list_dif_dates.push(date1)
          list_dif_dates2.push(getPastDate(17, date1))
          list_dif_dates2.push(getPastDate(i, date1))
          break
        }
      }
      console.log(list_dif_dates)
      console.log("tut1")
      console.log("tut2")
      console.log(list_dif_dates2)
      if(do_get_check(list_dif_dates, name) == "OK"){
        var mm = do_get_check(list_dif_dates2, name)
        return mm
      }else{
        return "error"
      }
    }else{
      var list = []
      list.push(getPastDate(1, n))
      list.push(new Date(n))
      console.log(list)
      console.log("tut3")
      var mm = do_get_check(list, name)
      return mm
    }

  }
}
