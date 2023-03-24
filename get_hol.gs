function get_hol(dates, flag1, flag2, flag3, name) {
  console.log("name", name)
  console.log(flag1, flag2, flag3, "мы мымы")
  var name = name.replace(/\s+/g, ' ').trim()
  var open_hol = SpreadsheetApp.openById(""); // вставить id таблицы
  //var n = "2023-01-16 - 2023-01-31"
  console.log(dates)
  console.log("dates")
  var dates = dates.slice(0,4)
  console.log(dates)
  var open_holi = open_hol.getSheetByName("Отпуска " + dates)
  var lastRow = open_holi.getLastRow();
  var lastcolm = open_holi.getLastColumn();
  var my_graph_holi = open_holi.getRange(1, 1, lastRow, lastcolm).getValues();
  console.log(flag1)
  var flag4 = flag2
  //var index_name_hol = 1
  for(var i = 0; i < my_graph_holi[0].length; i++){
    if(typeof(my_graph_holi[0][i]) == "object"){
      if(my_graph_holi[0][i].toLocaleDateString("en-GB") == flag1.toLocaleDateString("en-GB")){
        var index_flag1 = i
      }
    }
  }
  for(var i = 0; i < my_graph_holi.length; i++){
    if(my_graph_holi[i].includes(name)){
      var index_name_hol = i
    }
  }
  console.log(index_flag1)
  //console.log(my_graph_holi[0][index_flag1])
  //console.log("дата")
  console.log("tut", index_name_hol)
  var list_holi = my_graph_holi[index_name_hol].slice(index_flag1, index_flag1 + 31)
  //console.log(list_holi)
  var list_holi_graph = []
  for(var i = 0; i < list_holi.length; i++){
    if(flag2 != 0){
      list_holi[i] = ""
      flag2 = flag2 - 1
    }
    if(i >= flag3){
      if(flag4 != 0){
        if(list_holi[i] == ""){
          list_holi[i] = "1"
          flag3--
          flag4--
          list_holi_graph.push(my_graph_holi[0][index_flag1 + i])
        }
      }
    }
    console.log(list_holi[i])
  }
  var list_holi = [list_holi]
  console.log(list_holi)
  open_holi.getRange(index_name_hol + 1, index_flag1 + 1, list_holi.length, list_holi[0].length).setValues(list_holi)
  get_holi_grapf(name, list_holi_graph)
  

}
