import {Component, Input} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})

export class FormComponent {
  @Input() addTodo: (todoText: string) => void;

  form = new FormGroup({
    todo: new FormControl<string>(''),
  });

  submit() {
    if (!this.form.value.todo) {
      return;
    }

    this.addTodo(this.form.value.todo);
    this.form.reset();
  }
}
