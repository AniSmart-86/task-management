

const apiBaseURL = "https://task-management-api-cmcy.onrender.com/api/user"; 


const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");
const filterPriority = document.getElementById("filterPriority");
const filterDate = document.getElementById("filterDate");
const searchBar = document.getElementById("searchBar");
const applyFilters = document.getElementById("applyFilters");

// Fetch and display all tasks
async function fetchTasks() {
  try {
    const response = await fetch(`${apiBaseURL}/get-alltask`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (data.success) {
        tasks = data.data
      renderTasks(tasks);
      console.log(tasks)
    } else {
      console.error("Error fetching tasks:", data.message);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}


// Normal Date format
function formatDeadline(isoDate) {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, "0");
  
    return `${year}-${month}-${day}`; 
  }
  




// Rendering tasks to the task list
function renderTasks(tasks) {
  taskList.innerHTML = ""; 
  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <h3 class="title">${task.title}</h3>
      <p class="decs">${task.description}</p>
      <p class="title2">Priority: ${task.priority}</p>
      <p class="deadline">Deadline: ${formatDeadline(task.deadline)}</p>
      <button onclick="editTask('${task._id}'); scrollTo(0,0)">Edit</button>
      <button onclick="deleteTask('${task._id}')">Delete</button>
    `;
    taskList.appendChild(li);
  });
}

// Create or update a task
taskForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const taskData = {
    title: document.getElementById("taskTitle").value,
    description: document.getElementById("taskDescription").value,
    deadline: document.getElementById("taskDeadline").value,
    priority: document.getElementById("taskPriority").value,

  };

 

  try {
    const taskId = taskForm.getAttribute("data-task-id"); 
    const response = await fetch(
      taskId ? `${apiBaseURL}/update/${taskId}` : `${apiBaseURL}/create`,
      {
        method: taskId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      }
    );

    const data = await response.json();
    if (response.ok) {
      console.log(taskId ? "Task Updated:" : "Task Created:", data);
      taskForm.reset();
      taskForm.removeAttribute("data-task-id");
      fetchTasks();
    } else {
      console.error("Error:", data.message);
    }
  } catch (error) {
    console.error("Error:", error);


  }

});

// Edit task
async function editTask(taskId) {
  try {
    const response = await fetch(`${apiBaseURL}/update/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (response.ok) {
      document.getElementById("taskTitle").value = data.data.title;
      document.getElementById("taskDescription").value = data.data.description;
      document.getElementById("taskDeadline").value = data.data.deadline;
      document.getElementById("taskPriority").value = data.data.priority;
      taskForm.setAttribute("data-task-id", taskId); // Set the task ID for updating
    } else {
      console.error("Error fetching task:", data.message);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

// Delete task
async function deleteTask(taskId) {
  try {
    const response = await fetch(`${apiBaseURL}/delete/${taskId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (response.ok) {
      console.log("Task Deleted:", data);
      fetchTasks();
    } else {
      console.error("Error deleting task:", data.message);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

// Apply filters
applyFilters.addEventListener("click", async () => {
    const priority = filterPriority.value;
    const date = filterDate.value; // This is in YYYY-MM-DD format
  
    try {
      const response = await fetch(`${apiBaseURL}/get-alltask`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.success) {
        const filteredTasks = data.data.filter((task) => {
          const taskDate = new Date(task.deadline).toISOString().split("T")[0]; // Convert to YYYY-MM-DD
          return (
            (!priority || task.priority === priority) &&
            (!date || taskDate === date)
          );
        });
        renderTasks(filteredTasks);
      } else {
        console.error("Error fetching tasks:", data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });
  

// Search tasks
searchBar.addEventListener("input", async (e) => {
  const searchTerm = e.target.value.toLowerCase();

  try {
    const response = await fetch(`${apiBaseURL}/get-alltask`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (response.ok) {
      const searchedTasks = data.data.filter((task) => {
        return (
          task.title.toLowerCase().includes(searchTerm) ||
          task.description.toLowerCase().includes(searchTerm)
        );
      });
      renderTasks(searchedTasks);
    } else {
      console.error("Error fetching tasks:", data.message);
    }
  } catch (error) {
    console.error("Error:", error);
  }
});

// Initialize and fetch tasks on load
document.addEventListener("DOMContentLoaded", fetchTasks);























































































document.addEventListener("DOMContentLoaded", async () => {
    
    const signInButton = document.getElementById("LogInBtn");
    const signOutButton = document.getElementById("LogoutBtn");
    const userGreeting = document.getElementById("username");
   
  
    try {
      // Get token from localStorage
      const Usertoken = localStorage.getItem("token");
  
      if (!Usertoken) {
        console.log("No user token found. Redirecting to login...");
        window.location.href = "/login.html";
        return;
      }
  
      // Fetch user data
      const response = await fetch(`${apiBaseURL}/get-profile`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Usertoken}`
        }
      });
  
      const data = await response.json();

      if (response.ok) {
        // Display user data

        console.log("Token:", Usertoken);
        console.log("Response Data:", data.userData);
        
            userGreeting.textContent = `Hi! ${data.userData.name.slice(0, 6)}...`;
    
      } else {
        console.error("Error fetching user data:", data.message);
        
      }
    } catch (error) {
      console.error("An error occurred:", error);
    
    }
  });
  




  
  function logout() {
    // Clear user data
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
  
    // Redirect to login page
    window.location.href = "/login.html";
  }
  
