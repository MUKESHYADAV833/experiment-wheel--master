myobj =
{
    "problem": " this is the answer ",
    "choicearray": [],
    "choices":
    {
    },
    "moreinfo": "",
    "whocanhelp": [],
    "Decision": "this is the decision taken by user",
    "assessdecisison": " for decision assesment"
}
var questions = [" 1. What is Problem ?",
    "2. What are the Choices ?",
    "3. what can be the Consequences?",
    "4. What are the Values ?",
    "5. How are you Feeling ?",
    "6.  Anything More you want to share ?",
    "7. Who Can Help ?",
    "8. what is your Decision ?",
    "9. Assess Decision"];

var InputConfig = [
    { "multiple": false, "question": " What is Problem ?", "title": "Problem" },
    { "multiple": true, "question": "What are the choices?", "title": "Choice" },
    { "multiple": true, "linkedto": 1, "question": "What are the consequences ?", "title": "Consequences" },
    { "multiple": true, "linkedto": 1, "question": "What are the values?", "title": "Values" },
    { "multiple": false, "linkedto": 1, "question": " What are your feelings ?", "title": "Feelings" },
    { "multiple": false, "question": "Anything More you want to share ?", "title": "More Information" },
    { "multiple": false, "question": "Who Can Help ?", "title": "Help" },
    { "multiple": false, "question": "What is your Decision ?", "title": "Decision" },
    { "multiple": false, "question": "Assess Decision.", "title": "Assess Decision" }
];

// -------------------------------------------------------------------------------------------

function enable_next_button(flag) {
    var next_id_number = flag + 1;
    var next_button_string = next_id_number.toString();
    var next_button_id = 'b'.concat(next_button_string);
    document.getElementById(next_button_id).disabled = false;
}

// -------------------------------------------------------------------------------------------

var activeView = "tree";
function toggleDataEntryView() {
    var tree = document.getElementById("permanentView");
    var input_box = document.getElementById("userdataentrybox");

    if (activeView == "tree") {
        tree.style.display = "none";
        input_box.style.display = "block";
        activeView = "inputbox";
    }
    else {
        tree.style.display = "block";
        input_box.style.display = "none";
        activeView = "tree";
    }
}
linkindex = 0
var currentStage = 0;
function printchoice() {
    if (linkindex <= (temp_choice.length - 1)) {
        document.getElementById("iContext").innerHTML = temp_choice[linkindex];
        linkindex += 1;
    }

}

// -------------------------------------------------------------------------------------------

function collectresponse(btn) {
    var button_id = btn.id;
    // currentStage = btn.GetAtttibute("stage")
    flag = parseInt(button_id.charAt(1));
    var qno = parseInt(button_id.charAt(1)) - 1;
    var question = questions[qno];
    if (InputConfig[flag - 1].linkedto == 1) {
        if (InputConfig[flag - 1].multiple == false) {
            document.getElementById("InputNewBtn").disabled = true;
            document.getElementById("InputRemoveBtn").disabled = true;
        }
        linkindex = 0;
        document.getElementById("InputNextBtn").disabled = false;
        document.getElementById("s4").disabled = true;
        printchoice();

    }
    else if (InputConfig[flag - 1].multiple == true) {
        document.getElementById("iContext").innerHTML = "";

        document.getElementById("InputNewBtn").disabled = false;
        document.getElementById("InputRemoveBtn").disabled = false;
    }

    else if (InputConfig[flag - 1].multiple == false) {
        document.getElementById("iContext").innerHTML = "";
        document.getElementById("InputNewBtn").disabled = true;
        document.getElementById("InputRemoveBtn").disabled = true;
    }

    // Set fields of data entry window
    var x = document.getElementById("iQuestion").innerHTML = question;

    // Toggle the view
    toggleDataEntryView();
}

// -------------------------------------------------------------------------------------------

function SubmitInput() {
    var ans1 = document.getElementById("iResponse").value;
    var ans = ans1.trim();
    if (ans.length == 0 || ans.charAt(0) == " ") {
        alert("you have not entered anything.");
    }
    else {

        enable_next_button(flag);
        // Toggle the view
        toggleDataEntryView();
        if (flag == 1) {
            myobj.problem = ans;
            document.getElementById("p1").innerHTML = myobj.problem;
        }
        else if (flag == 2) {
            var ans1 = document.getElementById("iResponse").value;
            var ans = ans1.trim();
            temp_choice.push(ans);
            for(var j = 0 ; j < temp_choice.length ; j ++ ){
                myobj.choicearray[j] = temp_choice[j];
            }
            var o = myobj.choicearray.toString();
            document.getElementById("pz").innerHTML = o;

            // myobj.choicearray = temp_choice;
            // for (var j = 1; j <= myobj.choicearray.length; j++) {
            //     myobj.choices[j] =
            //     {
            //         "choice": "",
            //         "consequences": "",
            //         "values": "",
            //         "feeling": ""
            //     };
            // }
        }
        else if (flag == 3) {
            var ans1 = document.getElementById("iResponse").value;
            var ans = ans1.trim();
            temp_consequences.push(ans)
            myobj.choices[linkindex].choice = myobj.choicearray[linkindex - 1]
            myobj.choices[linkindex].consequences = temp_consequences;
        }
        else if (flag == 4) {
            var ans1 = document.getElementById("iResponse").value;
            var ans = ans1.trim();
            temp_value.push(ans)
            myobj.choices[linkindex].values = temp_value;
        }
        else if (flag == 5) {
            temp_feeling = document.getElementById("iResponse").value;
            myobj.choices[linkindex].feeling = temp_feeling;
            InputConfig[flag - 1].linkedto == 0;
        }
        else if (flag == 6) {
            myobj.moreinfo = ans;
            document.getElementById("p6").innerHTML = myobj.moreinfo;
        }
        else if (flag == 7) {
            myobj.whocanhelp = ans;
            document.getElementById("p7").innerHTML = myobj.whocanhelp;
        }
        else if (flag == 8) {
            myobj.Decision = ans;
            document.getElementById("p8").innerHTML = myobj.Decision;
        }
        else if (flag == 9) {
            myobj.assessdecisison = ans;
            document.getElementById("p9").innerHTML = myobj.assessdecisison;
        }

        document.getElementById("iResponse").value = '';
    }
}

// -------------------------------------------------------------------------------------------

var temp_choice = [];
var temp_value = [];
var temp_consequences = [];
var temp_feeling = '';

function AddNew() {
    var ans1 = document.getElementById("iResponse").value;
    var ans = ans1.trim();
    if (flag == 2 && ans.length != 0) {
        temp_choice.push(ans)
        document.getElementById("iResponse").value = ''
    }
    else if (flag == 3 && ans.length != 0) {
        temp_consequences.push(ans)
        document.getElementById("iResponse").value = ''
    }
    else if (flag == 4 && ans.length != 0) {
        temp_value.push(ans)
        document.getElementById("iResponse").value = ''
    }
}

// -------------------------------------------------------------------------------------------

function RemoveCurrent() {
    document.getElementById("iResponse").value = ''
}

// -------------------------------------------------------------------------------------------

function ShowNext() {
    var ans1 = document.getElementById("iResponse").value;
    var ans = ans1.trim();

    if (flag == 3) {
        if (linkindex == (temp_choice.length - 1)) {
            document.getElementById("InputNextBtn").disabled = true;
            document.getElementById("s4").disabled = false;
        }
        temp_consequences.push(ans)
        myobj.choices[linkindex].choice = myobj.choicearray[linkindex - 1]
        myobj.choices[linkindex].consequences = temp_consequences;
        temp_consequences = [];
        document.getElementById("iResponse").value = "";
        printchoice();
    }
    else if (flag == 4) {
        if (linkindex == (temp_choice.length - 1)) {
            document.getElementById("InputNextBtn").disabled = true;
            document.getElementById("s4").disabled = false;
        }
        temp_value.push(ans)
        myobj.choices[linkindex].values = temp_value;
        temp_value = [];
        document.getElementById("iResponse").value = "";
        printchoice()
    }
    else if (flag == 5) {
        if (linkindex == (temp_choice.length - 1)) {
            document.getElementById("InputNextBtn").disabled = true;
            document.getElementById("s4").disabled = false;
        }
        temp_feeling = document.getElementById("iResponse").value;
        myobj.choices[linkindex].feeling = temp_feeling;
        document.getElementById("iResponse").value = "";
        printchoice()
    }
}
// -------------------------------------------------------------------------------------------

var modal6 = document.getElementById("myModal6");
var btn = document.getElementById("b11");
var span6 = document.getElementsByClassName("close6")[0];

span6.onclick = function () {
    modal6.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal6) {
        modal6.style.display = "none";
    }
}

function reset(){

}