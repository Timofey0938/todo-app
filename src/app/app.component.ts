import {Component} from '@angular/core';
import {ITodo} from './models/todo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'TODO APP';
  todos: ITodo[] = JSON.parse(localStorage.getItem('todos') ?? '[]');
  editing = false;

  setEditing = (isEditing: boolean) => {
    this.editing = isEditing;
  };

  get todosLeftCount() {
    return this.todos.filter(todo => !todo.completed).length;
  }

  saveToLocalStorage = () => {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  };

  addTodo = (todoText: string) => {
    this.todos.push({
      id: Date.now(),
      text: todoText,
      completed: false,
    });
    this.saveToLocalStorage();
  };

  editTodo = (todoId: number, todoText: string) => {
    this.todos = this.todos.map(todo => {
      if (todo.id === todoId) {
        return {
          ...todo,
          text: todoText,
        };
      }
      return todo;
    });
    this.saveToLocalStorage();
  };

  removeTodo = (todoId: number) => {
    this.todos = this.todos.filter(todo => todo.id !== todoId);
    this.saveToLocalStorage();
  };

  handleTodoComplete = (todoId: number) => {
    this.todos = this.todos.map(todo => {
      if (todo.id === todoId) {
        return {
          ...todo,
          completed: !todo.completed
        };
      }
      return todo;
    });
    this.saveToLocalStorage();
  };

  removeCompletedTodos = () => {
    this.todos = this.todos.filter(todo => !todo.completed);
    this.saveToLocalStorage();
  };
}
