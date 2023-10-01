// 创建一个Worker对象  
if (window.Worker) {
  var worker = new Worker('http://175.24.167.175:8000/data/worker.js');  
}
  
// // 发送消息给Worker线程  
// worker.postMessage([0, 1]);  
  
// // 接收Worker线程发送的消息  
// worker.onmessage = function(event) {  
//   console.log(event.data);  
// };