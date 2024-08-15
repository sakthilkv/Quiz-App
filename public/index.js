let ques_no = 1;
let round_no = 1;
const round = document.getElementById("round")
const question = document.getElementById("question")
const qno = document.getElementById("qno")

const c1 = document.getElementById("choice-1")
const c2 = document.getElementById("choice-2")
const c3 = document.getElementById("choice-3")
const c4 = document.getElementById("choice-4")
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

prevButton.addEventListener("click", () => {
	if (ques_no > 1) {
		ques_no--;
		fetchData();
	}
});

nextButton.addEventListener("click", () => {
	ques_no++;
	fetchData();
});

function fetchData() {
    fetch(`/163252/${round_no}/${ques_no}/`)
        .then(res => res.json())
        .then(data => {
            if (data) {
                round.textContent = data.rno;
                qno.textContent = data.qno;
                question.textContent = data.question;
                c1.textContent = data.c1;
                c2.textContent = data.c2;
                c3.textContent = data.c3;
                c4.textContent = data.c4;
            }
        })
        .catch(error => {
            alert("No more data to find.");
            ques_no--;
        });
}

fetchData();
