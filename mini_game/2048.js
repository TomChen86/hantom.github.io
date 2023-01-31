console.log(parseInt(""));
const BLANK = " ";
//格子雛形
function Brick() {
    this.ABCnode = document.createTextNode(BLANK);
    this.node = document.createElement("div");
    this.node.setAttribute("class","brick");
    this.node.appendChild(this.ABCnode);
}
//設置格子中數值
Brick.prototype.setBrick = function(i) {
    this.ABCnode.nodeValue = i;
    this.node.setAttribute("class", "brick brick"+i)
}
//取得格子中數值
Brick.prototype.getBrick = function() {
    return this.ABCnode.nodeValue;
}
//每次移動後，隨機產生數字
function randomTile() {
    let aTmp = [], i;
    for(i=0; i<16; i++) {
       if(aBrick[i].getBrick()===BLANK) aTmp.push(i)
    }

    if(aTmp.length == 0) return false;
    else {
        do {i = Math.floor(Math.random()*aTmp.length);
        } while(aBrick[i].getBrick() !=BLANK)
        aBrick[i].setBrick(Math.random()<0.8?2:4);
        return true;
    }
}
//創造出十六個位置
let aBrick=[];
let container = document.getElementById("container")
for (let i=0; i<16; i++) {
    aBrick.push(new Brick());
    container.appendChild(aBrick[i].node) ;
}
//初始兩個隨機位置數
randomTile();
randomTile();
//主要程式
function run(e) {
    let full = false;
    //上下左右移動，和對應之機制
    switch (e.code) {
    case "ArrowLeft":
        for (let i=0; i<16; i++) {
            if(i%4 !=0) {
                if((aBrick[i].getBrick()) !== BLANK) {
                    for (let j=i; j>i-(i%4); j--) {
                        if(!blockChange(-1, j)) break;
                    }
                }
            } 
        }
        randomTile();
        break;
    case "ArrowRight":
        for (let i=15; i>=0; i--) {
            if(i%4 !=3) {
                if((aBrick[i].getBrick()) !== BLANK) {
                    for (let j=i; j<i-(i%4)+3; j++) {
                        if(!blockChange(1, j)) break;
                    }
                } 
            }
        }
        randomTile();
        break;
    case "ArrowUp":
        for (let i=4; i<16; i++) {
            if((aBrick[i].getBrick()) !== BLANK) {
                for (let j=i; j>3; j-=4) {
                    if(!blockChange(-4, j)) break;
                }
            } 
        }
        randomTile();
        break;
    case "ArrowDown":
        for (let i=11; i>=0; i--) {
            if((aBrick[i].getBrick()) !== BLANK) {
                for (let j=i; j<12; j+=4) {
                    if(!blockChange(4, j)) break;
                }
            }   
        }
        randomTile();
        break;
    }
    //確認是否全滿
    var empty =0;
    for(let i=0; i<16; i++) {
        if(aBrick[i].getBrick() == BLANK) empty=empty+1;
        console.log(empty);
    }
    if(empty==0) full=true;
    //全滿則輸，否則判斷是否到達2048
   if(!full) {
        for (let i=0; i<16; i++) {
            if(parseInt(aBrick[i].getBrick()) >= 2048) {
                window.removeEventListener("keydown",run,false);
                console.log("Congradulation!");
                break;
            }
        }
    } else{
            window.removeEventListener("keydown",run,false);
            alert("Game Over")
        }
    //每個移動所造成的函數
    function blockChange(move, begin) {
        if(aBrick[begin+move].getBrick() == BLANK) {
            aBrick[begin+move].setBrick(aBrick[begin].getBrick());
            aBrick[begin].setBrick([BLANK])
            gameover = false;
            return true;
        } else if (aBrick[begin+move].getBrick() === aBrick[begin].
        getBrick()) {
            aBrick[begin+move].setBrick(parseInt(aBrick[begin+move].
                getBrick())*2);
                aBrick[begin].setBrick([BLANK])
                gameover = false;
                return false;
        } else {return false;}
    }
}
window.addEventListener("keydown",run,false)