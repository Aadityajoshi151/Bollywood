const electron = require('electron')        //Required
const path = require('path')                //Required for HTML file
const {remote} = require('electron')        //Used for minimize and close functions
const { shell } = require('electron')
const BrowserWindow = electron.remote.BrowserWindow     

const checkbtn = document.getElementById('check');    //Used for invoking check button function
const proceedbtn = document.getElementById('butt');   //Used for invoking proceed button function

document.getElementById('close').addEventListener('click',closeWindow);       //Used for invoking close function
document.getElementById('minimize').addEventListener('click',minimizeWindow); //Used for invoking minimize  function
document.getElementById('openlist').addEventListener('click',openList);

function closeWindow()
{
  var window = remote.getCurrentWindow();             //Close Window Function
  window.close();
}
function minimizeWindow()
{
  var window = remote.getCurrentWindow();             //Minimize Window Function
  window.minimize();
}
function openList()
{
    shell.openExternal('https://en.wikipedia.org/wiki/Lists_of_Bollywood_films')
}

var movie,original;
var array1,array2,mod;
var used="";    
var rightused="";              
var ch,i,win;
var n=0,chance=9,o=0;  
var timeLeft;       
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

proceedbtn.addEventListener('click',function(event){              //When proceed button is clicked
    
    movie = document.getElementById("movieinput").value;
    movie = movie.toUpperCase();                                //Everything is converted to upper case because it looks good     
    if (movie=="")                                              //Condition if no movie is entered
    {
        return;
    }
    else
    {
        original=movie;                                      
        array1=movie;
        movie=movie.replace(/ /g,"/");          //Spaces replaced with '/'
        mod=movie;
        mod=mod.split('');                      //Converted from string to array
        movie=movie.replace(/[bcdfghjklmnpqrstvwxyz0123456789]/ig,"-");     //Consonants and numbers replaced with '-'
        array2=movie.split('');                 //Converted from string to array
         
    timeLeft = document.getElementById("timelimit").value;
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

        
    document.getElementById("mainlabel").innerHTML=array2;
    document.getElementById("movieinput").disabled=true;
    document.getElementById("butt").disabled=true;
    document.getElementById("toggle").disabled=true;
    document.getElementById("charinput").disabled=false;
    document.getElementById("check").disabled=false;
    document.getElementById("again").disabled=false;
    document.getElementById("timelimit").disabled=true;

    var elem = document.getElementById('timeleft');
    
    var timerId = setInterval(countdown, 1000);
    
    function countdown() {
      if (timeLeft == -1) {
        clearTimeout(timerId);
        Swal({              //TIME-UP alert with play again request
            type: 'error',
            title: 'Time Up!',
            text: 'The Correct Movie Was - '+original,
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            cancelButtonText: "Quit Game",
            confirmButtonText: 'Play Again',            
            }).then((result) => {
                if (result.value) {
                  location.reload();
                }
                else{
                    close();
                }
              })
        return;
      } else 
      {
        if(timeleft == 999)
        {
            elem.innerHTML = "Time Left";
        }
        else
        { 
          elem.innerHTML = timeLeft + ' seconds remaining';
          timeLeft--;
        }
      
      }
      
        
      
    }


    for(i=0;i<array1.length;i++)              //Used for searching numbers in the movie title
    {
        if(array1[i]=='1' || array1[i]=='2' || array1[i]=='3' || array1[i]=='4' || array1[i]=='5' || array1[i]=='6' || array1[i]=='7' || array1[i]=='8' || array1[i]=='9' || array1[i]=='0')
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
var input = document.getElementById("movieinput");            //Enter key control for proceed button
input.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
      document.getElementById("butt").click();
    }
  });
  var charinput = document.getElementById("charinput");       //Enter key control for check button
  charinput.addEventListener("keyup", function(event) {
      event.preventDefault();
      if (event.keyCode === 13) {
        document.getElementById("check").click();
      }
    });

function checkletter()                  //check function (IMPORTANT)
{
    ch = document.getElementById('charinput').value;
    ch = ch.toUpperCase();              //Entered character converted to upper case

    if(ch=="")                          //Condition if no character entered
    {
        return;
    }
    if(ch==" ")
    {
        document.getElementById('charinput').value = '';
        return;
    }
    if(ch=='A' || ch=='E' || ch=='I' || ch=='O' || ch=='U')   //Condition if a vowel is entered
    {
        Swal({
            title: 'VOWEL',
            text: 'You Cannot Use Vowels.Vowels Are Already Displayed',
            type: 'info',
        })
        document.getElementById('charinput').value = '';     //Character input textbox cleared for next character
        return;
    }
    o = used.search(ch);
    if(o!=-1)                   //Condition where the entered character is already used
    {
        Swal({
            title: 'USED',
            text: 'You Have Already Tried That Letter Once And It Does Not Belong To The Movie',
            type: 'info',
        })
        document.getElementById('charinput').value = '';    //Character input textbox cleared for next character
        return;
    }
    o = rightused.search(ch);
    if(o!=-1)                   //Condition where the entered character is correct and already used
    {
        Swal({
            title: 'USED',
            text: 'You Have Already Tried That Letter Once And It Belongs To The Movie',
            type: 'info',
        })
        document.getElementById('charinput').value = '';    //Character input textbox cleared for next character
        return;
    }
    n = original.search(ch);            //Character searched in the original where no changes are made
    if(n==-1)                           //Condition where the entered character is not found
    {
        if(chance<=0)           //Condition where no more chances are left (Losing Condition)
        {
            timeleft=999;
            Swal({              //LOST alert with play again request
                type: 'error',
                title: 'You Lost!',
                text: 'The Correct Movie Was - '+original,
                showCancelButton: true,
                confirmButtonColor: '#DD6B55',
                cancelButtonText: "Quit Game",
                confirmButtonText: 'Play Again',            
                }).then((result) => {
                    if (result.value) {
                      location.reload();
                    }
                    else{
                        close();
                    }
                  })
            return;
        }
        chance--;                           //Decrement in chances
        document.getElementById("chances").innerHTML=chance;    //Show remaining chances
        Swal({               //Wrong guess alert
            title: 'Oops',
            text: 'That Letter Does Not Belong To The Movie',
            type: 'error',
            timer: 1000
        })
        document.getElementById('charinput').value = '';     //Character input textbox cleared for next character
        used+=(ch+",");                                      //Wrong guessed letter added to used string
        document.getElementById("used").innerHTML=used;      //Show used letters
    }
    else
    {
        Swal({           //Right guess alert
            title: 'Very Good',
            text: 'That Letter Belongs To The Movie',
            type: 'success',
            timer: 1000
        })
        rightused+=(ch+",");  
        document.getElementById('charinput').value = '';     //Character input textbox cleared for next character
        win=0;
        for(i=0;i<array1.length;i++)       //Used to replace '-' with correct letter 
        {
            if(array1[i]==ch)                 
            {
                array2[i]=ch;
            }
        } 
        for(i=0;i<mod.length;i++)         //Used to check the winning condition
        {
            if(mod[i]==array2[i])
            {
                win++;
            }
        }       
        if(win==array2.length)         //WIN condition
        {
            timeleft=999;
            Swal({                  //WIN alert with play again request 
                type: 'success',
                title: 'You Won!',
                text: 'You Guessed The Correct Movie',
                showCancelButton: true,
                confirmButtonColor: '#DD6B55',
                cancelButtonText: "Quit Game",
                confirmButtonText: 'Play Again',
                }).then((result) => {
                    if (result.value) {
                      location.reload();
                    }
                    else{
                        close();
                    }
                  })
        } 
        document.getElementById("mainlabel").innerHTML=array2;   //Showing the movie (mainlabel)
    }
}
function playAgain()                     //Play again button (physical button)
{
    Swal({
        type: 'question',
        title: 'Are You Sure You Want To Leave This Game?',
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        cancelButtonText: "No",
        confirmButtonText: 'Yes',
        }).then((result) => {
            if (result.value) {
              location.reload();
            }
          })
}
