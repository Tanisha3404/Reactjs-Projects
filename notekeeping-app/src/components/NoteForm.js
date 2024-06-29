import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, updateDoc, addDoc, collection } from 'firebase/firestore';

function NoteForm({ note, onClose }) {
    const [title, setTitle] = useState('');
    const [tagline, setTagline] = useState('');
    const [body, setBody] = useState('');

    useEffect(() => {
        if (note) {
            setTitle(note.title);
            setTagline(note.tagline);
            setBody(note.body);
        }
    }, [note]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (note) {
                const noteRef = doc(db, 'notes', note.id);
                await updateDoc(noteRef, { title, tagline, body });
            } else {
                await addDoc(collection(db, 'notes'), { title, tagline, body, pinned: false, createdAt: new Date() });
            }
            onClose();
        } catch (error) {
            console.error('Error saving note:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-white border rounded shadow-lg">
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="block w-full mb-2 p-2 border"
            />
            <input
                type="text"
                placeholder="Tagline"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="block w-full mb-2 p-2 border"
            />
            <textarea
                placeholder="Body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="block w-full mb-2 p-2 border"
            ></textarea>
            <button type="submit" className="p-2 bg-blue-500 text-white rounded">Save</button>
            <button type="button" onClick={onClose} className="p-2 bg-red-500 text-white rounded ml-2">Cancel</button>
        </form>
    );
}

export default NoteForm;
