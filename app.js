const sqlite3 = require('sqlite3').verbose()
const express = require("express");
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'public')))

app.use(bodyParser.json());
const port = 3000;


let db = new sqlite3.Database('./quiz.db')

function getdata(round,question){
	let getsql = `SELECT qno,rno,question,c1,c2,c3,c4,answer FROM questions WHERE rno = ? AND qno = ?`;
	return new Promise((resolve, reject) => {
	   db.get(getsql, [round,question], function(err, result, fields) {
		   if (err) {
			   reject(err);	   con.end();
		   }

		   resolve(result);
	   });
	});
}

function insertData(round, qno, question, c1, c2, c3, c4, answer) {
    const insertSql = `
        INSERT INTO questions (qno, rno, question, c1, c2, c3, c4, answer) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    return new Promise((resolve, reject) => {
        db.run(insertSql, [round, qno, question, c1, c2, c3, c4, answer], function(err) {
            if (err) {
                reject(err);
            } else {
                resolve({ id: this.lastID });
            }
        });
    });
}

app.get("/163252/:round/:question", function(req, res) {
	const round = req.params.round;
	const question = req.params.question;

	getdata(round, question).then(result => {
		res.send(result);
	}).catch(error => {
		console.log('error:', error);
		res.status(500).send("An error occurred");
	});
});

app.post('/create', (req, res) => {
    const { round, qno, question, c1, c2, c3, c4, answer } = req.body;

    insertData(qno, round, question, c1, c2, c3, c4, answer)
        .then(result => {
            res.json({ message: 'Data inserted successfully!', id: result.id });
        })	
        .catch(error => {
            console.error('Error inserting data:', error);
            res.status(500).json({ message: 'An error occurred while inserting data.' });
        });
});
app.get('/h3Jk7mQxL9y2N0sVpR8bFzA4dU1cWgT5oHnK6iBqE3aXrYpZl', (req, res) => {
	res.sendFile(path.join(__dirname,'/public/index.html'));
});
app.get('/admin874545', (req, res) => {
	res.sendFile(path.join(__dirname,'/public/admin.html'));
});
app.listen(port, () => {
	console.log(`Listening on PORT: ${port}`)
});

