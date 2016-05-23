/**
 * Created by xiaosong on 2016/5/23.
 */
var createTag=(function(){
    function _tag(input,output,button){
        var number;

        this.getNumber = function(){
            return number;
        }

        this.setNumber= function(number){
            this.number= number;
        }

        this.input=document.getElementById(input);
        this.output= document.getElementsByClassName(output)[0];
        this.button = document.getElementById(button);

        this.getData = function(){
            switch (input){
                case 'tag':
                    var  value = this.input.value.match(/(^[^,\， ]*)/)[0];
                    break;
                case 'hobby':
                default :
                    var value = this.input.value.trim().split(/,|，|、|\s|\n|\r|\t/);
            }
            return value;
        };

        this.render= function(value){
            if(value===''||value===','||value==="，"){
                return;
            }
            var wrap = document.createElement("div");
            wrap.textContent=value;
            this.output.appendChild(wrap);
            number++;
        }

        this.setNumber(0);
        this.button?this.init('buttonEvent'):this.init('keyEvent');
    }

    _tag.prototype={
        repeatData:function(data){
            for(var i =0; i<this.output.children.length;i++){
                if(this.output.children[i].textContent.localeCompare(data)===0){
                    this.input.value="";
                    this.setNumber(this.output.children.length);
                    return true;
                }
            }
        },

        delData:function(element){
            this.output.removeChild(element);
            this.setNumber(this.getNumber()-1);
        },

        init:function(type){
            var self = this;
            this.output.addEventListener("mouseover",function(event){
                event.target.textContent ="删除"+event.target.textContent;
            });

            this.output.addEventListener("mouseout",function(event){
                event.target.textContent=event.target.textContent.replace(/删除/,'');
            });

            this.output.addEventListener("click",function(event){
                self.delData(event.target);
            });

            switch (type){
                case 'keyEvent':
                    document.addEventListener('keyup',function(event){
                        if(/(,|，)$/.test(self.input.value)||event.keyCode===13){
                            self.repeatData(self.getData().trim())||self.render(self.getData().trim());
                            self.input.value='';

                        }
                    })
                    break;
                case 'buttonEvent':
                    document.addEventListener('click',function(event){
                        for(var i =0; i<self.getData().length;i++){
                            self.repeatData(self.getData[i])||self.render(self.getData()[i]);
                            self.input.value='';

                        }
                    });
                    break;
            }
        }
    };
    return _tag;
})();
var tag = new createTag("tag","tagContainer");
var hobby = new createTag("hobby","hobbyContainer","confirm")