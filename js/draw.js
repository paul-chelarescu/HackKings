var drawModule = (function () { 

  var bodySnake = function(x, y) {
        ctx.fillStyle = 'green';
        ctx.fillRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
        ctx.strokeStyle = 'darkgreen';
        ctx.strokeRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
  }

  var bodySnake2 = function(x, y) {
        ctx.fillStyle = 'blue';
        ctx.fillRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
        ctx.strokeStyle = 'darkblue';
        ctx.strokeRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
  }

  var pizza = function(x, y) {
        ctx.fillStyle = 'yellow';
        ctx.fillRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
        ctx.fillStyle = 'red';
        ctx.fillRect(x*snakeSize+1, y*snakeSize+1, snakeSize-2, snakeSize-2);
  }

  var scoreText = function() {
    var score_text = "Score: " + score;
    ctx.fillStyle = 'green';
    ctx.fillText(score_text, 100, h-5);
    ctx.font = "30px Helvetica";
  }

    var score2Text = function() {
        var score_text = "Score: " + score2;
        ctx.fillStyle = 'blue';
        ctx.fillText(score_text, 400, h-5);
        ctx.font = "30px Helvetica";
    }
  var drawSnake = function() {
      var length = 10;
      snake = [];
      for (var i = length-1; i>=0; i--) {
          snake.push({x:5, y:0});
      }
      snake2 = [];
      for (var i = length-1; i>=0; i--) {
          snake2.push({x:22, y:0});
      }
  }
    
  var paint = function()
  {
      ctx.fillStyle = 'lightgrey';
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = 'black';
      ctx.strokeRect(0, 0, w, h);

      btn.setAttribute('disabled', true);

      var snakeX = snake[0].x;
      var snakeY = snake[0].y;

      var snake2X = snake2[0].x;
      var snake2Y = snake2[0].y;

      if (direction == 'right') {
        snakeX++; }
      else if (direction == 'left') { 
        snakeX--; }
      else if (direction == 'up') { 
        snakeY--; 
      } else if(direction == 'down') { 
        snakeY++; }


      if (direction2 == 'right') {
          snake2X++; }
      else if (direction2 == 'left') {
          snake2X--; }
      else if (direction2== 'up') {
          snake2Y--;
      } else if(direction2 == 'down') {
          snake2Y++; }

      //Check whether the 2 snakes have collided with eachother
      if(checkCollision2(snake, snake2)) {
          //Restart the game
          btn.removeAttribute('disabled', true);
          ctx.clearRect(0,0,w,h);
          gameloop = clearInterval(gameloop);
         return;
      }


      if (snakeX == -1 || snakeX == w/snakeSize
          || snakeY == -1 || snakeY == h/snakeSize
          || checkCollision(snakeX, snakeY, snake)) {
          //restart game
          btn.removeAttribute('disabled', true);

          ctx.clearRect(0,0,w,h);
          gameloop = clearInterval(gameloop);
          return;          
        }

      if (snake2X == -1 || snake2X == w/snakeSize
          || snake2Y == -1 || snake2Y == h/snakeSize
          || checkCollision(snake2X, snake2Y, snake2)) {
          //restart game
          btn.removeAttribute('disabled', true);

          ctx.clearRect(0,0,w,h);
          gameloop = clearInterval(gameloop);
          return;
      }

        if(snakeX == food.x && snakeY == food.y)
        {
         //Create a new head instead of moving the tail
          var tail =
          {
            x: snakeX,  
            y: snakeY
          };
           score ++;
          createFood(); //Create new food
        } else {
          var tail = snake.pop(); //pops out the last cell
          tail.x = snakeX; 
          tail.y = snakeY;
        }
        //The snake can now eat the food.
        snake.unshift(tail); //puts back the tail as the first cell
        for(var i = 0; i < snake.length; i++) {
          bodySnake(snake[i].x, snake[i].y);
        }

        if(snake2X == food.x && snake2Y == food.y)
        {
            //Create a new head instead of moving the tail
            var tail2 =
            {
                x: snake2X,
                y: snake2Y
            };
            score2 ++;
            createFood(); //Create new food
        } else {
            var tail2 = snake2.pop(); //pops out the last cell
            tail2.x = snake2X;
            tail2.y = snake2Y;
        }
        //The snake can now eat the food.
        snake2.unshift(tail2); //puts back the tail as the first cell
         for(var i = 0; i < snake2.length; i++) {
            bodySnake2(snake2[i].x, snake2[i].y);
          }
          pizza(food.x, food.y);
          score2Text();
          scoreText();
  }

  var createFood = function() {
      food = {
        x: Math.floor((Math.random() * 28)),
        y: Math.floor((Math.random() * 28))
      }

      for(var i=0; i<snake.length; i++)
      {
        var snakeX = snake[i].x;
        var snakeY = snake[i].y;
      
        if(food.x===snakeX && food.y === snakeY 
            || food.y === snakeY && food.x===snakeX) {
          food.x = Math.floor((Math.random() * 28));
          food.y = Math.floor((Math.random() * 28));
        }
      }

      for(var i=0; i<snake2.length; i++)
      {
          var snake2X = snake2[i].x;
          var snake2Y = snake2[i].y;

          if(food.x===snake2X && food.y === snake2Y
              || food.y === snake2Y && food.x===snake2X) {
              food.x = Math.floor((Math.random() * 28));
              food.y = Math.floor((Math.random() * 28));
          }
      }
  }

  var checkCollision = function(x, y, array) {
      for(var i = 0; i < array.length; i++) {
        if(array[i].x === x && array[i].y === y)
        return true;
      } 
      return false;
  }

   var checkCollision2 = function(array, array2) {
        for(var i = 0; i < array.length; i++) {
          for(var j = 0; j < array2.length; j++) {
              if(array[i].x === array2[j].x && array[i].y == array2[j].y) {
                  return true;
              }
          }
        }
        return false;
  }

  var init = function(){
      direction = 'down';
      direction2 = 'down';
      drawSnake();
      createFood();
      gameloop = setInterval(paint, 500);
  }


    return {
      init : init
    };

    
}());
