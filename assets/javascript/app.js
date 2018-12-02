$(document).ready(function () {
    var options = [
        {
            question: "This band, who debuted in 2001, is comprised entirely of virtual members", 
            choice: ["Blur", "Gorillaz", "c418", "Black Eyed Peas"],
            answer: 1,
            photo: "assets/images/Gorillaz.jpg"
         },
         {
            question: "Who is the only member of ZZ Top without a beard??", 
            choice: ["Frank Beard", "Dusty Hill", "John Dyer", "Billy Gibbons"],
            answer: 0,
            photo: "assets/images/zztop.jpg"
         }, 
         {
            question: "What song did an ad agency want to use in a hemmorrhoids ad?", 
            choice: ["Backstreets Back", "Baby One More Time", "Ring of Fire", "Under the Bridge" ],
            answer: 2,
            photo: "assets/images/ringoffire.jpg"
        }, 
        {
            question: "What was the name of Nirvana's debut album?", 
            choice: ["Nevermind", "In Utero", "Bleach", "MTV Unplugged in New York" ],
            answer: 2,
            photo: "assets/images/nirvana.jpg"
        }, 
        {
            question: "What 2007 song by Kanye West heavily sampled Daft Punk?", 
            choice: ["Gold Digger", "American Boy", "Jesus Walks", "Stronger" ],
            answer: 3,
            photo: "assets/images/kanye.jpg"
        }, 
        {
            question: "It was such a good day, what did Ice Cube not have to use?", 
            choice: ["Money", "His AK", "The Toilet", "Social Media" ],
            answer: 1,
            photo: "assets/images/icecube.jpg"
        }, 
        {
            question: "Which R.E.M. song contains the line 'Offer me solutions, offer me alternatives and I decline'?", 
            choice: ["Everybody Hurts", "It's the End of the World as We Know It", "Shiny Happy People", "Losing My Religion" ],
            answer: 1,
            photo: "assets/images/rem.jpg"
        }, 
        {
            question: "Which video by The Smashing Pumpkins is made up entirely of still photography?", 
            choice: ["Thirty-Three", "Today", "Bullet with Butterfly Wings", "1979" ],
            answer: 0,
            photo: "assets/images/sp.jpg"
        }];
    
    var correctCount = 0;
    var wrongCount = 0;
    var unanswerCount = 0;
    var timer = 20;
    var intervalId;
    var userGuess ="";
    var running = false;
    var qCount = options.length;
    var pick;
    var index;
    var newArray = [];
    var holder = [];
    
    
    
    $("#reset").hide();
    //click start button to start game
    $("#start").on("click", function () {
            $("#start").hide();
            displayQuestion();
            runTimer();
            for(var i = 0; i < options.length; i++) {
        holder.push(options[i]);
    }
        })
    //timer start
    function runTimer(){
        if (!running) {
        intervalId = setInterval(decrement, 1000); 
        running = true;
        }
    }
    //timer countdown
    function decrement() {
        $("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
        timer --;
    
        //stop timer if reach 0
        if (timer === 0) {
            unanswerCount++;
            stop();
            $("#answerblock").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }	
    }
    
    //timer stop
    function stop() {
        running = false;
        clearInterval(intervalId);
    }
    //randomly pick question in array if not already shown
    //display question and loop though and display possible answers
    function displayQuestion() {
        //generate random index in array
        index = Math.floor(Math.random()*options.length);
        pick = options[index];
    
            $("#questionblock").html("<h2>" + pick.question + "</h2>");
            for(var i = 0; i < pick.choice.length; i++) {
                var userChoice = $("<div>");
                userChoice.addClass("answerchoice");
                userChoice.html(pick.choice[i]);
                //assign array position to it so can check answer
                userChoice.attr("data-guessvalue", i);
                $("#answerblock").append(userChoice);
    }
    
    
    
    //click function to select answer and outcomes
    $(".answerchoice").on("click", function () {
        //grab array position from userGuess
        userGuess = parseInt($(this).attr("data-guessvalue"));
    
        //correct guess or wrong guess outcomes
        if (userGuess === pick.answer) {
            stop();
            correctCount++;
            userGuess="";
            $("#answerblock").html("<p>Correct!</p>");
            hidepicture();
    
        } else {
            stop();
            wrongCount++;
            userGuess="";
            $("#answerblock").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }
    })
    }
    
    
    function hidepicture () {
        $("#answerblock").append("<img src=" + pick.photo + ">");
        newArray.push(pick);
        options.splice(index,1);
    
        var hidpic = setTimeout(function() {
            $("#answerblock").empty();
            timer= 20;
    
        //run the score screen if all questions answered
        if ((wrongCount + correctCount + unanswerCount) === qCount) {
            $("#questionblock").empty();
            $("#questionblock").html("<h3>Game Over!  Here's how you did: </h3>");
            $("#answerblock").append("<h4> Correct: " + correctCount + "</h4>" );
            $("#answerblock").append("<h4> Incorrect: " + wrongCount + "</h4>" );
            $("#answerblock").append("<h4> Unanswered: " + unanswerCount + "</h4>" );
            $("#reset").show();
            correctCount = 0;
            wrongCount = 0;
            unanswerCount = 0;
    
        } else {
            runTimer();
            displayQuestion();
    
        }
        }, 3000);
    
    
    }
    
    $("#reset").on("click", function() {
        $("#reset").hide();
        $("#answerblock").empty();
        $("#questionblock").empty();
        for(var i = 0; i < holder.length; i++) {
            options.push(holder[i]);
        }
        runTimer();
        displayQuestion();
    
    })
    
    })