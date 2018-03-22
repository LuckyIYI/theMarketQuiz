(function() {
  var questions = [{
    question: "Что бы вы выбрали",
    choices: ["fake", "original"],
    correctAnswer: "fake",
    photos: ["gucci.jpg", "prada.jpg" ]
  }, {
    question: "Хм..",
    choices: ["fake", "original"],
    correctAnswer: "fake",
    photos: ["lv.jpg", "offwhite.jpg"]
  }, {
    question: "Правая выглядит достаточно круто",
    choices: ["fake", "original"],
    correctAnswer: "fake",
    photos:  ["lv.jpg", "offwhite.jpg"]
  }, {
    question: "Бла бла",
    choices: ["fake", "original"],
    correctAnswer: "fake",
    photos:  ["lv.jpg", "offwhite.jpg"]
  }, {
    question: "бла бла",
    choices: ["fake", "original"],
    correctAnswer: "fake",
    photos:  ["lv.jpg", "offwhite.jpg"]
  }];
  questions = shuffle(questions);
  
  addClickable();
  $('#start').hide();
  
  
  var questionCounter = 0; //Tracks question number
  var selections = []; //Array containing user choices
  var quiz = $('#quiz'); //Quiz div object
  var answer = "";
  
  
  function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}
  

  // Display initial question
  displayNext();

  // Click handler for the 'next' button
    
  function addClickable() {
  $('.chosenImage').on('click', function (e) {
    answer = $( this ).attr("value");
     e.preventDefault();
	  
    // Suspend click listener during fade animation
    if(quiz.is(':animated')) {
      return false;
    }
    choose();

      questionCounter++;
      displayNext();
  });
  }


  // Click handler for the 'Start Over' button
  $('#start').on('click', function (e) {
    e.preventDefault();

    if(quiz.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    $('#start').hide();
  });



  // Creates and returns the div that contains the questions and
  // the answer selections
  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });

    var header = $('<h2>' + (index + 1)+ ' / ' + questions.length + ':</h2>');
    qElement.append(header);

    var question = $('<p>').append(questions[index].question);
    qElement.append(question);

    var image = createImages(index);
    qElement.append(image);

    return qElement;
  }

  // Creates a list of the answer choices as radio inputs
  function createImages(index) {
    var radioList = $('<div class = "inline-block">');
    var item;
    var input = '';
    let imgIndex = questionCounter;
    
    for (var i = 0; i < questions[index].choices.length; i++) {
      
      input = '<img id = "next" class ="chosenImage" src=' + questions[index].photos[i] + ' width="240" height="240" value= ' + questions[index].choices[i] + ' >';
      radioList.append(input);
    }
    return radioList;
  }

  // Reads the user selection and pushes the value to an array
  function choose() {
    selections[questionCounter] = answer;
  }

  // Displays next requested element
  function displayNext() {
    quiz.fadeOut(function() {
      $('#question').remove();

      if(questionCounter < questions.length){
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        addClickable();
        if (!(isNaN(selections[questionCounter]))) {
          $('.chosenImage').attr("value").prop('checked', true);
        }
        
      }else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('.chosenImage').hide();
        $('#prev').hide();
        $('#start').show();
      }
    });
  }

  // Computes score and returns a paragraph element to be displayed
  function displayScore() {
    var score = $('<p>',{id: 'question', class: 'outputResult'});

    var numCorrect = 0;
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] === questions[i].correctAnswer) {
        numCorrect++;
      }
    }
    var result = resultDiscription(numCorrect);

    score.append( ' Вы ответили на ' + numCorrect + ' из  ' +
                 questions.length + ' вопросов. ' + result);
    return score;
  }
  
  function resultDiscription(numOfRightAnswers) {
   switch (numOfRightAnswers) {
  case 1: 
  case 2:
    return 'Ууу...';
  case 3: 
  case 4:
    return  'Пойдет';
  case 5: 
    return 'Вау!';
  default:
    return "Упс";
}
    
  }
})();
