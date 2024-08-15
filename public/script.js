document.getElementById('questionForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting the default way

    const formData = new FormData(this);

    const data = {
        round: formData.get('round'),
        qno: formData.get('qno'),
        question: formData.get('question'),
        c1: formData.get('c1'),
        c2: formData.get('c2'),
        c3: formData.get('c3'),
        c4: formData.get('c4'),
        answer: formData.get('answer')
    };

    fetch('/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        // Optionally handle the response from the server
        console.log('Success:', result);

        // Reset all fields except round number and question number
        document.getElementById('question').value = '';
        document.getElementById('c1').value = '';
        document.getElementById('c2').value = '';
        document.getElementById('c3').value = '';
        document.getElementById('c4').value = '';
        document.getElementById('answer').value = '';
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
