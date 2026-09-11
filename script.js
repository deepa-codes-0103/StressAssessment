function startAssessment() {
    alert("Welcome! The assessment will begin soon.");
}

function getHelp() {
    alert("Please contact the appropriate emergency or support service.");
}
function goToConsent() {

    window.location.href = "consent.html";

}


function continueAssessment() {

    var agree = document.getElementById("agree");

    var continueBox = document.getElementById("continue");


    if (agree.checked && continueBox.checked) {

        window.location.href = "assessment.html";

    }

    else {

        alert("Please read and agree to both statements.");

    }

}
function previousQuestion() {

    alert("This is the first question.");

}


function nextQuestion() {

    var answer = document.querySelector(
        'input[name="answer"]:checked'
    );


    if (answer == null) {

        alert("Please select an answer.");

    }

    else {

        alert("Answer saved. Moving to the next question.");

    }

}
var questions = [

    "How often have you felt nervous, anxious, or on edge recently?",

    "How often have you felt overwhelmed by your thoughts or feelings?",

    "How often have you had difficulty sleeping?",

    "How often have you had unwanted memories of a stressful experience?",

    "How often have you felt unsafe even when you were not in immediate danger?",

    "How often have you felt easily startled or alert to sudden sounds?",

    "How often have you found it difficult to concentrate on your daily activities?",

    "How often have you avoided people, places, or situations that remind you of a stressful experience?",

    "How often have you felt emotionally numb or disconnected from others?",

    "How often have your feelings affected your studies, work, or everyday activities?"

];


var currentQuestion = 0;

var answers = [];


function nextQuestion() {

    var answer = document.querySelector(
        'input[name="answer"]:checked'
    );


    if (answer == null) {

        alert("Please select an answer.");

        return;

    }


    answers[currentQuestion] = answer.value;


    if (currentQuestion < questions.length - 1) {

        currentQuestion++;

        showQuestion();

    }

    else {

    localStorage.setItem("stressScore", answers);

    var score = 0;

    for (var i = 0; i < answers.length; i++) {

        score = score + Number(answers[i]);

    }


    var level = "";

    if (score <= 10) {

        level = "Low";

    }
    else if (score <= 20) {

        level = "Moderate";

    }
    else {

        level = "High";

    }


    var cases = JSON.parse(localStorage.getItem("cases")) || [];


    var newCase = {

        id: "CASE" + String(cases.length + 1).padStart(3, "0"),

        score: score,

        level: level,

        status: "Pending"

    };


    cases.push(newCase);


    localStorage.setItem("cases", JSON.stringify(cases));


    window.location.href = "result.html";

}

}

    




function previousQuestion() {

    if (currentQuestion > 0) {

        currentQuestion--;

        showQuestion();

    }

    else {

        alert("This is the first question.");

    }

}


function showQuestion() {

    document.getElementById("question").innerText =
        questions[currentQuestion];


    document.getElementById("questionNumber").innerText =
        "Question " + (currentQuestion + 1) + " of " + questions.length;


    var selectedAnswer = answers[currentQuestion];


    var radioButtons = document.querySelectorAll(
        'input[name="answer"]'
    );


    radioButtons.forEach(function(radio) {

        radio.checked = false;

        if (radio.value == selectedAnswer) {

            radio.checked = true;

        }

    });

}
function goToSupport() {

    window.location.href = "support.html";

}
function contactCounsellor() {

    alert("A trained support professional can assist you.");

}


function goHome() {

    window.location.href = "index.html";

}
function calculateResult() {

    var answers = localStorage.getItem("stressScore");

    var score = 0;

    if (answers) {

        var answerList = answers.split(",");

        for (var i = 0; i < answerList.length; i++) {

            score = score + Number(answerList[i]);

        }

    }


    var level = "";
    var message = "";
    var advice = "";
    var nextStep = "";


    if (score <= 10) {

        level = "Low";

        message = "Your responses show relatively low levels of stress indicators.";

        advice = "You may continue using healthy coping strategies and maintain your usual support system.";

        nextStep = "Continue taking care of your emotional wellbeing and reach out for support if your situation changes.";

    }


    else if (score <= 20) {

        level = "Moderate";

        message = "Your responses show some signs of stress or emotional difficulty.";

        advice = "You may benefit from talking to someone you trust or a trained support professional.";

        nextStep = "Consider speaking with a trained counsellor or support professional.";

    }


    else {

        level = "High";

        message = "Your responses show several strong stress-related indicators.";

        advice = "It may be helpful to speak with a trained professional who can understand your situation and provide appropriate support.";

        nextStep = "Consider seeking support from a trained professional as soon as you feel comfortable.";

    }


    document.getElementById("resultLevel").innerText = level;

    document.getElementById("resultMessage").innerText = message;

    document.getElementById("resultAdvice").innerText = advice;

    document.getElementById("nextStep").innerText = nextStep;

}
function showSupportMessage() {

    var answers = localStorage.getItem("stressScore");

    var score = 0;

    if (answers) {

        var answerList = answers.split(",");

        for (var i = 0; i < answerList.length; i++) {

            score = score + Number(answerList[i]);

        }

    }


    var message = "";


    if (score <= 10) {

        message = "Your assessment shows a low level of stress indicators. You can continue using healthy coping strategies and reach out for support whenever you need it.";

    }

    else if (score <= 20) {

        message = "Your assessment shows some stress indicators. Talking with a trusted person or trained support professional may be helpful.";

    }

    else {

        message = "Your assessment shows several strong stress indicators. Consider speaking with a trained support professional and seeking help if you feel unsafe.";

    }


    document.getElementById("supportMessage").innerText = message;

}
function loadDashboard() {

    var cases = JSON.parse(localStorage.getItem("cases")) || [];

    var total = cases.length;
    var low = 0;
    var moderate = 0;
    var high = 0;

    for (var i = 0; i < cases.length; i++) {

        if (cases[i].level == "Low") {
            low++;
        }

        else if (cases[i].level == "Moderate") {
            moderate++;
        }

        else if (cases[i].level == "High") {
            high++;
        }

    }

    document.getElementById("totalCases").innerText = total;
    document.getElementById("lowCases").innerText = low;
    document.getElementById("moderateCases").innerText = moderate;
    document.getElementById("highCases").innerText = high;

}
function showCases() {

    var cases = JSON.parse(localStorage.getItem("cases")) || [];

    var table = document.getElementById("caseTableBody");

    table.innerHTML = "";

    for (let i = 0; i < cases.length; i++) {

        var row = table.insertRow();

        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);

        cell1.innerText = cases[i].id;
        cell2.innerText = cases[i].score;
        cell3.innerText = cases[i].level;
        cell4.innerText = cases[i].status;

        row.onclick = function() {

            showCaseDetails(i);

        };

    }

}
function showCaseDetails(index) {

    selectedCaseIndex = index;

    var cases = JSON.parse(localStorage.getItem("cases")) || [];

    var selectedCase = cases[index];

    document.getElementById("caseId").innerText =
        "Case ID: " + selectedCase.id;

    document.getElementById("caseScore").innerText =
        "Score: " + selectedCase.score;

    document.getElementById("caseLevel").innerText =
        "Indicator: " + selectedCase.level;

    document.getElementById("caseStatus").innerText =
        "Status: " + selectedCase.status;

    var advice = "";

    if (selectedCase.level == "Low") {

        advice = "Continue monitoring and provide support if needed.";

    }

    else if (selectedCase.level == "Moderate") {

        advice = "Consider review by a trained support professional.";

    }

    else {

        advice = "Priority review by a trained support professional may be appropriate.";

    }

    document.getElementById("caseAdvice").innerText =
        "Recommended Action: " + advice;

}
function filterCases() {

    var cases = JSON.parse(localStorage.getItem("cases")) || [];

    var searchText = document.getElementById("searchCase").value.toUpperCase();

    var selectedLevel = document.getElementById("levelFilter").value;

    var table = document.getElementById("caseTableBody");

    table.innerHTML = "";

    for (let i = 0; i < cases.length; i++) {

        var caseId = cases[i].id.toUpperCase();

        var level = cases[i].level;

        if (caseId.includes(searchText) &&
            (selectedLevel == "All" || level == selectedLevel)) {

            var row = table.insertRow();

            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);

            cell1.innerText = cases[i].id;
            cell2.innerText = cases[i].score;
            cell3.innerText = cases[i].level;
            cell4.innerText = cases[i].status;

            row.onclick = function() {

                showCaseDetails(i);

            };

        }

    }

}
var selectedCaseIndex = -1;


function updateStatus() {

    if (selectedCaseIndex == -1) {

        alert("Please select a case first.");

        return;

    }

    var cases = JSON.parse(localStorage.getItem("cases")) || [];

    var newStatus =
        document.getElementById("statusChange").value;

    cases[selectedCaseIndex].status = newStatus;

    localStorage.setItem("cases", JSON.stringify(cases));

    showCases();

    showCaseDetails(selectedCaseIndex);

    alert("Case status updated.");

}
function goToOfficer() {
    window.location.href = "officer.html";
}

