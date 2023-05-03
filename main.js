const quizData = {
    questions: [
      {
        question: "Where was Manuel Belgrano born?",
        answers: ["USA", "France", "Argentina", "UK"],
        correctAnswer: "Argentina"
      },
      {
        question: "What is the capital of Spain?",
        answers: ["Madrid", "Barcelona", "Seville", "Valencia"],
        correctAnswer: "Madrid"
      },
      {
        question: "What is the most abundant material on earth?",
        answers: ["Magnesium", "Oxygen", "Potassium", "Sodium"],
        correctAnswer: "Oxygen"
      }
    ]
  };
  
  // Storage part
  localStorage.setItem('quizData', JSON.stringify(quizData));
  
  const storedQuizData = JSON.parse(localStorage.getItem('quizData'));
  
  //song 
  const song = new Audio('./mariobros.mp3');
  
  function createQuiz(data, showQuestionFunc, showScoreFunc) {
    const container = document.querySelector('#container');
    let score = 0;
    let questionNumber = 0;
  
    function showQuestion() {
      const question = document.createElement('h2');
      question.textContent = data.questions[questionNumber].question;
      container.appendChild(question);
  
      const answers = document.createElement('div');
      data.questions[questionNumber].answers.forEach(answer => {
        const answerButton = document.createElement('button');
        answerButton.textContent = answer;
        answerButton.addEventListener('click', () => {
          if (answer === data.questions[questionNumber].correctAnswer) {
            score++;
          }
          questionNumber++;
          if (questionNumber < data.questions.length) {
            container.innerHTML = '';
            showQuestionFunc();
          } else {
            container.innerHTML = '';
            showScoreFunc();
          }
        });
        answers.appendChild(answerButton);
      });
      container.appendChild(answers);
    }
  
    function showScore() {
      const scoreDisplay = document.createElement('p');
      scoreDisplay.textContent = `Your final score is ${score}/${data.questions.length}`;
      container.appendChild(scoreDisplay);
  
      if (score === data.questions.length) {
        song.play();
      }
    }
  
    return function() {
      showQuestionFunc = showQuestionFunc || showQuestion;
      showScoreFunc = showScoreFunc || showScore;
  
      showQuestionFunc();
    }
  }
  
  const startQuiz = createQuiz(storedQuizData);
  startQuiz();