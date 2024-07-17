<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div>
      <NoteForm @save-note="handleSaveNote"/>
      <NoteList />
    </div>
  </template>
  
  <script>
  import NoteForm from '../components/NoteForm.vue';
  import NoteList from '../components/NoteList.vue';
  
  export default {
    components: {
      NoteForm,
      NoteList
    },
    methods: {
        handleSaveNote(note) {
      // Si la nota tiene un ID, estamos editando una nota existente.
      if (note.id) {
        this.$store.dispatch('updateNote', note);
      } else {
        // Si no tiene un ID, estamos agregando una nueva nota.
        this.$store.dispatch('addNote', note);
      }
    },
    }
  };
  </script>
  
  <style scoped>
  /* estilos opcionales */
  </style>
  