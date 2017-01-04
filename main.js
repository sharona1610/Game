var indexOfShape=0
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
  console.log('Assign shape - selected shape : ',selected_shape);
  console.log('length of selected shape ',selected_shape.length);
  var length= selected_shape.length;
 for (var i = 0; i <length; i++) {
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

     if(!((a+selected_shape[indexOfShape].length)>20)){
       console.log('timer function - selected shape : '+selected_shape);
       console.log('length of selected shape '+selected_shape.length);
       for(var j=selected_shape[0].length-1;j>=0;j--){
         var i=selected_shape.length-1;
        //  if(($('#'+(a+i+1)+'_'+(b+j)).html())==='0' && ($('#'+(a+i)+'_'+(b+j)).html())==='0'){
        //    //console.log('entered');
        //    counter.push(true)
         //}
         if((($('#'+(a+i+1)+'_'+(b+j)).html())==='1' && ($('#'+(a+i)+'_'+(b+j)).html())==='0')){
           counter.push(true)
         }
         else if((($('#'+(a+i+1)+'_'+(b+j)).html())==='0')){
           counter.push(true)
         }
         else{
           counter.push(false)
         }
       }
       //console.log(counter);
       if(counter.every(checkForCondition)){
         for (var i = selected_shape.length-1; i >=0; i--) {
           for(var j=selected_shape[0].length-1;j>=0;j--){
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
         //indexOfShape=0
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
       //indexOfShape=0
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
     lineComplete()

   },500)
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
  var line_shape=[[1,1,1,1]]
  var t_shape = [[1,1,1],[0,1,0]]
  var l_shape = [[1,1,1],[0,0,1]]
  var z_shape = [[1,1,0],[0,1,1]]
  var box_shape=[[1,1],[1,1]]
  var inverse_z_shape = [[0,1,1],[1,1,0]]
  var inverse_l_shape = [[0,0,1],[1,1,1]]

  // var line_shape=[[[1,1,1,1]],[[1],[1],[1],[1]]]
  // var t_shape = [[[1,1,1],[0,1,0]],[[0,1],[1,1],[0,1]],[[0,1,0],[1,1,1]],[[1,0],[1,1],[1,0]]]
  // var l_shape = [[[1,1,1],[0,0,1]],[[0,1],[0,1],[1,1]],[[0,0,1],[1,1,1]],[[1,1],[1,0],[1,0]]]
  // var z_shape = [[[1,1,0],[0,1,1]],[[0,1],[1,1],[1,0]]]
  // var box_shape=[[[1,1],[1,1]]]
  // var inverse_z_shape = [[[0,1,1],[1,1,0]],[[1,0],[1,1],[0,1]]]
  // var inverse_l_shape = [[[0,0,1],[1,1,1]],[[1,0],[1,0],[1,1]],[[1,1,1],[1,0,0]],[[1,1],[0,1],[0,1]]]

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
    //  console.log(selected_shape);
    //  console.log(selected_shape[indexOfShape]);
    //  console.log(selected_shape[indexOfShape].length);
    //  console.log('index of shape' +indexOfShape);
     selected_shape= rotate(selected_shape)
   }
 })

 // function rotate(){
 //   var max_index=(selected_shape.length-1)
 //   var selected_shapeBeforeRotate = selected_shape[indexOfShape]
 //   var indexBeforeRotate = indexOfShape
 //   var lengthBeforeRotate = selected_shape[indexOfShape].length
 //   var widthBeforeRotate = selected_shape[indexOfShape][0].length
 //   console.log('max index '+max_index);
 //   if(indexOfShape===max_index){
 //     indexOfShape=0
 //   }
 //   else{
 //     indexOfShape++
 //   }
 //   if(selected_shape[indexOfShape].length<lengthBeforeRotate){
 //     var diff = lengthBeforeRotate-selected_shape[indexOfShape].length
 //     for(var i=1;i<=diff;i++){
 //       for(var j=0;j<widthBeforeRotate;j++)
 //       if(selected_shapeBeforeRotate[indexBeforeRotate][lengthBeforeRotate-i][j]==='1'){
 //         ('#'+(a+selected_shape[indexOfShape].length-1+i)+'_'+(b+j)).html(0)
 //       }
 //     }
 //   }
 //
 //   if(selected_shape[indexOfShape][0].length<widthBeforeRotate){
 //     var diff= widthBeforeRotate-selected_shape[indexOfShape][0].length
 //     for(var i=0;i<lengthBeforeRotate;i++){
 //       for(var j=1;j<=diff;j++){
 //         if(selected_shapeBeforeRotate[indexBeforeRotate][i][widthBeforeRotate-j]==='1'){
 //           ('#'+(a+i)+'_'+(b+selected_shape[indexOfShape][0].length-1+j)).html(0)
 //         }
 //       }
 //     }
 //   }
 // }

 function rotate(selected_shape){
   var newArray = []

   for(var i = 0; i < selected_shape[0].length; i++){
        newArray.push([]);
    };

    for(var i = 0; i < selected_shape.length; i++){
        for(var j = 0; j < selected_shape[i].length; j++){
            newArray[j].push(selected_shape[i][j]);
        };
    };
    //  for(var i = 0; i < selected_shape[0].length; i++){
    //    var temp=newArray[i][0]
    //    newArray[i][0]=newArray[i][2]
    //    newArray[i][2]=temp;
    //  };
     for(var i = 0; i < newArray.length; i++){
       newArray[i].reverse()
     };
     if(selected_shape.length>newArray.length){
       var diff=selected_shape.length-newArray.length
       for(var i=1;i<=diff;i++){
         for(var j=0;j<selected_shape[0].length;j++){
           $('#'+(a+newArray.length-1+i)+'_'+(b+j)).html(0)
         }
       }
     }
     if(selected_shape[0].length>newArray[0].length){
       var diff = selected_shape[0].length-newArray[0].length
       for(var i=0;i<selected_shape.length;i++){
         for(var j=1;j<=diff;j++){
           $('#'+(a+i)+'_'+(b+newArray[0].length-1+j)).html(0)
         }
       }
     }

    return(newArray);
}

//=================================
//Movement
//=================================

$('html').keydown(function(x){
  if(x.keyCode===39){
    var right = b+selected_shape[0].length+1
    if(!(right>12)){
      b+=1
      $('#'+(a)+'_'+(b-1)).html(0)
      $('#'+(a+1)+'_'+(b-1)).html(0)
      $('#'+(a+2)+'_'+(b-1)).html(0)
    }
  }
})

$('html').keydown(function(x){
  if(x.keyCode===37){
    if(!((b-1)<0)){
    b-=1
    $('#'+(a)+'_'+(b+selected_shape[0].length)).html(0)
    $('#'+(a+1)+'_'+(b+selected_shape[0].length)).html(0)
    $('#'+(a+2)+'_'+(b+selected_shape[0].length)).html(0)
    }
  }
})


//===================================
//scoring
//====================================
var score = 0
var scoreCounter=[]
function lineComplete(){
  function checkForCondition(element){
    return element===true
  }

  for(var i=0;i<boardArray.length;i++){
    for(var j=0;j<boardArray[i].length;j++){
      if($('#'+i+'_'+j).html()==='1'){
        scoreCounter.push(true)
      }
      else{
        scoreCounter.push(false)
      }
    }
    if(scoreCounter.every(checkForCondition)){

      score+=100
      deleteRow(i)
      $('.score').html(score)
    }

  //  console.log(score);
  //  console.log(scoreCounter);
        scoreCounter=[]
  }
}

function deleteRow(index){
  for(var i=0;i<boardArray[index].length;i++){
    $('#'+index+'_'+i).html(0)
  }
}




//======
