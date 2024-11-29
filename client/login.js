const form = document.getElementById('loginForm');
const responseMessage = document.getElementById('responseMessage');

form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent page refresh on form submit

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const API_URL = 'https://task-management-api-cmcy.onrender.com'
    try {
        const response = await fetch('https://task-management-api-cmcy.onrender.com/api/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        if (response.ok) {
            responseMessage.textContent = `Success: ${data.message}`;
            responseMessage.style.color = '#4CAF50';
      
            window.location.href = '/index.html';
            localStorage.setItem('token', data.token);
        } else {
            responseMessage.textContent = `Error: ${data.message}`;
        }
    } catch (error) {
        console.error('Error:', error);
        responseMessage.textContent = 'An error occurred. Please try again.';
    }
});
