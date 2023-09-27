import {Component, Input} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ITodo} from 'src/app/models/todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})

export class TodoComponent {
  @Input() todo: ITodo;
  @Input('editing') glabalEditing: boolean;
  @Input('setEditing') setGlobalEditing: (isEditing: boolean) => void;
  @Input() editTodo: (todoId: number, todoText: string) => void;
  @Input() handleTodoComplete: (todoId: number) => void;
  @Input() removeTodo: (todoId: number) => void;

  editing = false;

  form = new FormGroup({
    todoText: new FormControl<string>(''),
  });

  setEditing = (isEditing: boolean) => {
    this.editing = isEditing;
    this.setGlobalEditing(isEditing);
  }

  edit = () => {
    if (this.glabalEditing) {
      return;
    }
    this.form.setValue({todoText: this.todo.text});
    this.setEditing(true);
  };

  cancel = () => {
    this.setEditing(false);
  };

  save = () => {
    if (!this.form.value.todoText) {
      this.cancel();
    }
    this.editTodo(this.todo.id, this.form.value.todoText as string);
    this.setEditing(false);
  };
}
