import {LitElement, html} from '@polymer/lit-element/lit-element.js';
import {repeat} from 'lit-html/directives/repeat.js';
import {style} from './ToDo-styles.js';
import './components/ToDoItem.js';
// import Logo from './assets/logo.png';

export class ToDo extends LitElement {
    /**
     * Declare the properties that will be
     * available in the binding system
     */
    static get properties() {
      return {
        list: {type: Array},
        todo: {type: String},
      };
    }
    constructor() {
        super();
        this.list = [
            this.todoItem('clean the house'),
            this.todoItem('buy milk')
        ];
        this.todo = '';
    }

    todoItem(todo) {
      return {todo}
    }

    createNewToDoItem() {
      this.list = [
        ...this.list,
        this.todoItem(this.todo)
      ];
      this.todo = '';
    }


    handleKeyPress(e) {
        if (e.target.value !== '') {
          if (e.key === 'Enter') {
            this.createNewToDoItem();
          }
        }
    }

    handleInput(e) {
      this.todo = e.target.value;
    }


    // this is now being emitted back to the parent from the child component
    deleteItem(indexToDelete) {
      this.list = this.list.filter((toDo, index) => index !== indexToDelete);
    }


    render() {
        return html`
            ${style}
            <div class="ToDo">
                <h1>LitElement</h1>
                <h1 class="ToDo-Header">LitElement To Do</h1>
                <div class="ToDo-Container">

                    <div class="ToDo-Content">

                        ${repeat(
                            this.list,
                            (item, key) => {
                                return html`
                                  <to-do-item
                                    .item=${item.todo}
                                    .deleteItem=${this.deleteItem.bind(this, key)}
                                  ></to-do-item>
                                `;
                            }
                        )}
                    </div>

                    <div>
                       <input
                          type="text"
                          .value=${this.todo}
                          @change=${e => this.handleInput(e)}
                          @keypress=${e => this.handleKeyPress(e)}
                        />
                       <button
                          class="ToDo-Add"
                          @click=${e => this.createNewToDoItem(e)}
                        >+</button>
                    </div>

                </div>
            </div>
        `;
    }
}

customElements.define('to-do', ToDo);