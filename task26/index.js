/**
 * Created by Administrator on 2016/5/25.
 */
/**
 * 分析：这个系统中总共可以分为三个角色：
 * 消息发送者--指挥官；
 * 消息转播者：中介系统；
 * 消息接受者：飞船
 *
 * 指挥官 和 中介系统 应该是在系统开始就初始化。
 * 飞船应该是在中介系统收到指挥官的创建命令时创建
 *
 * 指挥官应该只有发送功能
 *
 * 飞船应该用发送和接受两个功能
 *
 * 飞船有动力系统（充电和放电） 创建和销毁
 *
 *
 *
 * 实体：1 指挥官 2 中介 3 飞船 4 消息 5 控制台
 */

/**
 * 按钮句柄
 * @param commander
 */

var buttonHandler = function(commander){
    var id = null;
    var cmd = null;
    var btn = document.getElementsByClassName("btn");
    for(var i = 0 ;i<btn.length;i++){
        EventUtil.addHandler(btn[i],"click",function(){
            var cmdName = this.getAttribute("name");

            //下面几行是将第几个飞船获取到
            var childs= this.parentNode.parentNode.childNodes;
            var child= this.parentNode;
            id=(function(){
                var  returnIndex=0;
                for(var index=0;index<childs.length;index++){

                    if(child===childs[index]){
                        return returnIndex;
                    }
                    if(childs[index].nodeType===1){
                        returnIndex++;
                    }
                }
            })();

            cmd= cmdName;

            var message = new Message(id,cmd);
            commander.send(message)
        });
    }

};



//消息实体
var  Message = function (target,command){
    this.id=target;
    this.cmd=command;
}


//指挥官实体
var Sender = function(mediator){
    this.name = "lxs";
    this.mediator=mediator;
};

Sender.prototype= {
    send:function(command){
//        var success = Math.random() > 0.3 ? true : false;
        if(1){
            console.log("this.mediator.receive(command);");
            this.mediator.receive(command);
        }else{
            console.log(this.name+"发送命令失败");
        }

    }
};

//中介者实体

var Mediator = function(){
    this.name = "中介";
    this.spaceships=[];
};

Mediator.prototype= {
    send:function(){

    },
    receive:function(command){
        var success = Math.random() > 0.3 ? true : false;
        if(1){
            if(command.cmd==="launch"){
                console.log("中介者接收函数：发送明码");
                 this.create(command);
            }else{
                console.log("中介者接收函数：其它命令");
                this.spaceships[command.id].receive(command);
            }
        }else{
            console.log(this.name+"接收命令失败");
        }

    },

    create:function(command){
        var spaceship = new Spaceship(command.id);
        this.spaceships.push(spaceship);
        console.log("创建飞船成功");
    }
}


//飞船实体
var Spaceship = function(id){
    this.id = id;
    this.power = 100;
    this.currState = "stop";
    this.deg=0;
};

Spaceship.prototype= {

    receive: function (command) {
        if (command.id === this.id && command.cmd !== this.currState) {
            this.StateManager().changeState(command.cmd);
        }

    }
};

Spaceship.prototype.StateManager=function(){
    var self = this;
    var states={
        fly: function(state) {
            self.currState = "fly";
//            self.dynamicManager().fly();
//            self.powerManager().discharge();
            console.log( self.currState);
        },
        stop: function(state) {
            self.currState = "stop";
//            self.dynamicManager().stop();
//            self.powerManager().charge();
            console.log( self.currState);
        },
        destroy: function(state) {
            self.currState = "destroy";
//            AnimUtil.destroy(self.id);
//            self.mediator.remove(self);
            console.log( self.currState);
        }
    };

    var changeState = function(state) {
        //implement the state command accordingly
        states[state]();
//        ConsoleUtil.show("Spaceship No." + self.id + " state is " + state);
    };

    return {
        changeState: changeState
    };


};

function init(){
    var mediator = new Mediator();
    var sender = new  Sender(mediator);
    buttonHandler(sender);
}

init();