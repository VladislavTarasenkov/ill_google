var getFutureDate = function(days, day){
  var day = new Date(day);
  return new Date(
      day.getFullYear(),
      day.getMonth(),
      day.getDate() + days,
      day.getHours(),
      day.getMinutes(),
      day.getSeconds());
};
var getPastDate = function(days, day){
  var day = new Date(day);
  return new Date(
      day.getFullYear(),
      day.getMonth(),
      day.getDate() - days,
      day.getHours(),
      day.getMinutes(),
      day.getSeconds());
};
