let date = new Date();
let year = date.getFullYear();
let month = date.getMonth() + 1;
let day = date.getDate();
let hour = date.getHours();
let minute = date.getMinutes();
let second = date.getSeconds();
let millisecond = date.getMilliseconds();
// console.log(date);//2019-03-05T13:20:06.159Z
// console.log(date.toLocaleString());//2019-3-5 21:20:06
// console.log(date.toLocaleDateString());//2019-3-5
// console.log(date.toLocaleTimeString());//21:20:06
// console.log(date.toString());//Tue Mar 05 2019 21:20:06 GMT+0800 (中国标准时间)
// console.log(date.toDateString());//Tue Mar 05 2019
// console.log(date.toTimeString());//21:20:06 GMT+0800 (中国标准时间)
// console.log(year + '年' + month + '月' + day + '日 ' + hour + ':' + minute + ':' + second);//2019年3月5日 22:2:3
// console.log(year + ' ' + month + ' ' + day + ' ' + hour + ' ' + minute + ' ' + second);//2019 3 5 22 3 33
function standTime(){
    function handle(num){
        let temp = '0' + num;
        return temp.slice(-2);
    };
    return year + '-' + handle(month) + '-' + handle(day) + ' ' + date.toLocaleTimeString();
}
function logTime(){
    let temp = date.toLocaleDateString() + ' ' + date.toLocaleTimeString() + ':' + millisecond;
    return temp;
}
module.exports = {
    standTime: standTime,
    logTime: logTime
}