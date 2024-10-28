
let complaints = JSON.parse(localStorage.getItem('complaints')) || [];

document.getElementById('complaintForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const category = document.getElementById('category').value;
    const complaint = document.getElementById('complaint').value;

   
    const complaintData = {
        name,
        email,
        category,
        complaint,
        date: new Date().toLocaleString(),
        status: 'Pending' 
    };

    
    complaints.push(complaintData);
   
    localStorage.setItem('complaints', JSON.stringify(complaints));

    
    document.getElementById('responseMessage').innerText = 'Thank you for your complaint! It has been submitted successfully.';

   
    document.getElementById('complaintForm').reset();
});


document.getElementById('statusButton').addEventListener('click', function() {
    if (complaints.length > 0) {
        showComplaintDetails();
    } else {
        alert("No complaints submitted yet.");
    }
});


function showComplaintDetails() {
    const modal = document.getElementById('complaintModal');
    const modalContent = document.getElementById('modalContent');
    modalContent.innerHTML = ''; 

   
    complaints.forEach(complaint => {
        modalContent.innerHTML += `
            <div class="complaint-item">
                <strong>Name:</strong> ${complaint.name}<br>
                <strong>Email:</strong> ${complaint.email}<br>
                <strong>Category:</strong> ${complaint.category}<br>
                <strong>Details:</strong> ${complaint.complaint}<br>
                <strong>Date:</strong> ${complaint.date}<br>
                <strong>Status:</strong> ${complaint.status}
                <hr>
            </div>
        `;
    });

    modal.style.display = 'block';

   
    modal.querySelector('.close').onclick = function() {
        modal.style.display = 'none';
    }

   
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
}