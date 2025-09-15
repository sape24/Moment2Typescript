import './style.css'

//skapar variablar av knapp elementen i html
const openButton = document.getElementById("open-menu") as HTMLButtonElement
const closeButton = document.getElementById("close-menu") as HTMLButtonElement

openButton.type = "button"
closeButton.type = "button"
//skapar en eventlistener som lyssnar efter när användare klickar på dessa element
openButton.addEventListener('click', toggleMenu)
closeButton.addEventListener('click', toggleMenu)

//function som kollar ifall mobilmenyn visas eller inte när man trycker på respektive knapp, om den inte visas så visas den och vice versa. Den ändrar knappens css ifall display är none till block annars ändras den till none
function toggleMenu(): void{                                                          
    const mobileMenuEl = document.getElementById("mobilemenu") as HTMLElement
    const style = window.getComputedStyle(mobileMenuEl)

    if(style.display === "none") {
        mobileMenuEl.style.display = "block";
    } else{
        mobileMenuEl.style.display = "none"
    }
} 

interface Todo{                                       //Interface som beskriver ett todo objekt 
  task: string,
  completed: boolean,
  priority: number
}

class TodoList{                                                //klass som hanterar en lista av todo objekt
  private todos: Todo[] = []                                     //private array som lagrar all todo objekt endast koden inutu klassen kan komma åt arrayen

  constructor(){                                                  //constructor som kör när ett nytt todolist objekt skapas
    this.loadFromLocalStorage()
  }

  addTodo(task:string, priority: number): boolean{                //metod som lägger till en ny todo returnerar truu eller false beroende på om det fungerar
    if(!task || priority < 1 || priority >3){                     //kollar att upgiften inte är tom samt att prio är mellan 1 och 3
        return false
    }
  

  this.todos.push({task, completed:false, priority})              //lägger till todo objekt i listan med dess task och priority completed är false från början
  this.saveToLocalStorage()
  return true
  }

  todoCompleted(index: number): void{                              //metod som markerar en todo som klar eller inte
    if(index >= 0 && index < this.todos.length){                   //kontrollerar att index finns i listan, inte är negativ och det finns inte mer todos än completed
        this.todos[index].completed = !this.todos[index].completed  //toggle och växlar värdet mellan true och false
        this.saveToLocalStorage()                                     
    }
  }

  getTodos(): Todo[]{                                               //metod som return hela listan av todos
    return this.todos
  }

  saveToLocalStorage(): void {                                      //metod som sparar listan till webbläsarens localstorage
    localStorage.setItem("todos", JSON.stringify(this.todos))         //konverterar till json sträng 
  }

  loadFromLocalStorage(): void {                                    //metod som hämtar från localstorage
    const savedTodos = localStorage.getItem("todos")                
    this.todos = savedTodos ? JSON.parse(savedTodos) : []           //konverterar json sträng till array
  }
}

const taskInput = document.getElementById("task") as HTMLInputElement        //hämtar input från dom och typas till htmlinputelement
const priorityInput = document.getElementById("priority") as HTMLInputElement
const todoListEl = document.getElementById("appendEl") as HTMLTableSectionElement

const todoList = new TodoList()                                      //skapar en variabel av todoobjeketet

function displayTodos(){                                              //funktion som visar hela listan av todos i en tabell
  if(!todoListEl) return
  todoListEl.innerHTML = ""
  todoList.getTodos().forEach((todo: Todo, index) => {                 //loopar igenom alla todos
    const newRow: HTMLTableRowElement = document.createElement(`tr`)
        
    const newTodoTask:HTMLTableCellElement = document.createElement(`td`)             
    newTodoTask.textContent = todo.task
    newRow.appendChild(newTodoTask)

    const newTodoPriority:HTMLTableCellElement = document.createElement(`td`)
    newTodoPriority.textContent = (`${todo.priority}`)
    newRow.appendChild(newTodoPriority)

    const completeCell:HTMLTableCellElement = document.createElement(`td`)
    const completeButton:HTMLButtonElement = document.createElement(`button`)
    completeButton.type = "button"
    completeButton.classList.add("completeButton")

    if(todo.completed){                                           //om todo är markerad som klar lägg till en css klass som visar att den är klickad
      completeButton.classList.add("clicked")
    }

    completeButton.onclick = () => {                              //funktion som körs när knappen klickad
      todoList.todoCompleted(index)                               //togglar completed värdet för todo på rätt index sen refreshar tabellen
      displayTodos()
    }

    completeCell.appendChild(completeButton)                       
    newRow.appendChild(completeCell)
    todoListEl.appendChild(newRow)
  })
}

const formButton = document.getElementById("button") as HTMLButtonElement

if(formButton && taskInput && priorityInput){                    //kontroll att alla inputfält finns i dom innan eventlistener sätts
  formButton.type = "button"
  formButton.addEventListener('click', (event: Event) =>{
    event.preventDefault()

    const task = taskInput.value
    const priority = parseInt(priorityInput.value)                 //gör om priority från text till heltal
    const sucess = todoList.addTodo(task, priority)
    if(!sucess){
      alert("Felaktigt: Skriv en Todo och välj prioritet 1-3")
      return
    }
    displayTodos()
    window.location.href = "index.html"                            //skickar användaren tillbaka till startsidan
  })
}
displayTodos()