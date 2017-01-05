var indexOfShape=0
var timeout=0;
var a=0;
var b=5;
var selected_shape
var counter = [];
var back = new Audio('back-music.wav')
var level=1
var speed=500
var prev_score = 0;
back.play()
back.volume = 0.05
back.loop = true;

function checkForCondition(element){
  return element===true
}
//============================
//Board creation
//============================
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

//==============================
//Making and assigning shapes
//=================================

function assignShape(selected_shape){
  var newSound = new Audio('fall.wav')
  newSound.play()
  var length= selected_shape.length;
  for (var i = 0; i <length; i++) {
   for(var j=5;j<selected_shape[i].length;j++){
     $('#'+i+'_'+j).html(selected_shape[i][j])
   }
  }
}

function shapeSelector(){
  var line_shape=[[1,1,1,1]]
  var t_shape = [[1,1,1],[0,1,0]]
  var l_shape = [[1,1,1],[0,0,1]]
  var z_shape = [[1,1,0],[0,1,1]]
  var box_shape=[[1,1],[1,1]]
  var inverse_z_shape = [[0,1,1],[1,1,0]]
  var inverse_l_shape = [[0,0,1],[1,1,1]]

  var temp = Math.round(Math.random()*6)
  var shapes = [line_shape, t_shape, l_shape, z_shape, box_shape, inverse_z_shape, inverse_l_shape]
  selected_shape = shapes[temp]
}

shapeSelector()
assignShape(selected_shape)

//============================
//timer
//==============================

 function timer(){
   timeout =  setInterval(function(){
     if(!((a+selected_shape.length)>20)){
       for(var j=selected_shape[0].length-1;j>=0;j--){
         var i=selected_shape.length-1;
         if((($('#'+(a+i+1)+'_'+(b+j)).html())==='1' && ($('#'+(a+i)+'_'+(b+j)).html())==='0')){
           console.log('first');
           counter.push(true)
         }
         else if((($('#'+(a+i+1)+'_'+(b+j)).html())==='0')){
           console.log('second');
           counter.push(true)
         }
         else if((($('#'+(a+i+1)+'_'+(b+j)).html())==='1') && (($('#'+(a+i)+'_'+(b+j)).html())==='1') && (selected_shape[selected_shape.length-1][j]==='0')){
           console.log('l shape');
           counter.push(true)
         }
         else{
           console.log('false');
           counter.push(false)
         }
       }
       if(counter.every(checkForCondition)){
         for (var i = selected_shape.length-1; i >=0; i--) {
           for(var j=selected_shape[0].length-1;j>=0;j--){
             if(!((($('#'+(a+i+1)+'_'+(b+j)).html())==='1')&&(($('#'+(a+i)+'_'+(b+j)).html())==='0'))){
               $('#'+(a+i+1)+'_'+(b+j)).html(selected_shape[i][j])
               $('#'+(a+i)+'_'+(b+j)).html('0')
             }
           }
         }
       }
       else{
         if(a!=1){
         shapeSelector()
         a=0;
         b=5;
         assignShape(selected_shape)
         clearInterval(timeout)
         timer()
         counter=[]
        }
        else{
         clearInterval(timeout)
         $('.score').html('Game over')
         var gameOver = new Audio('over.wav')
         gameOver.play()
         back.pause()
        }
       }
       a+=1;
       for(var j=0;j<boardArray.length;j++){
         $('#'+(0)+'_'+(j)).html('0')
       }
     }
     else{
       if(!(a===1)){
         shapeSelector()
         a=0;
         b=5;
         assignShape(selected_shape)
         clearInterval(timeout)
         timer()
         counter=[]
       }
       else{
         clearInterval(timeout)
         $('.score').html('Game over')
         var gameOver = new Audio('over.wav')
         gameOver.play()
         back.pause()
       }
     }
     colourBoard()
     lineComplete()
   },speed)
 }

 timer()

//======================
//Colour boardArray
//===================

function colourBoard(){
  for (var i = 0; i < boardArray.length; i++) {
    for(var j=0;j<boardArray[i].length;j++){
      if($('#'+(i)+'_'+(j)).html()==='1'){
        var color = ['#ff0099', '#f3f315', '#83f52c', '#ff6600', '#6e0dd0']
        var rand = Math.random()*4
        var temp = Math.round(rand)
        $('#'+(i)+'_'+(j)).css('background',color[temp])
      }
      else{
        $('#'+(i)+'_'+(j)).css('background','rgba(0,0,0,0.5 )')
      }
    }
  }
}


 //====================================
//Rotate
//=====================================
 $('html').keydown(function(x){
   if(x.keyCode===38){
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
   var collisionCounter=[]
   var fallSound = new Audio('boing.wav')
   fallSound.play()
   for(var i = 0; i < selected_shape[0].length; i++){
        newArray.push([]);
    };
    for(var i = 0; i < selected_shape.length; i++){
        for(var j = 0; j < selected_shape[i].length; j++){
            newArray[j].push(selected_shape[i][j]);
        };
    };
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
   else if(newArray.length>selected_shape.length){
       var diff=newArray.length-selected_shape.length
       for(var i=1;i<=diff;i++){
         for(var j=0;j<newArray[0].length;j++){
           if($('#'+(a+selected_shape.length-1+i)+'_'+(b+j))==='1'){
             console.log("collision");
             collisionCounter.push(false)
           }
           else{
             collisionCounter.push(true)
           }
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
     else if(newArray[0].length>selected_shape[0].length){
       var diff=newArray[0].length-selected_shape[0].length
       for(var i=0;i<newArray.length;i++){
         for(var j=1;j<=diff;j++){
           if($('#'+(a+i)+'_'+(b+selected_shape[0].length-1+j))==='1'){
             console.log('collision');
             collisionCounter.push(false)
           }
           else{
             collisionCounter.push(true)
           }
         }
       }
     }
     if(collisionCounter.every(checkForCondition)){
      return newArray
     }
     else{
       return selected_shape
     }
}

//=================================
//Movement
//=================================

$('html').keydown(function(x){
  if(x.keyCode===39){
    var right = b+selected_shape[0].length
    var collisionCounter=[]
    for(var i=0;i<selected_shape.length;i++){
      if($('#'+(a+i)+'_'+(b+selected_shape[0].length)).html()==='1'){
        collisionCounter.push(false)
      }
      else{
        collisionCounter.push(true)
      }
    }
    if(!(right>11)){
      if(collisionCounter.every(checkForCondition)){
        b+=1
        for(var i=0;i<selected_shape.length;i++){
        $('#'+(a+i)+'_'+(b-1)).html(0)
        }
      }
    }
  }
})

$('html').keydown(function(x){
  if(x.keyCode===37){
    var collisionCounter=[]
    for(var i=0;i<selected_shape.length;i++){
      if($('#'+(a+i)+'_'+(b-1)).html()==='1'){
        collisionCounter.push(false)
      }
      else{
        collisionCounter.push(true)
      }
    }
    if(!((b-1)<0)){
      if(collisionCounter.every(checkForCondition)){
        b-=1
        for(var i=0;i<selected_shape.length;i++){
          $('#'+(a+i)+'_'+(b+selected_shape[0].length)).html(0)
        }
      }
    }
  }
})


//===================================
//scoring
//====================================
var score = 0
var scoreCounter=[]
function lineComplete(){
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
      var clearSound = new Audio('clear1.wav')
      clearSound.play()
      var x=0;
      var progressTimer = setInterval(function(){
        var curVal = document.getElementById('progress').value
        document.getElementById('progress').value=curVal+2
        if(++x===50){
          clearInterval(progressTimer)
          x=0;
          if(score-prev_score===200){
            document.getElementById('progress').value=0
            prev_score=score
          }
        }
      },100)
      if(score-prev_score===200){
        level++
        $('.level').html(level)
        speed-=100;
      }
      deleteRow(i)
      $('.score').html(score)
    }
    scoreCounter=[]
  }
}

function deleteRow(index){
  for(var i=index;i>0;i--){
    for(var j=0;j<boardArray[0].length;j++){
      $('#'+i+'_'+j).html($('#'+(i-1)+'_'+j).html())
    }
  }
shapeSelector()
assignShape(selected_shape)
}

//======
