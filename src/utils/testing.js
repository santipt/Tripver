function convertTimestampToDate(timestamp) {
    var a = new Date(timestamp * 1000);
    var year = a.getFullYear();
    var day = a.getDay();
    var month = a.getMonth()
    var time = day + '/' + month + '/' + year ;
    return time;
}

var res = convertTimestampToDate(942188400);
console.log(res)