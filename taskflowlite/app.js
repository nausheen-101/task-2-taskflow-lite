import { validateTaskInput } from "./modules/validation.js";
import { saveTasks, loadTasks } from "./modules/storage.js";
import { renderTaskList } from "./modules/render.js";

/* ==========================
   TASK MANAGER
========================== */

let tasks = loadTasks();
let currentFilter = "all";

const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const errorMessage = document.getElementById("errorMessage");
const taskList = document.getElementById("taskList");

const allBtn = document.getElementById("allBtn");
const activeBtn = document.getElementById("activeBtn");
const completedBtn = document.getElementById("completedBtn");

renderTaskList(tasks, currentFilter);

taskForm.addEventListener("submit", (e) => {

    e.preventDefault();

    const result = validateTaskInput(taskInput.value);

    if (!result.isValid) {
        errorMessage.textContent = result.message;
        return;
    }

    errorMessage.textContent = "";

    tasks.push({
        id: Date.now(),
        text: taskInput.value.trim(),
        completed: false
    });

    saveTasks(tasks);
    renderTaskList(tasks, currentFilter);

    taskInput.value = "";

});

taskList.addEventListener("click", (e) => {

    const li = e.target.closest("li");

    if (!li) return;

    const id = Number(li.dataset.id);

    if (e.target.classList.contains("deleteTask")) {

        tasks = tasks.filter(task => task.id !== id);

    }

    if (e.target.classList.contains("toggleTask")) {

        tasks = tasks.map(task => {

            if (task.id === id) {

                task.completed = !task.completed;

            }

            return task;

        });

    }

    saveTasks(tasks);

    renderTaskList(tasks, currentFilter);

});

allBtn.onclick = () => {

    currentFilter = "all";

    renderTaskList(tasks, currentFilter);

};

activeBtn.onclick = () => {

    currentFilter = "active";

    renderTaskList(tasks, currentFilter);

};

completedBtn.onclick = () => {

    currentFilter = "completed";

    renderTaskList(tasks, currentFilter);

};


/* ==========================================
        PREMIUM GREEN BACKGROUND
========================================== */

const canvas = document.getElementById("bgCanvas");

const ctx = canvas.getContext("2d");

let particles = [];

let mouse = {

    x: null,

    y: null,

    radius: 120

};

function resizeCanvas(){

    canvas.width = window.innerWidth;

    canvas.height = window.innerHeight;

}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);

window.addEventListener("mousemove",(e)=>{

    mouse.x = e.x;

    mouse.y = e.y;

});

class Particle{

    constructor(){

        this.x = Math.random()*canvas.width;

        this.y = Math.random()*canvas.height;

        this.size = Math.random()*3+2;

        this.speedX = (Math.random()-0.5)*1.5;

        this.speedY = (Math.random()-0.5)*1.5;

    }

    update(){

        this.x += this.speedX;

        this.y += this.speedY;

        if(this.x<0 || this.x>canvas.width){

            this.speedX *= -1;

        }

        if(this.y<0 || this.y>canvas.height){

            this.speedY *= -1;

        }

        const dx = mouse.x-this.x;

        const dy = mouse.y-this.y;

        const distance = Math.sqrt(dx*dx+dy*dy);

        if(distance<mouse.radius){

            this.x -= dx/25;

            this.y -= dy/25;

        }

    }

    draw(){

        ctx.beginPath();

        ctx.arc(this.x,this.y,this.size,0,Math.PI*2);

        ctx.fillStyle="#00ff88";

        ctx.shadowBlur=20;

        ctx.shadowColor="#00ff88";

        ctx.fill();

    }

}

for(let i=0;i<120;i++){

    particles.push(new Particle());

}

function connectParticles(){

    for(let a=0;a<particles.length;a++){

        for(let b=a;b<particles.length;b++){

            let dx=particles[a].x-particles[b].x;

            let dy=particles[a].y-particles[b].y;

            let distance=dx*dx+dy*dy;

            if(distance<12000){

                ctx.beginPath();

                ctx.strokeStyle="rgba(0,255,136,0.12)";

                ctx.lineWidth=1;

                ctx.moveTo(particles[a].x,particles[a].y);

                ctx.lineTo(particles[b].x,particles[b].y);

                ctx.stroke();

            }

        }

    }

}

function animate(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    particles.forEach(p=>{

        p.update();

        p.draw();

    });

    connectParticles();

    requestAnimationFrame(animate);

}

animate();