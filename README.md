# Notes App

Una aplicación de notas simple desarrollada con Vue.js, Vue-router y Vuex.

## Características

- Agregar notas con título y contenido.
- Editar notas existentes.
- Eliminar notas.
- Mostrar la fecha en que se creó o editó la nota.

## Requisitos

- Node.js (versión 14 o superior)
- npm (versión 6 o superior) o yarn

## Instalación

1. Clona este repositorio:

```bash
git clone https://github.com/rolycore/notes-app.git
cd notes-app
```

2. Instala las dependencias:

```bash
npm install
```

o

```bash
yarn install
```

## Uso

Para ejecutar la aplicación en modo desarrollo:

```bash
npm run serve
```

o

```bash
yarn serve
```

Abre tu navegador y ve a `http://localhost:8080`.

## Estructura del Proyecto

```
notes-app/
│
├── public/
│   └── index.html
│
├── src/
│   ├── assets/
│   │   └── logo.png
│   │
│   ├── components/
│   │   ├── Note.vue
│   │   ├── NoteForm.vue
│   │   └── NoteList.vue
│   │
│   ├── store/
│   │   └── index.js
│   │
│   ├── views/
│   │   └── Home.vue
│   │
│   ├── App.vue
│   ├── main.js
│   └── router.js
│
├── .gitignore
├── babel.config.js
├── package.json
└── README.md
```

## Componentes

### NoteForm.vue

Formulario para agregar y editar notas.

```vue
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
      localNote: { ...this.note },
    };
  },
  methods: {
    submitForm() {
      this.$emit('save-note', { ...this.localNote, date: new Date().toLocaleString() });
      this.clearForm();
    },
    clearForm() {
      this.localNote.title = '';
      this.localNote.content = '';
    },
  },
  watch: {
    note: {
      handler(newNote) {
        this.localNote = { ...newNote };
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}
label {
  margin-top: 10px;
}
input, textarea {
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
button {
  align-self: flex-end;
  background-color: #007BFF;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
</style>
```

### NoteList.vue

Lista de notas.

```vue
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
    ...mapState(['notes']),
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
  },
};
</script>

<style scoped>
.note-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
```

### Note.vue

Componente individual de nota.

```vue
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
      required: true,
    },
  },
  methods: {
    editNote() {
      this.$emit('edit-note', this.note);
    },
    deleteNote() {
      this.$emit('delete-note', this.note);
    },
  },
};
</script>

<style scoped>
.note {
  background: #f9f9f9;
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
button {
  margin: 5px;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  opacity: 0.8;
}
</style>
```

## Vuex Store

Configuración del store de Vuex para gestionar las notas.

```javascript
// store.js
import { createStore } from 'vuex';

const store = createStore({
  state: {
    notes: [],
  },
  mutations: {
    setNotes(state, notes) {
      state.notes = notes;
    },
    addNote(state, note) {
      state.notes.push(note);
    },
    updateNote(state, updatedNote) {
      const index = state.notes.findIndex(note => note.id === updatedNote.id);
      if (index !== -1) {
        state.notes.splice(index, 1, updatedNote);
      }
    },
    deleteNote(state, noteId) {
      state.notes = state.notes.filter(note => note.id !== noteId);
    },
  },
  actions: {
    loadNotes({ commit }) {
      const notes = []; // Reemplaza con la lógica de carga de notas
      commit('setNotes', notes);
    },
    addNote({ commit }, note) {
      commit('addNote', { ...note, id: Date.now().toString() });
    },
    updateNote({ commit }, note) {
      commit('updateNote', note);
    },
    deleteNote({ commit }, noteId) {
      commit('deleteNote', noteId);
    },
  },
});

export default store;
```

## Estilos Globales

```css
body {
  font-family: Arial, sans-serif;
  background: #f5f5f5;
  margin: 0;
  padding: 0;
}

#app {
  width: 100%;
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
  background: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
```

## Contribuir

Si deseas contribuir a este proyecto, por favor haz un fork del repositorio, crea una rama con tus cambios y envía un pull request.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.

## Contacto

Para cualquier consulta o problema, puedes contactarme a través de [shalomsolutiontech@gmail.com](mailto:shalomsolutiontech@gmail.com).
