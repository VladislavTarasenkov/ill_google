function do_get_ill(list, name) {
  console.log(name)
  var name = name.replace(/\s+/g, ' ').trim()
  var open_graph = SpreadsheetApp.openById("");   //вставить id таблицы
  var n = list[0].toLocaleDateString("en-GB")
  var m = list[1].toLocaleDateString("en-GB")
  console.log(list)
  var int_month = n.slice(3, 5)
  var int_month2 = n.slice(3, 5)
  var year_now = n.slice(6,)
  var year_now2 = m.slice(6,)
  var date1 = list[0]
  var date2 = list[1]
  console.log(date2)
  var month = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
  var month_name = month[int_month - 1] + " " + year_now;
  var graph2 = open_graph.getSheetByName(month_name);
  var lastRow = graph2.getLastRow();
  var lastcolm = graph2.getLastColumn();
  var my_graph = graph2.getRange(1, 1, lastRow, lastcolm).getValues();
  var index_name = -1
  var date_row = -1
  for(var i = 0; i < my_graph.length; i++){
    //console.log(my_graph[i])
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
    //console.log(my_graph[date_row][flag1 + index_day1])
    //console.log(flag2)
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
    clean_br(name, list_days[i])
  }*/
  //clean_br(name, date1)
}
