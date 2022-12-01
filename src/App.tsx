import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import NewNote from "./NewNote";
import { useLocalStorage } from "./useLocalStorage";
import { useMemo } from "react";
import { v4 as uuidV4 } from "uuid"

export type Note = {
  id: string;
} & NoteData;

export type RawNote = {
  id: string;
} & RawNoteData;

export type RawNoteData = {
  title: string;
  markdown: string;
  tagIds: string[];
};
export type NoteData = {
  title: string;
  markdown: string;
  tags: Tag[];
};
export type Tag = {
  id: string;
  label: string;
};

const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

const notesWithTags = useMemo(() => {
  return notes.map((note) => {
    return {
      ...note,
      tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
    };
  });
}, [notes, tags]);

const onCreateNote = ({ tags, ...data }: NoteData) => {
  setNotes((prevNote) => {
    return [
      ...prevNote,
      { ...data, id: uuidV4(), tagIds: tags.map((tag) => tag) },
    ];
  });
};

function App() {
  return (
    <Container className="my-4">
      <Routes>
        <Route path="/" element={<h1>Home</h1>}></Route>
        <Route path="/new" element={<NewNote />}></Route>
        <Route path="*" element={<Navigate to="/" />}></Route>
        <Route path="/:id">
          <Route index element={<h1>Show</h1>}></Route>
          <Route path="edit" element={<h1>Edit</h1>}></Route>
        </Route>
      </Routes>
    </Container>
  );
}

export default App;
