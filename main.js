// function board(){
//   var y= $('.box').position().top
//   var x=$('.box').position().left
//   console.log(x);
// }
// board()
//
// var tshape = [0,0,0,1,1,1,0,1,0]
// for(var i=0;i<tshape.length;i++){
//   if(tshape[i]===1){
//       $('#t'+(i+1)).css('background','blue')
//     }
//   }
//   console.log(i);
//   var timeout;
// //
// // function timer(){
// //   timeout =  setInterval(function(){
// //       var temp= $('.t').position()
// //       $('.t').css('top', temp.top+10)
// //   },1000)
// // }
// // timer()
//
// function angleCalc(){
//   var angle1 = $('.t').css('-webkit-transform')
//   console.log(angle1);
//   if(angle1 !== 'none') {
//     var values = angle1.split('(')[1].split(')')[0].split(',');
//     var a = values[0];
//     var b = values[1];
//     return angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
//   }
//   else{
//     return angle=0;
//   }
// }
//
// $('html').keydown(function(x){
//   if(x.keyCode===38){
//     var angle = angleCalc();
//     angle+=90
//     console.log(angle);
//     $('.t').css('transform','rotate('+angle+'deg)')
// }})


//Board creation
var boardArray=[]
function createBoard(width, height){
  for (var i=0;i<width;i++){
    boardArray.push(new Array(height).fill(0))
  }
}

createBoard(20,12)

for (var i = 0; i < boardArray.length; i++) {
  for(var j=0;j<boardArray[i].length;j++){
    $('#'+i+'_'+j).html(boardArray[i][j])
  }
}
console.log($('#0_0').html());
 var tshape=[[0,0,0],[1,1,1],[0,1,0]]
 console.log(tshape);

 function assignShape(tshape){
   for (var i = 0; i < tshape.length; i++) {
     for(var j=0;j<tshape[i].length;j++){
       $('#'+i+'_'+j).html(tshape[i][j])
     }
   }
 }
 assignShape(tshape)
var timeout;
var a=0;
var b=0;
 function timer(){
   timeout =  setInterval(function(){
     if((a+1)!==19){
     for (var i = 0; i < tshape.length; i++) {
       for(var j=0;j<tshape[i].length;j++){
         $('#'+a+'_'+b).html(tshape[i][j])
         if(tshape[i][j]===1){
           $('#'+a+'_'+b).css('background','blue')
         }
         b++
       }
       a++
       b-=3
     }
     a-=4;
     for(var i=0;i<3;i++){
       $('#'+a+'_'+b).html(0)
       $('#'+a+'_'+b).css('background','grey')
       b++
     }
     a+=2
     b-=3}
     else{
       clearInterval(timeout)
     }
   },1000)
 }
 timer()
