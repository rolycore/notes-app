import { createStore } from 'vuex';

const store = createStore({
  state: {
    notes: []
  },
  mutations: {
    setNotes(state, notes) {
        state.notes = notes;
      },
    addNote (state, note) {
      state.notes.push(note);
    },
    updateNote (state, updatedNote) {
        const index = state.notes.findIndex(note => note.id === updatedNote.id);
        if (index !== -1) {
          state.notes.splice(index, 1, updatedNote);
        }
    },
    deleteNote (state, noteId) {
      state.notes = state.notes.filter(note => note.id !== noteId);
    }
  },
  actions: {
    loadNotes({ commit }) {
        // Cargar notas desde una API o almacenamiento local
        const notes = []; // Reemplaza con la lógica de carga de notas
        commit('setNotes', notes);
      },
    addNote ({ commit }, note) {
        commit('addNote', { ...note, id: Date.now() });
      },
    saveNote ({ commit }, note) {
      if (note.id) {
        commit('updateNote', note);
      } else {
        note.id = Date.now();
        commit('addNote', note);
      }
    },
    editNote ({ commit }, note) {
      commit('updateNote', note);
    },
    deleteNote ({ commit }, noteId) {
      commit('deleteNote', noteId);
    }
  },
  getters: {
    notes: state => state.notes,
  },
});

export default store;
