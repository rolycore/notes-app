<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="note">
      <h2>{{ note.title }}</h2>
      <p>{{ note.content }}</p>
      <p><small>{{ note.date }}</small></p>
      <button @click="editNote">Edit</button>
      <button @click="deleteNote">Delete</button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      note: {
        type: Object,
        required: true
      }
    },
    methods: {
      editNote() {
        this.$emit('edit-note', this.note);
      },
      deleteNote() {
        this.$emit('delete-note', this.note);
      }
    }
  };
  </script>
  
  <style scoped>
  .note {
    background: #f9f9f9;
    padding: 20px;
    margin-bottom: 10px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 600px;
  }
  
  .note h2 {
    margin: 0;
    font-size: 1.5em;
    color: #333;
  }
  
  .note p {
    color: #666;
    margin: 10px 0;
  }
  
  button {
    margin: 5px;
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.3s;
  }
  
  button:hover {
    background: #42b983;
    color: white;
  }
  
  button:nth-child(2):hover {
    background: red;
    color: white;
  }
  
  /* Responsive Styles */
  @media (max-width: 600px) {
    .note {
      padding: 10px;
    }
  
    button {
      padding: 6px 12px;
    }
  }
  </style>
  