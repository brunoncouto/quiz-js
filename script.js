const question = document.querySelector(".question");
const answers = document.querySelector(".answers");
const spnQtd = document.querySelector(".spnQtd");
const textFinish = document.querySelector(".finish span");
const content = document.querySelector(".content");
const contentFinish = document.querySelector(".finish");
const btnRestart = document.querySelector(".finish button");

import questions from "./questions.js";

var currentIndex = 0;
var questionsCorrect = 0;

// btnRestart: ao clicar no botão Restart a class "content" recebe o display flex,
// ao passo que a class "finish" passa a ficar escondida;
// os indices "currentIndex" e "questionsCorrect" são zerados;
// É feito a chamada da função loadQuestion();
btnRestart.onclick = () => {
    content.style.diplay = "flex";
    contentFinish.style.display = "none";

    currentIndex = 0;
    questionsCorrect = 0;
    loadQuestion();
}

// Ao ser inicializada, a função verifica se a alternativa clicada contém o atributo true em seu corpo no "questions.js";
// Sendo a resposta correta, o indice questionCorrect é incrementado em 1;
// Após a função verifica se a questão atual é menor que a extensão do arquivo "questions.js";
// Em caso positivo, incrementa o indice currentIndex e chama a próxima questão;
// Em caso negativo, chama-se a funçãp finish
function nextQuestion(event){
    if (event.target.getAttribute("data-correct") === "true") {
        questionsCorrect = questionsCorrect + 1;

    }
    if (currentIndex < questions.length - 1) {
        currentIndex++ ;
        loadQuestion();
    }else{
        finish()
    }
}

// Essa função cria um elemento HTML que traz a quantidade de acertos sobre a quantidade de questões;
// Atribui display: none à class content e atribui display: flex à class finsih, que passa a exibir o botão Restart;
function finish() {
    textFinish.innerHTML= `Você acertou ${questionsCorrect} de ${questions.length}`;
    content.style.display = "none";
    contentFinish.style.display = "flex";
}

// Inicialmente ela cria um contador, que irá mostrar o nº da questão atual e a quantidade total de questões;
// Através do innerHTML se cria novos elementos na página, que serão responsáveis em mostrar o quiz ao usuário;
// Essa função percorre o arquivo 'questions.js' que contém os objetos com a pergunta e alternativas, inserindo-os na página;
// A cada clique em uma alternativa é feita a chamada da função nextQuestion();
function loadQuestion() {
    spnQtd.innerHTML = `${currentIndex + 1}/${questions.length}`;
    const item = questions[currentIndex];
    answers.innerHTML = "";
    question.innerHTML = item.question;

    item.answers.forEach((answer) =>{
        const div = document.createElement("div");

        div.innerHTML = `
        <button class = "answer" data-correct="${answer.correct}">
            ${answer.option}
        </button>
        `;

        answers.appendChild(div);
    });

    document.querySelectorAll(".answer").forEach((item) =>{
        item.addEventListener("click", nextQuestion);
    });
}

loadQuestion();