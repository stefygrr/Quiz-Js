const questions = [
    {
        question: "Qual é a função do método 'parseInt()' em Javascript?",
        answers: [
            {text: "Converte uma string em um número inteiro.", correct: true},
            {text: "Converte um número inteiro em uma string.", correct: false},
            {text: "Arredonda um número para inteiro mais próximo.", correct: false},
            {text: "Retorna o valor de ponto flutuante de uma string.", correct: false},

        ]
    },
    {
        question: "Qual é a função do JavaScript em uma página da web?",
        answers: [
            {text: "Controlar a estrutura e o estilo da página.", correct: false},
            {text: "Ajudar a criar layouts responsivos.", correct: false},
            {text: "Adicionar interatividade e dinamismo à página.", correct: true},
            {text: "Definir a hierarquia dos elementos HTML.", correct: false},

        ]
    },
    {
        question: "O que é uma variável em JavaScript?",
        answers: [
            {text: "Uma palavra-chave reservada para declarações de função.", correct: false},
            {text: "Um valor que nunca muda durante a execução do programa.", correct: false},
            {text: "Um tipo especial de dado usado para representar texto.", correct: false},
            {text: "Um nome simbólico para armazenar dados.", correct: true},

        ]
    },
    {
        question: "O que é um operador de atribuição em JavaScript?",
        answers: [
            {text: "Um operador usado para adicionar dois valores.", correct: false},
            {text: "Um operador usado para atribuir um valor a uma variável.", correct: true},
            {text: "Um operador usado para comparar dois valores.", correct: false},
            {text: "Um operador usado para declarar uma função.", correct: false},

        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Próximo"
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer);
    });
}


function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect")
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block"; 
}

function showScore(){
    resetState();
    questionElement.innerHTML = `Sua pontuação foi ${score} de ${questions.length}!`;
    nextButton.innerHTML = "Jogar novamente?";
    nextButton.style.display = "block";
}


function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}


nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})


startQuiz();