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
var matchList = [];
timer=null;

function init(){
    var btn = document.getElementsByTagName("input");
    var preBtn = btn[0];
    var cerBtn = btn[1];
    var aftBtn = btn[2];
    var serBtn = btn[3];

    addHandler(preBtn,"click",preHandler);
    addHandler(cerBtn,"click",cerHandler);
    addHandler(aftBtn,"click",aftHandler);
    addHandler(serBtn,"click",serHandler);
}




function preHandler(){

    function preOrder(node){
        if(node!=null){
            divList.push(node);
            for(var i =0 ;i<node.children.length;i++){
                preOrder(node.children[i]);
            }
        }

    }

    reset();
    preOrder(treeRoot);
    render();

}

function cerHandler(){

    function cerOrder(node){
        if(node!=null){
            for(var i =0 ;i<node.children.length;i++){
                divList.push(node.children[i]);
            }

            for(var i =0 ;i<node.children.length;i++){
                cerOrder(node.children[i]);
            }
        }

    }

    reset();
    divList.push(treeRoot);
    cerOrder(treeRoot);
    render();

}

function aftHandler(){

    function preOrder(node){
        if(node!=null){
            divList.push(node);
            if(node.innerHTML===$("#ser")){
                matchList.push(node);
            }
            for(var i =0 ;i<node.children.length;i++){
                preOrder(node.children[i]);

            }
        }

    }

    reset();
    preOrder(treeRoot);
    render1();
}



function serHandler(){

    function cerOrder(node){
        if(node!=null){
            for(var i =0 ;i<node.children.length;i++){
                divList.push(node.children[i]);
                if(node.children[i].innerHTML.indexOf($("#ser").value)>=0){
                    matchList.push(node.children[i]);
                }
            }

            for(var i =0 ;i<node.children.length;i++){
                cerOrder(node.children[i]);
            }
        }

    }

    reset();
    divList.push(treeRoot);
    cerOrder(treeRoot);
    render1();

}


function render(){
    var i = 0;
    divList[i].style.backgroundColor = 'blue';
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

function render1(){
    var i = 0;
    divList[i].style.backgroundColor = 'blue';
    timer = setInterval(function (argument) {
        i++;
        if (i < divList.length) {

            if(divList[i-1].style.backgroundColor==='blue'){
                divList[i-1].style.backgroundColor = '#fff';
            }
            if(matchList.some(function(item,index){
                return item===divList[i];
            })){
                divList[i].style.backgroundColor = 'red';
            }else{
                divList[i].style.backgroundColor = 'blue';
            }
        } else {
            clearInterval(timer);
            divList[divList.length-1].style.backgroundColor = '#fff';
        }
    },500)
}

//初始化样式
function reset() {
    divList = [];
    matchList=[];
    clearInterval(timer);
    var divs = $('div');
    for (var i = 0; i < divs.length; i++) {
        divs[i].style.backgroundColor = '#fff';
    }
}

init();