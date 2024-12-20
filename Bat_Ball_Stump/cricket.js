let score;
    let scoreStr = localStorage.getItem('Score');
    resetScore(scoreStr);

    function resetScore(scoreStr){
      score = scoreStr ? JSON.parse(scoreStr) : {
        win : 0,
        lost : 0,
        tie : 0,
      };

      resetField();
    } 

    function resetField(){
      document.querySelector('#YourChoice').innerHTML = "";
      document.querySelector('#CompChoice').innerHTML = "";
      document.querySelector('#FinalResult').innerHTML = ""
      document.querySelector('#txt_Score').innerHTML = `Won : ${score.win}  Lost : ${score.lost}  Tie : ${score.tie}`;
    }

    function yourChoice(choice){

      if(choice === "BAT"){
        document.querySelector('#YourChoice').innerHTML = "You choose Bat";
      }
      if(choice === "BALL"){
        document.querySelector('#YourChoice').innerHTML = "You choose Ball";
      }
      if(choice === "STUMP"){
        document.querySelector('#YourChoice').innerHTML = "You choose Stump";
      }
      return choice;
    }
    
    function generateComputerChoice(){
      let CompChoice;
      let randomNum = Math.random() * 3
      if(randomNum > 0 && randomNum <= 1){
        // compChoice = "BAT";
        document.querySelector('#CompChoice').innerHTML = "Computer choose BAT";
        return "BAT";
      }else if(randomNum > 1 && randomNum <= 2){
        // compChoice = "BALL";
        document.querySelector('#CompChoice').innerHTML = "Computer choose BALL";
        return "BALL";
      }else {
        //compChoice = "STUMP";
        document.querySelector('#CompChoice').innerHTML = "Computer choose STUMP";
        return "STUMP";
      }
    }

    function finalResult(compChoice,myChoice){
      if(compChoice === "BALL"){
        if(myChoice ==="BALL"){
          document.querySelector('#FinalResult').innerHTML = "Match Tie...!"
          score.tie++;
        }else if(myChoice === "BAT"){
          document.querySelector('#FinalResult').innerHTML = "You Win....!"
          score.win++;
        }else if(myChoice === "STUMP"){
          document.querySelector('#FinalResult').innerHTML = "Computer Win....!"
          score.lost++;
        }
      }else if(compChoice === "BAT"){
        if(myChoice ==="BALL"){
          document.querySelector('#FinalResult').innerHTML = "Computer Win....!"
          score.lost++;
        }else if(myChoice === "BAT"){
          document.querySelector('#FinalResult').innerHTML = "Match Tie...!"
          score.tie++;
        }else if(myChoice === "STUMP"){
          document.querySelector('#FinalResult').innerHTML = "You Win....!"
          score.win++;
        }
      }else if(compChoice === "STUMP"){
        if(myChoice ==="BALL"){
          document.querySelector('#FinalResult').innerHTML = "You Win....!"
          score.win++;
        }else if(myChoice === "BAT"){
          document.querySelector('#FinalResult').innerHTML = "Computer Win....!"
          score.lost++;
        }else if(myChoice === "STUMP"){
          document.querySelector('#FinalResult').innerHTML = "Match Tie...!"
          score.tie++;
        }
      }   
    }

    function scoreDisplay(){
      localStorage.setItem('Score', JSON.stringify(score));
      document.querySelector('#txt_Score').innerHTML = `Won : ${score.win}  Lost : ${score.lost}  Tie : ${score.tie}`;
    }