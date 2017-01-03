
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
var counter = [];
 function timer(){
   timeout =  setInterval(function(){
     if((a+1)!==18){
       for(var j=2;j>=0;j--){
         var i=2;
         console.log(($('#'+(a+i+1)+'_'+(b+j)).html()));
         console.log(a+'+'+i)
         console.log(b+'+'+j);
         if((($('#'+(a+i+1)+'_'+(b+j)).html())==='1' && ($('#'+(a+i)+'_'+(b+j)).html())=== '0')
         || (($('#'+(a+i+1)+'_'+(b+j)).html())==='0')
          || (($('#'+(a+i+1)+'_'+(b+j)).html())==='0' && ($('#'+(a+i)+'_'+(b+j)).html())==='0')){
           console.log('entered');
           counter.push(true)
         }
         else{
           counter.push(false)
         }
       }
       console.log(counter);
       if(counter.every(checkForCondition)){
         for (var i = 2; i >=0; i--) {
           for(var j=2;j>=0;j--){
            // if(($('#'+(a+i+1)+'_'+(b+j)).html())!=1){
            //    $('#'+(a+i+1)+'_'+(b+j)).html(tshape[i][j])
            //    $('#'+(a+i)+'_'+(b+j)).html('0')
            //    if(tshape[i][j]===1){
            //      $('#'+(a+i+1)+'_'+(b+j)).css('background','blue')
            //    }
             //}
             if((($('#'+(a+i+1)+'_'+(b+j)).html())==='1')&&(($('#'+(a+i)+'_'+(b+j)).html())==='0')){
               $('#'+(a+i)+'_'+(b+j)).html('0')
             }
             else{
               $('#'+(a+i+1)+'_'+(b+j)).html(tshape[i][j])
               $('#'+(a+i)+'_'+(b+j)).html('0')
             }
             if(tshape[i][j]===1){
                 $('#'+(a+i+1)+'_'+(b+j)).css('background','blue')
               }
           }
         }
       }
       else{
         //Reset
         console.log("Else!!");
         tshape=[[0,0,0],[1,1,1],[0,1,0]]
         a=0;
         b=0;
         assignShape(tshape)
         clearInterval(timeout)
         timer()
         counter=[]
       }
       $('#'+(a+i+1)+'_'+(b)).html(0).css('background','grey')
       $('#'+(a+i+1)+'_'+(b+1)).html(0).css('background','grey')
       $('#'+(a+i+1)+'_'+(b+2)).html(0).css('background','grey')
       $('#'+(a+i+1)+'_'+(b-1)).html(0).css('background','grey')
       $('#'+(a+i+1)+'_'+(b+3)).html(0).css('background','grey')
       a+=1;

       function checkForCondition(element){
         return element===true
       }
     }
     else{
       tshape=[[0,0,0],[1,1,1],[0,1,0]]
       a=0;
       b=0;
       assignShape(tshape)
       clearInterval(timeout)
       counter=[]
       timer()
       //call new shape
     }
   },1000)
 }
 timer()



 //====================================
//Rotate
//=====================================
 $('html').keydown(function(x){
   if(x.keyCode===38){
     tshape = rotate(tshape)
   }
 })

 function rotate(tshape){
   var newArray = []
   for(var i = 0; i < tshape.length; i++){
        newArray.push([]);
    };

    for(var i = 0; i < tshape.length; i++){
        for(var j = 0; j < tshape[i].length; j++){
            newArray[j].push(tshape[i][j]);
        };
    };
     for(var i = 0; i < tshape.length; i++){
       var temp=newArray[i][0]
       newArray[i][0]=newArray[i][2]
       newArray[i][2]=temp;
     };

    return(newArray);
}

//=================================
//Movement
//=================================

$('html').keydown(function(x){
  if(x.keyCode===39){
    b+=1
    }
})

$('html').keydown(function(x){
  if(x.keyCode===37){
    b-=1
    }
})





//======


      //    ($('#'+(a+i+1)+'_'+(b+j)).html())!==1) {
      //      counter.push(true)
      //  }
      //  else{
      //    counter.push(false)
      //  }

      //  if(counter.every(checkForCondition)){
      //    for (var i = 2; i >=0; i--) {
      //      for(var j=2;j>=0;j--){
      //        if(($('#'+(a+i+1)+'_'+(b+j)).html())!=1){
      //          $('#'+(a+i+1)+'_'+(b+j)).html(tshape[i][j])
      //          $('#'+(a+i)+'_'+(b+j)).html('0')
      //         //  console.log(a+i);
      //         //  console.log(b+j);
      //          if(tshape[i][j]===1){
      //            $('#'+(a+i+1)+'_'+(b+j)).css('background','blue')
      //          }
      //        }
      //  }
      //  for(var i=0;i<3;i++){
      //    $('#'+a+'_'+b).html(0)
      //    $('#'+a+'_'+b).css('background','grey')
      //    b++
      //  }
      //  a+=2
      //  b-=3}



      // (($('#'+(a+i+1)+'_'+(b+j)).html())===1 && ($('#'+(a+i)+'_'+(b+j)).html())=== 0) ||
