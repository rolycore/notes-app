<template>
    <div class="note-list">
      <Note
        v-for="note in notes"
        :key="note.id"
        :note="note"
        @edit-note="editNote"
        @delete-note="deleteNote"
      />
      <NoteForm
      v-if="editingNote"
      :note="editingNote"
      @save-note="updateNote"
      />
    </div>
  </template>
  
  <script>
  import { mapState } from 'vuex';
  import Note from './Note.vue';
  import NoteForm from './NoteForm';
  export default {
    components: {
      Note,
      NoteForm,
    },
    data() {
    return {
      editingNote: null,
    };
  },
    computed: {
      ...mapState(['notes'])
    },
    methods: {
      editNote(note) {
        this.editingNote = { ...note };
      },
      deleteNote(note) {
        this.$store.dispatch('deleteNote', note.id);
      },
      updateNote(note) {
      this.$store.dispatch('updateNote', note);
      this.editingNote = null;
    },
    }
  };
  </script>
  
  <style scoped>
  .note-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background: #f5f5f5;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-top: 20px;
  }
  
  @media (max-width: 600px) {
    .note-list {
      padding: 10px;
    }
  }
  </style>
  