/**
 * Created by Administrator on 2016/5/24.
 */
var $ = function(select){
    return document.querySelector(select);
}


function addHandler(element,type,handler){
    if(element.addEventListener){
        element.addEventListener(type,handler,false);
    }else if(element.attachEvent){
        element.attachEvent("on"+type,handler);
    }else{
        element["on"+type]= handler;
    }
}

var treeRoot = document.getElementsByClassName("root")[0];
var divList = [];
timer=null;

function init(){
    var btn = document.getElementsByTagName("input");
    var preBtn = btn[0];
    var cerBtn = btn[1];
    var aftBtn = btn[2];
    console.log(btn);
    addHandler(preBtn,"click",preHandler);
    addHandler(cerBtn,"click",cerHandler);
    addHandler(aftBtn,"click",aftHandler);
}




function preHandler(){

    function preOrder(node){
        if(node!=null){
            divList.push(node);
            preOrder(node.firstElementChild);
            preOrder(node.lastElementChild);
        }

    }

    reset();
    preOrder(treeRoot);
    render();

}

function cerHandler(){

    function cerOrder(node){
        if(node!=null){
            cerOrder(node.firstElementChild);
            divList.push(node);
            cerOrder(node.lastElementChild);
        }

    }

    reset();
    cerOrder(treeRoot);
    render();

}

function aftHandler(){

    function aftOrder(node){
        if(node!=null){
            aftOrder(node.firstElementChild);
            aftOrder(node.lastElementChild);
            divList.push(node);
        }

    }
    reset();
    aftOrder(treeRoot);
    render();
}


function render(){
    var i = 0;
    divList[i].style.backgroundColor = 'blue'
    timer = setInterval(function (argument) {
        i++;
        if (i < divList.length) {
            divList[i-1].style.backgroundColor = '#fff';
            divList[i].style.backgroundColor = 'blue';
        } else {
            clearInterval(timer);
            divList[divList.length-1].style.backgroundColor = '#fff';
        }
    },500)
}

//初始化样式
function reset() {
    divList = [];
    clearInterval(timer);
    var divs = $('div');
    for (var i = 0; i < divs.length; i++) {
        divs[i].style.backgroundColor = '#fff';
    }
}

init();