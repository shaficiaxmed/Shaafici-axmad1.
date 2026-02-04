const taskInput = document.getElementById("task-input"),
      taskList = document.querySelector(".task-items"),
      pointsDisplay = document.getElementById("points"),
      levelDisplay = document.getElementById("level");

let totalPoints = 0;

document.getElementById("task-form").onsubmit = (e) => {
    e.preventDefault();
    const val = taskInput.value.trim();

    if (!val || !/^[a-zA-Z\s]+$/.test(val)) {
        alert("Fadlan geli xarfo keliya!");
        return showErr();
    }

    const li = document.createElement("li");
    li.className = "task";
    li.innerHTML = `
        <input type="text" class="taskDisabled" value="${val}" disabled>
        <button class="complete-btn">Done</button>
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>`;
    
    taskList.appendChild(li);
    taskInput.value = "";
};

taskList.onclick = (e) => {
    const btn = e.target, li = btn.parentElement, input = li.querySelector("input");

    if (btn.classList.contains("delete-btn")) li.remove();

    if (btn.classList.contains("complete-btn")) {
       
        let newPoints = totalPoints + 15;

        if (!Number.isNaN(newPoints)) { 
            totalPoints = newPoints;
            pointsDisplay.textContent = totalPoints;
            updateRank();
        }

        li.style.opacity = "0.5";
        btn.disabled = true;
    }

    if (btn.classList.contains("edit-btn")) {
        input.disabled = !input.disabled;
        if (!input.disabled) { 
            input.focus(); 
            btn.innerText = "Save"; 
        } else { 
            if (!/^[a-zA-Z\s]+$/.test(input.value)) {
                alert("Kaliya xarfo ayaa la oggol yahay.");
                input.disabled = false;
                return;
            }
            btn.innerText = "Edit"; 
        }
    }
};

const updateRank = () => {
   
    if (!Number.isNaN(totalPoints)) {
        const rank = totalPoints >= 100 ? ["legend", "#d35400"] : 
                     totalPoints >= 50 ? ["normal", "#2980b9"] : null;
        if (rank) [levelDisplay.textContent, levelDisplay.style.color] = rank;
    }
};

document.querySelectorAll(".nav-link").forEach(link => {
    link.onclick = () => {
        document.querySelectorAll(".content-section").forEach(s => s.classList.remove("active"));
        document.getElementById(link.dataset.target).classList.add("active");
    };
});

document.querySelector(".clear-tasks").onclick = () => confirm("Ma hubtaa?") && (taskList.innerHTML = "");

const showErr = () => {
    const err = document.querySelector(".err");
    if (err) {
        err.style.display = "block";
        setTimeout(() => err.style.display = "none", 2000);
    }
};