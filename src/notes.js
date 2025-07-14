import { insertDB, getDB, saveDB } from './db.js';

export const newNote = async (note, tags) => {
  const data = {
    tags,
    content: note,
    id: Date.now(),
  };
  await insertDB(data);
  return data;
};

export const getAllNotes = async () => {
  const db = await getDB();
  return db.notes;
};

export const getNote = async (id) => {
  const notes = await getAllNotes();
  return notes.find((note) => note.id === id);
};

export const findNotes = async (filter) => {
  const notes = await getAllNotes();
  return notes.filter((note) =>
    note.content.toLowerCase().includes(filter.toLowerCase())
  );
};

export const removeNote = async (id) => {
  const note = await getNote(id);

  if (note) {
    const allNotes = await getAllNotes();
    const newNotes = allNotes.filter((note) => note.id !== id);
    await saveDB({ notes: newNotes });
    return id;
  }
};

export const removeAllNodes = async () => {
  await saveDB({ notes: [] });
};
