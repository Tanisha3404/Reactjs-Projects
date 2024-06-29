import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import Note from './components/Note';
import NoteForm from './components/NoteForm';
import Pagination from './components/Pagination';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { getDocs, collection, query, orderBy } from 'firebase/firestore';

function App() {
  const [notes, setNotes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [notesPerPage] = useState(6);
  const [selectedNote, setSelectedNote] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchNotes = async () => {
    try {
      const q = query(collection(db, 'notes'), orderBy('pinned', 'desc'), orderBy('createdAt', 'desc'));
      const notesSnapshot = await getDocs(q);
      const notesData = notesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setNotes(notesData);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleEdit = (note) => {
    setSelectedNote(note);
    setShowForm(true);
  };

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
  const currentNotes = notes.slice((currentPage - 1) * notesPerPage, currentPage * notesPerPage);

  return (
    <div className="container">
      <div className="header">
        <h1 className="text-3xl font-bold mb-4">Notekeeper</h1>
        <button onClick={() => setShowForm(true)} className="mb-4 p-2 bg-green-500 text-white rounded">Add Note</button>
      </div>
      <div className="grid">
        {currentNotes.map(note => (
          <Note key={note.id} note={note} onEdit={handleEdit} onUpdate={fetchNotes} />
        ))}
      </div>
      <Pagination
        notesPerPage={notesPerPage}
        totalNotes={notes.length}
        paginate={handlePageChange}
        currentPage={currentPage}
      />
      {showForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <NoteForm note={selectedNote} onClose={() => { setShowForm(false); setSelectedNote(null); fetchNotes(); }} />
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default App;
