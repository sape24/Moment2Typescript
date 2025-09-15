# Praktisk Laboration (Moment 2 - TypeScript)

## Beskrivning
En enkel webbapplikation för att hantera todos.  
Applikationen gör det möjligt för användaren att:
- Visa en lista över todos i en tabell
- Lägga till nya todos med prioritet
- Markera todos som klara/ej klara
- Spara och läsa todos från `localStorage`

All data sparas lokalt i webbläsaren via `localStorage`, vilket innebär att uppgifterna ligger kvar även efter att sidan laddas om.

---

## Tekniker
- **TypeScript**
- **Vite**
- **DOM-manipulation**
- **localStorage**

---

## Konstruktion av lösningen

### 1. **Interface**
```ts
interface Todo {
  task: string
  completed: boolean
  priority: number
}
```

### 2. **Klass TodoList**

- `private todos: Todo[] = []` – privat array för alla todos  
- `constructor()` – laddar todos från localStorage  
- `addTodo(task: string, priority: number): boolean` – validerar och lägger till ny todo  
- `todoCompleted(index: number): void` - togglar för completeknappen   
- `getTodos(): Todo[]` – returnerar listan  
- `saveToLocalStorage(): void` – sparar i localStorage  
- `loadFromLocalStorage(): void` – hämtar från localStorage  

---

### 3. **DOM-hantering**
Funktionen `displayTodos()` bygger upp en tabell med todos:

- Varje rad visar uppgift och prioritet  
- En knapp för att toggla completed skapas för varje todo  
- Knappklick uppdaterar listan och sparar ändringen  

Formuläret för att lägga till todo använder `task` och `priority`.  
Vid klick körs `addTodo`. Om det lyckas uppdateras listan och användaren skickas till `index.html`.

---

### 4. **localStorage**
Todos sparas som JSON-sträng under nyckeln `"todos"`.  
