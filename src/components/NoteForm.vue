<!-- eslint-disable vue/no-mutating-props -->
<template>
    <form @submit.prevent="submitForm">
    <div>
      <label for="title">Title:</label>
      <input type="text" v-model="localNote.title" id="title" />
    </div>
    <div>
      <label for="content">Content:</label>
      <textarea v-model="localNote.content" id="content"></textarea>
    </div>
    <button type="submit">Save Note</button>
  </form>
  </template>
  
  <script>
  export default {
    props: {
    note: {
      type: Object,
      default: () => ({
        title: '',
        content: '',
        date: new Date().toLocaleString(),
      }),
    },
  },
  data() {
    return {
      localNote: { ...this.note }
    };
  },
  methods: {
    submitForm() {
      this.$emit('save-note', { ...this.localNote, date: new Date().toLocaleString() });
      this.limpiarForm();
    },
    limpiarForm() {
      this.localNote.title = '';
      this.localNote.content = '';
    }
  },
  watch: {
    note: {
      handler(newNote) {
        this.localNote = { ...newNote };
      },
      deep: true,
    }
  }
  };
  </script>
  
  <style scoped>
  form {
    display: flex;
    flex-direction: column;
    background: #f9f9f9;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  label {
    margin-top: 10px;
    font-weight: bold;
    color: #333;
  }
  
  input,
  textarea {
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%;
    box-sizing: border-box;
    font-size: 16px;
  }
  
  textarea {
    resize: vertical;
    min-height: 100px;
  }
  
  button {
    align-self: flex-end;
    padding: 10px 20px;
    background: #42b983;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.3s;
  }
  
  button:hover {
    background: #3a9d72;
  }
  
  /* Responsive Styles */
  @media (max-width: 600px) {
    form {
      padding: 10px;
    }
  
    input,
    textarea {
      font-size: 14px;
    }
  
    button {
      padding: 8px 16px;
    }
  }
  </style>
  