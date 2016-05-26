/**
 * Created by Administrator on 2016/5/25.
 */

 //通用事件处理函数对象

var EventUtil={
    addHandler:function(element,type,handler){
        if(element.addEventListener){
            element.addEventListener(type,handler,false);
        }else if(element.attachEvent){
            element.attachEvent("on"+type,handler);
        }else{
            element["on"+type]=handler;
        }
    },

    removeHandler:function(element,type,handler){
        if(element.removeEventListener){
            element.removeEventListener(type,handler);
        }else if(element.detachEvent){
            element.detachEvent("on"+type,handler);
        }else{
            element["on"+type]=null;
        }
    },

    getTarget:function(event){
        return event.getSrcElement||event.target;
    },

    stopPropagation:function(event){
        if(event.stopPropagation){
            event.stopPropagation();
        }else{
            event.cancelBubble = true;
        }
    }
};

