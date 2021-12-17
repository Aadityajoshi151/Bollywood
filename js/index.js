const checkbtn = document.getElementById('check');    //Used for invoking check button function
const proceedbtn = document.getElementById('btn');   //Used for invoking proceed button function
const openlistbtn = document.getElementById('openlistbtn'); // Used for open wikipedia list page
const timelimit = document.getElementById("timelimit");
const mainlabel = document.getElementById("mainlabel");
const btn = document.getElementById("btn");
const check =  document.getElementById("check");
const chances = document.getElementById("chances");
var movie,original;
var array1,array2,mod;
var used="";    
var rightused="";              
var ch,i,win;
var n=0,chance=8,o=0;  
var timeLeft;
const numbers = ['1','2','3','4','5','6','7','8','9','0'];       
const vowels = ['A','E','I','O','U'];
 /*
 array1 & original have the movie name without any change.
 array2 & movie have the movie name with dashes.
 mod has the movie name with only spaces modified.
 used is an empty string for storing used letters.
 n stores the index of entered character present in the movie when searched.
 o stores the index of entered character present in the used string when searched.
 i handles the for loops.
 ch stores the character entered by the player.
 win is incremented every time when the guess is correct. When win=length of movie,player wins.
  */
openlistbtn.addEventListener('click',() => {window.open('https://en.wikipedia.org/wiki/Lists_of_Bollywood_films', '_blank').focus();})
//When proceed button is clicked
proceedbtn.addEventListener('click',function(event){              
    movie = document.getElementById("movieinput").value;
    //Everything is converted to upper case because it looks good and avoids case confusion
    movie = movie.toUpperCase();
    //Condition if no movie is entered
    if (movie=="")
        return;
    else if (movie.match(/[^AEIOU]/gi) == null)
    {
        Swal({              
            type: 'error',
            title: 'No Consonant',
            text: 'There Must Be Consonants Present In The Movie Name',
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'OK',         
            })
            return;
    }
    else
    {
        original=movie;                                      
        array1=movie;
        //Spaces replaced with '/'
        movie=movie.replace(/ /g,"/");
        mod=movie;
        //Converted from string to array
        mod=mod.split('');
        //Consonants and numbers replaced with '-'
        movie=movie.replace(/[bcdfghjklmnpqrstvwxyz0123456789]/ig,"_");
        //Converted from string to array
        array2=movie.split('');
         
    timeLeft = timelimit.value;
    if(timeLeft<10 || timeLeft>300)
    {
        Swal({              
            type: 'error',
            title: 'Invalid Input',
            text: 'The Time Limit Must Be In The Range 10-300 Seconds',
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'OK',         
            })
            return;
    }    
    mainlabel.innerHTML=array2.join(" ");
    document.getElementById("movieinput").disabled=true;
    btn.disabled=true;
    document.getElementById("toggle").disabled=true;
    document.getElementById("charinput").disabled=false;
    check.disabled=false;
    document.getElementById("again").disabled=false;
    timelimit.disabled=true;

    var elem = document.getElementById('timeleft');
    var timerId = setInterval(countdown, 1000);
    
    function countdown() {
      if (timeLeft == -1) {
        clearTimeout(timerId);
        //TIME-UP alert with play again request
        Swal({
            type: 'error',
            title: 'Time Up!',
            text: 'The Correct Movie Was - '+original,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Play Again',            
            }).then((result) => {
                if (result.value)
                  location.reload();
              })
        return;
      } else 
      {
        if(timeleft == 999)
            elem.innerHTML = "Time Left";
        else
        { 
          elem.innerHTML = timeLeft + ' seconds remaining';
          timeLeft--;
        }
      } 
    }
    //Used for searching numbers in the movie title
    for(i=0;i<array1.length;i++)
    {
        if(numbers.includes(array1[i]))
        {
            Swal({
                title: 'Hint',
                text: 'This Movie Title Contains Numbers',
                type: 'info',
            })
            break;
        }
    }
    }  
})
//Enter key control for proceed button
var input = document.getElementById("movieinput");
input.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13)
      bt.click();
  });
//Enter key control for check button
var charinput = document.getElementById("charinput");
  charinput.addEventListener("keyup", function(event) {
      event.preventDefault();
      if (event.keyCode === 13)
        check.click();
    });
//check function (IMPORTANT)
function checkletter()
{
    ch = document.getElementById('charinput').value;
    //Entered character converted to upper case
    ch = ch.toUpperCase();
    //Condition if no character entered
    if(ch=="")
        return;
    if(ch==" ")
    {
        document.getElementById('charinput').value = '';
        return;
    }
    //Condition if a vowel is entered
    if(vowels.includes(ch))
    {
        Swal({
            title: 'VOWEL',
            text: 'You Cannot Use Vowels.Vowels Are Already Displayed',
            type: 'info',
        })
        //Character input textbox cleared for next character
        document.getElementById('charinput').value = '';
        return;
    }
    o = used.search(ch);
    //Condition where the entered character is already used
    if(o!=-1)
    {
        Swal({
            title: 'USED',
            text: 'You Have Already Tried That Letter Once And It Does Not Belong To The Movie',
            type: 'info',
        })
        //Character input textbox cleared for next character
        document.getElementById('charinput').value = '';
        return;
    }
    o = rightused.search(ch);
    //Condition where the entered character is correct and already used
    if(o!=-1)
    {
        Swal({
            title: 'USED',
            text: 'You Have Already Tried That Letter Once And It Belongs To The Movie',
            type: 'info',
        })
        //Character input textbox cleared for next character
        document.getElementById('charinput').value = '';
        return;
    }
    //Character searched in the original where no changes are made
    n = original.search(ch);
    //Condition where the entered character is not found
    if(n==-1)
    {
        //Condition where no more chances are left (Losing Condition)
        if(chance<=0)
        {
            timeleft=999;
            //LOST alert with play again request
            Swal({
                type: 'error',
                title: 'You Lost!',
                text: 'The Correct Movie Was - '+original,
                confirmButtonColor: '#DD6B55',
                confirmButtonText: 'Play Again',            
                }).then((result) => {
                    if (result.value)
                      location.reload();
                  })
            return;
        }
        //Decrement in chances
        chance--;
        //Show remaining chances
        if (chance>0)
            chances.innerHTML=chance+1; 
        else
            chances.innerHTML="Last Chance!"; 
        //Wrong guess alert
        Swal({
            title: 'Oops',
            text: 'That Letter Does Not Belong To The Movie',
            type: 'error',
            timer: 1000
        })
        //Character input textbox cleared for next character
        document.getElementById('charinput').value = '';
        //Wrong guessed letter added to used string
        used+=(ch+",");
        //Show used letters
        document.getElementById("used").innerHTML=used;
    }
    else
    {
        //Right guess alert
        Swal({
            title: 'Very Good',
            text: 'That Letter Belongs To The Movie',
            type: 'success',
            timer: 1000
        })
        rightused+=(ch+",");
        //Character input textbox cleared for next character
        document.getElementById('charinput').value = '';
        win=0;
        //Used to replace '-' with correct letter
        for(i=0;i<array1.length;i++)
        {
            if(array1[i]==ch)                 
                array2[i]=ch;
        }
        //Used to check the winning condition
        for(i=0;i<mod.length;i++)
        {
            if(mod[i]==array2[i])
                win++;
        }
        //WIN condition     
        if(win==array2.length)
        {
            timeleft=999;
            //WIN alert with play again request
            Swal({
                type: 'success',
                title: 'You Won!',
                text: 'You Guessed The Correct Movie - '+original,
                confirmButtonColor: '#DD6B55',
                confirmButtonText: 'Play Again',
                backdrop: 
                `
                rgb(123,0,18,0.3)
                url("/assets/Fireworks.gif")

                `
                }).then((result) => {
                    if (result.value)
                      location.reload();
                  })
        }
        //Showing the movie (mainlabel)
        mainlabel.innerHTML=array2.join(" ");
    }
}
//Play again button (physical button)
function playAgain()
{
    Swal({
        type: 'question',
        title: 'Are You Sure You Want To Leave This Game?',
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        cancelButtonText: "No",
        confirmButtonText: 'Yes',
        }).then((result) => {
            if (result.value)
              location.reload();
          })
}
