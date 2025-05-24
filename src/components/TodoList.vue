<script setup lang="ts">
import '@/assets/main.css';
import { onMounted, ref } from 'vue';
import type { Schema } from '../../amplify/data/resource';
import { generateClient } from 'aws-amplify/data';

const client = generateClient<Schema>();

// create a reactive reference to the array of todos
const todos = ref<Array<Schema['Todo']["type"]>>([]);
const test = ref("");

async function fetchTest() {
  test.value = await client.queries.sayHello({ name: "World" }) as unknown as string;
}

function listTodos() {
  client.models.Todo.observeQuery().subscribe({
    next: ({ items }) => {
      todos.value = items
     },
  });
}

function createTodo() {
  client.models.Todo.create({
    content: window.prompt("Todo content")
  }).then(() => {
    // After creating a new todo, update the list of todos
    listTodos();
  });
}

function deleteTodo(todoId: string) {
  console.log("Deleting todo with id:", todoId);
  client.models.Todo.delete({id: todoId});
}

// fetch todos when the component is mounted
 onMounted(() => {
  listTodos();
  fetchTest();
});

</script>

<template>
  <main>
    <h1>My todos</h1>
    <p>{{ test }}</p>
    <button @click="createTodo">+ new</button>
    <ul>
      <li
        v-for="todo in todos"
        :key="todo.id"
        @click="deleteTodo(todo.id)">
        {{ todo.content }}
      </li>
    </ul>
    <div>
      🥳 App successfully hosted. Try creating a new todo.
      <br />
      <a href="https://docs.amplify.aws/gen2/start/quickstart/nextjs-pages-router/">
        Review next steps of this tutorial.
      </a>
    </div>
  </main>
</template>
