const form = document.getElementById('registerForm');
const responseMessage = document.getElementById('responseMessage');

form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent page refresh on form submission

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
     const API_URL = "https://task-master-api-i3bb.onrender.com/api/user";

    try {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST', // HTTP method
            headers: {
                'Content-Type': 'application/json', // Inform backend to expect JSON
            },
            body: JSON.stringify({ name, email, password }), // Send data as a JSON string
        });

        const data = await response.json(); // Parse JSON from the response

        if (response.ok) {
            responseMessage.textContent = 'Registration successful!';
            responseMessage.style.color = '#4CAF50';
           
            localStorage.setItem('token', data.token)
            window.location.href = '/index.html'; 
        } else {
            responseMessage.textContent = `Error: ${data.message || 'Registration failed'}`;
        }
    } catch (error) {
        console.error('Error:', error);
        responseMessage.textContent = 'An error occurred. Please try again.';
    }
});
