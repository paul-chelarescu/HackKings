(function (window, document, drawModule, undefined) {

var btn = document.getElementById('btn');
btn.addEventListener("click", function(){ drawModule.init();});

document.onkeydown = function(event){

        keyCode = window.event.keyCode; 
        keyCode = event.keyCode;

        switch(keyCode) {
        
        case 37: 
          if (direction != 'right') {
            direction = 'left';
          }
          console.log('left'); 
          break;

        case 39:
          if (direction != 'left') {
          direction = 'right';
          console.log('right');
          }
          break;

        case 38:
          if (direction != 'down') {
          direction = 'up';
          console.log('up');
          }
          break;

        case 40:
          if (direction != 'up') {
          direction = 'down';
          console.log('down');
          }
          break;
          

        case 65:
          if (direction2 != 'right'){
            direction2 = 'left';
            console.log('left');
          }
          break
          

        case 68:
          if (direction2 != 'left'){
            direction2 = 'right';
            console.log('right');
          }
          break
           

        case 87:
        if (direction2 != 'down'){
          direction2 = 'up';
          console.log('up');
        }
        break;
          
          
        case 83:
          if (direction2 != 'up'){
            direction2 = 'down';
            console.log('down');
          }
          break
            
      }
}})(window, document, drawModule);
