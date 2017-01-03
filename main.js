
//Board creation
var boardArray=[]
function createBoard(height, width){
  for (var i=0;i<height;i++){
    boardArray.push(new Array(width).fill(0))
  }
}

createBoard(20,12)

for (var i = 0; i < boardArray.length; i++) {
  for(var j=0;j<boardArray[i].length;j++){
    $('#'+i+'_'+j).html(boardArray[i][j])
  }
}


function assignShape(selected_shape){
 for (var i = 0; i < selected_shape.length; i++) {
   for(var j=0;j<selected_shape[i].length;j++){
     $('#'+i+'_'+j).html(selected_shape[i][j])
   }
 }
}

shapeSelector()
assignShape(selected_shape)

var timeout;
var a=0;
var b=0;
var counter = [];

 function timer(){
   timeout =  setInterval(function(){
     if((a+1)!==18){
       for(var j=selected_shape.length-1;j>=0;j--){
         var i=selected_shape.length-1;
         if(($('#'+(a+i+1)+'_'+(b+j)).html())==='0' && ($('#'+(a+i)+'_'+(b+j)).html())==='0'){
           console.log('entered');
           counter.push(true)
         }
         else if((($('#'+(a+i+1)+'_'+(b+j)).html())==='1' && ($('#'+(a+i)+'_'+(b+j)).html())==='0')){
           counter.push(true)
         }
         else if((($('#'+(a+i+1)+'_'+(b+j)).html())==='0')){
           counter.push(true)
         }
         else{
           counter.push(false)
         }
       }
       console.log(counter);
       if(counter.every(checkForCondition)){
         for (var i = selected_shape.length-1; i >=0; i--) {
           for(var j=selected_shape.length-1;j>=0;j--){
             if((($('#'+(a+i+1)+'_'+(b+j)).html())==='1')&&(($('#'+(a+i)+'_'+(b+j)).html())==='0')){
               $('#'+(a+i)+'_'+(b+j)).html('0')
             }
             else{
               $('#'+(a+i+1)+'_'+(b+j)).html(selected_shape[i][j])
               $('#'+(a+i)+'_'+(b+j)).html('0')
             }



           }
         }
       }
       else{
         //Reset
         console.log("Else!!");
         shapeSelector()
         a=0;
         b=0;
         assignShape(selected_shape)
         clearInterval(timeout)
         timer()
         counter=[]
       }
       a+=1;

       function checkForCondition(element){
         return element===true
       }
     }
     else{
       shapeSelector()
       a=0;
       b=0;
       assignShape(selected_shape)
       clearInterval(timeout)
       counter=[]
       timer()
       //call new shape
     }
     colourBoard()

   },300)
 }
 timer()

function colourBoard(){
  for (var i = 0; i < boardArray.length; i++) {
    for(var j=0;j<boardArray[i].length;j++){
      if($('#'+(i)+'_'+(j)).html()==='1'){
        $('#'+(i)+'_'+(j)).css('background','pink')
      }
      else{
        $('#'+(i)+'_'+(j)).css('background','grey')
      }
    }
  }
}
//====================================
//Shapes
//====================================
var selected_shape
function shapeSelector(){
  var line_shape=[[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]]
  var t_shape = [[0,0,0],[1,1,1],[0,1,0]]
  var l_shape = [[1,1,1],[0,0,1],[0,0,0]]
  var z_shape = [[1,1,0],[0,1,1],[0,0,0]]
  var box_shape=[[1,1],[1,1]]
  var inverse_z_shape = [[0,1,1],[1,1,0],[0,0,0]]
  var inverse_l_shape = [[0,0,1],[1,1,1],[0,0,0]]

  var rand = Math.random()*6
  var temp = Math.round(rand)

  var shapes = [line_shape, t_shape, l_shape, z_shape, box_shape, inverse_z_shape, inverse_l_shape]
  selected_shape = shapes[temp]
}


 //====================================
//Rotate
//=====================================
 $('html').keydown(function(x){
   if(x.keyCode===38){
     selected_shape = rotate(selected_shape)
   }
 })

 function rotate(selected_shape){
   var newArray = []
   for(var i = 0; i < selected_shape.length; i++){
        newArray.push([]);
    };

    for(var i = 0; i < selected_shape.length; i++){
        for(var j = 0; j < selected_shape[i].length; j++){
            newArray[j].push(selected_shape[i][j]);
        };
    };
     for(var i = 0; i < selected_shape.length; i++){
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
    $('#'+(a)+'_'+(b-1)).html(0)
    $('#'+(a+1)+'_'+(b-1)).html(0)
    $('#'+(a+2)+'_'+(b-1)).html(0)
    }
})

$('html').keydown(function(x){
  if(x.keyCode===37){
    b-=1
    $('#'+(a)+'_'+(b+selected_shape.length)).html(0)
    $('#'+(a+1)+'_'+(b+selected_shape.length)).html(0)
    $('#'+(a+2)+'_'+(b+selected_shape.length)).html(0)
    }
})


//===================================
//scoring
//====================================
// function lineComplete(){
//   for(var i=0;i<boardArray.length;i++){
//     for(var j=0;j<boardArray[i].length;j++){
//       if($('#'+(i)+'_'+(j)).html()===1){
//
//       }
//     }
//
//   }
// }




//======
