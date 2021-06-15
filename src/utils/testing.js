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

function getAge (dateString) {

    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    console.log(dateString)
    return age;
}

var date = '31/12/1997';
var datearray = date.split("/");

var newdate = datearray[1] + '/' + datearray[0] + '/' + datearray[2];console.log(newdate)

var birthDate = new Date(newdate);

console.log(birthDate)