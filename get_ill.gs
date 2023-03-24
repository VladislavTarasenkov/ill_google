function get_ill(doing, name, dates) {
  console.log(name)
  var name = name.replace(/\s+/g, ' ').trim()
  console.log(name)
  var open_graph = SpreadsheetApp.openById(""); // вставить id таблицы
  var n = dates
  var int_month = n.slice(5, 7)
  var int_month2 = n.slice(18, 20)
  var year_now = n.slice(0, 4)
  var year_now2 = n.slice(13, 17)
  var date1 = new Date(n.slice(0, 10))
  var date2 = new Date(n.slice(13,))
  //console.log(year_now2)
  var doing = "Открыть больничный"
  var month = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
  if(int_month == int_month2 &  year_now == year_now2){  
      var month_name = month[int_month - 1] + " " + year_now;
      var graph2 = open_graph.getSheetByName(month_name);
      var lastRow = graph2.getLastRow();
      var lastcolm = graph2.getLastColumn();
      var my_graph = graph2.getRange(1, 1, lastRow, lastcolm).getValues();
      var index_name = -1
      var date_row = -1
      console.log(typeof(my_graph[4][my_graph[4].length - 2]))
      console.log(name == my_graph[4][my_graph[4].length - 2])

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
      //console.log(index_day1, index_day2)
      var set_br = my_graph[index_name].slice(index_day1,index_day2 + 1)
      var list_days = []
      for(var i = index_day1; i < index_day2 + 1; i++){
        //console.log(my_graph[date_row][i])
        list_days.push(my_graph[date_row][i])
      }
      var flag1 = -1
      var flag2 = 0
      var date_holi = 0
      if(!set_br.includes("О") & !set_br.includes("От")){
        for(var i = 0; i < set_br.length; i++){
          if(set_br[i] == "У" || set_br[i] == "УО" || set_br[i] == "уот"){
            continue
          }
          if(set_br[i] != ""){
            if(set_br[i] == "бол"){
              continue
            }
            set_br[i] = "БЛ"
          }else{
            set_br[i] = "бол"
          }
        }
      }else{
        console.log("test")
        for(var i = 0; i < set_br.length; i++){  
          if(flag1 == -1){
            if(set_br[i] == "О" || set_br[i] == "От"){
              flag1 = i
              date_holi++
            }
          }else{
            date_holi++
            console.log(date_holi)
          }
          if(set_br[i] == "У" || set_br[i] == "УО" || set_br[i] == "уот"){
            
            continue
          }    
          if(set_br[i] != ""){
            if(set_br[i] == "О" ){
              flag2++
              set_br[i] = "БЛ"
            }
            if(set_br[i] == "От" ){
              flag2++
              set_br[i] = "бол" 
            }else{
              set_br[i] = "БЛ"
            }
          /*if(flag1 != -1){
            date_holi++
            console.log(date_holi)
          }*/           
          }else{
            set_br[i] = "бол"                    
          }
          var test = my_graph[date_row][flag1 + index_day1]
          //console.log(test)
        }
        get_hol(n, test, flag2, date_holi, name)
        //var list_day2 = []
        //console.log(my_graph[date_row][flag1 + index_day1])
        //console.log(flag2)
        //var n = 1
        /*for(var i = index_day1 + flag1; i < index_day2 + flag2; i++){
          //console.log(my_graph[date_row][i])
          if(typeof(my_graph[date_row][i]) == "object"){
            console.log(my_graph[date_row][i])
            list_day2.push(my_graph[date_row][i])
          }else{
            if(n == 1){
              var ddd = new Date(my_graph[date_row][i-n].getTime() + (24 * 60 * 60 * 1000))
            console.log(new Date(ddd))
            }
            list_day2.push(new Date(list_day2[]).getTime() + (24 * 60 * 60 * 1000))
          }
        }
        console.log('есть2')
        console.log(list_day2)*/
      }
      var set_br = [set_br]
      console.log(set_br)
      graph2.getRange(index_name + 1, index_day1 + 1, set_br.length, set_br[0].length).setValues(set_br);
      //graph2.getRange(index_name + 1,  index_day1 + 1,set_br.length, set_br[0].length).
      /*for(var i = 0; i < list_days.length; i++){
        console.log(list_days)
        clean_br(name, list_days[i])
      }*/
      //clean_br(name, date1)

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
    do_get_ill(list_dif_dates, name)
    do_get_ill(list_dif_dates2, name)

  }
  
  /*if(doing == "Продлить больничный" || doing == "Закрыть больничный"){
    var n = dates
    var date1 = new Date(n)
    var list_dif_dates = []
    var list_dif_dates2 = []
    var b = n.slice(8,)
    var int_month = n.slice(5, 7)
    if(b < 17){  
      for(var i = 1; i < 18; i++){
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
          console.log(list_dif_dates, "мы тут")
          console.log(list_dif_dates2, "мы тут2")
          break
        }
    
      }
    }else{
      list_dif_dates.push(getPastDate(17, date1))
      list_dif_dates.push(date1)     
    }
    var open_graph = SpreadsheetApp.openById("");
    var list = list_dif_dates
    var n = list[0].toLocaleDateString("en-GB")
    console.log(n)
    var m = list[1].toLocaleDateString("en-GB")
    var int_month = n.slice(3, 5)
    var int_month2 = n.slice(3, 5)
    var year_now = n.slice(6,)
    var year_now2 = m.slice(6,)
    var date1 = list[0]
    var date2 = list[1]
    var month = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
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
    var index_c1 = 0
    console.log(index_name)
    var set_br = my_graph[index_name].slice(index_day1,index_day2 + 1)
    console.log(list_dif_dates)
    if(set_br.includes("БЛ") || set_br.includes("бол")){
      for(var i = set_br.length; i > -1; i--){
        if(set_br[i] == ("БЛ") || set_br[i] == ("бол")){
          index_c1 = i + 1
          set_br = set_br.slice(index_c1, )
          
          var list = []
          list.push(my_graph[date_row][index_day1 + i + 1])
          list.push(my_graph[date_row][index_day2])
          if(list[0] > list[1]){
            break
          }else{
            do_get_ill(list, name)
          }
          break
        }else{
          continue
        }
      }
    }else{
      var open_graph = SpreadsheetApp.openById("");
      var list = list_dif_dates2
      var n = list[0].toLocaleDateString("en-GB")
      var m = list[1].toLocaleDateString("en-GB")
      var int_month = n.slice(3, 5)
      var int_month2 = n.slice(3, 5)
      var year_now = n.slice(6,)
      var year_now2 = m.slice(6,)
      var date1 = list[0]
      var date2 = list[1]
      var month = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
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
      var index_c1 = 0
      //console.log(index_day1, index_day2)
      var set_br = my_graph[index_name].slice(index_day1,index_day2 + 1)
      if(set_br.includes("БЛ") || set_br.includes("бол")){
        for(var i = set_br.length; i > -1; i--){
          if(set_br[i] == ("БЛ") || set_br[i] == ("бол")){
            index_c1 = i + 1
            set_br = set_br.slice(index_c1, )
            
            var list = []
            list.push(my_graph[date_row][index_day1 + i + 1])
            list.push(my_graph[date_row][index_day2])
            if(list[0] > list[1]){
              do_get_ill(list_dif_dates, name)
              break
            }else{
              do_get_ill(list, name)
              do_get_ill(list_dif_dates, name)
              break
            }
            break
          }else{
            continue
          }
        }
      }
    }
  }*/
}

