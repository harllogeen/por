import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo-items',
  templateUrl: './todo-items.component.html',
  styleUrls: ['./todo-items.component.scss'],
})
export class TodoItemsComponent implements OnInit {
  editTodo: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  updateToggle(): void {
    this.editTodo = !this.editTodo;
  }

  updateTodo() {

  }

  deleteTodo() {
    
  }
}
