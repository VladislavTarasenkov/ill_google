function clean_br(doing, name, days) {
  if(doing == "Продлить больничный" || doing == "Закрыть больничный"){
    return "ok"
  }
  var n = days

  //var n = "2023-02-01 - 2023-02-05"
  var day2 = n.slice(13,)
  var day1 = n.slice(0, 10)
  var list = []
  var list1 =[]
  var list2 = []
  var list3 = []
  var list4 = []
  var list5 = []
  list.push(new Date(day1))
  var week = ISO8601_week_no(new Date(day1))
  console.log(week)
  var c = new Date(day2).toLocaleDateString("en-GB")
  for(var i = 1; b != c; i++){
    list.push(getFutureDate(i, day1))
    var b = getFutureDate(i, day1).toLocaleDateString("en-GB")
    if(b == c){
      break
    }
  }
  var flag = 0
  for(var j = 0; j < list.length; j ++){
    if(flag == 0){
      if(ISO8601_week_no(list[j]) == week + flag){
        list1.push(list[j])
      }else{
        flag++
      }
    }
    if(flag == 1){
      if(ISO8601_week_no(list[j]) == week + flag){
        list2.push(list[j])
      }else{
        flag++
      }
    }
    if(flag == 2){
      if(ISO8601_week_no(list[j]) == week + flag){
        list3.push(list[j])
      }else{
        flag++
      }
    }
    if(flag == 3){
      if(ISO8601_week_no(list[j]) == week + flag){
        list4.push(list[j])
      }else{
        flag++
      }
    }
    if(flag == 4){
      if(ISO8601_week_no(list[j]) == week + flag){
        list5.push(list[j])
      }else{
        flag++
      }
    }
  }
  var list = []
  if(list1.length != 0){
    list.push(list1)
  }
  if(list2.length != 0){
    list.push(list2)
  }
  if(list3.length != 0){
    list.push(list3)
  }
  if(list4.length != 0){
    list.push(list4)
  }
  if(list5.length != 0){
    list.push(list5)
  }
  for(var h = 0; h < list.length; h++){
    var open_br = SpreadsheetApp.openById(""); // вставить id таблицы
    var day = list[h][0]
    var weak = ISO8601_week_no(day)
   
    if(open_br.getSheetByName(weak + ' неделя') != undefined){ 
      var open_br_w = open_br.getSheetByName(weak + " неделя");
      var lastRowWeak = open_br_w.getLastRow();
      var lastcolmWeak = open_br_w.getLastColumn();
      var my_br = open_br_w.getRange(1, 1, lastRowWeak, lastcolmWeak).getValues();
      //console.log(my_br.length)
      for(var i = 0; i < my_br.length; i++){
        if(my_br[i].includes('Расшифровка тэгов')){
          var date_index = my_br[i].indexOf("Расшифровка тэгов")
          break
        }
      }
      var flag_br = 0
      for(var g = 0; g < list[h].length; g++){
        console.log(list[h][g])
        for(var i = flag_br; i < my_br.length; i++){
          if(typeof(my_br[i][date_index]) == "object"){
            if(my_br[i][date_index].toLocaleDateString("en-GB") == list[h][g].toLocaleDateString("en-GB")){

              for(var j = i + 1; j < i + 1000; j++){
                //console.log(my_br[j][date_index])
                if(j > my_br.length - 2){
                  break
                }
                var name_flag = -1
                if(my_br[j].includes(name)){
                  var name_flag = j
                  open_br_w.getRange(name_flag + 1, date_index + 1, 1, 1).setValue("")
                  console.log(j)
                  open_br_w.getRange(name_flag+1, 7, 1, 96).setValue("")
                  flag_br = j
                  break
                }
                if(typeof(my_br[j][date_index]) == "object"){
                  flag_br = j
                  break
                }
              }
            }
          }
        }
      }
      /*if(name_flag != -1){
        open_br_w.getRange(name_flag + 1, date_index + 1, 1, 1).setValue("")
        open_br_w.getRange(name_flag+1, 7, 1, 96).setValue("")
      }*/
      console.log("work")
    }
  }
  
}
