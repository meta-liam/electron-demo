// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

console.log("---------0000-----------");
var ws ;
var inputMsg = document.getElementById("msgInput");
var outMsg = document.getElementById("msgOutput");

function showLog(v){
    let date = new Date();
    let pre = "["+date.getHours() +":"+ date.getMinutes() +":"+date.getSeconds()+"] ";
    v= pre+ v;
    console.log("log:",v);
    outMsg.innerHTML =v+ "<br>"+ outMsg.innerHTML ;
}

function loadWs(){
    console.log("loadWs!")
    ws = new WebSocket("ws://localhost:52384");

    ws.onopen = function(evt) { 
        console.log("Connection open ..."); 
        //ws.send('{"jsonrpc":"2.0","method":"getNetList","params":[],"id":0,"service":"discovery"}');
    };

    ws.onmessage = function(evt) {
        // console.log( "Received Message: " + evt.data);
        // ws.close();
        showLog(evt.data)
    };

    ws.onclose = function(evt) {
        console.log("Connection closed.");
    }; 
}

function getList(){
    ws.send('{"jsonrpc":"2.0","method":"getNetList","params":[],"id":0,"service":"discovery"}');
}
function sayHello(){
    ws.send('{"jsonrpc":"2.0","method":"say","params":"liam","id":1,"service":"hello-world"}');
}

document.getElementById("ts01").addEventListener('click',function ()
{
    showLog("hello!");
}); 

document.getElementById("tsLoadWs").addEventListener('click',function ()
{
    loadWs();
});

document.getElementById("tsSayHello").addEventListener('click',function ()
{
    sayHello();
});

document.getElementById("tsGetList").addEventListener('click',function ()
{
    getList();
});

document.getElementById("tsCloseWs").addEventListener('click',function ()
{
    ws.close();
});

document.getElementById("tsSend").addEventListener('click',function ()
{
   var v = inputMsg.value ;
   ws.send(v);
});
