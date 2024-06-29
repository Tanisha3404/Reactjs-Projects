import React from 'react';
import { db } from '../firebase';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faThumbtack, faTrash } from '@fortawesome/free-solid-svg-icons';

function Note({ note, onEdit, onUpdate }) {
    const handlePin = async () => {
        try {
            const noteRef = doc(db, 'notes', note.id);
            await updateDoc(noteRef, { pinned: !note.pinned });
            onUpdate(); 
        } catch (error) {
            console.error('Error updating note:', error);
        }
    };

    const handleDelete = async () => {
        try {
            const noteRef = doc(db, 'notes', note.id);
            await deleteDoc(noteRef);
            toast.success('Note deleted successfully');
            onUpdate(); 
        } catch (error) {
            toast.error('Error deleting note');
            console.error('Error deleting note:', error);
        }
    };

    return (
        <div className="note">
            <h2 className="text-xl font-bold">{note.title}</h2>
            <p className="text-sm text-gray-600">{note.tagline}</p>
            <p>{note.body}</p>
            <div className="note-actions">
                <button onClick={handlePin} className="icon-button">
                    <FontAwesomeIcon icon={faThumbtack} color={note.pinned ? 'gold' : 'black'} />
                </button>
                <button onClick={() => onEdit(note)} className="icon-button">
                    <FontAwesomeIcon icon={faEdit} />
                </button>
                <button onClick={handleDelete} className="icon-button">
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </div>
        </div>
    );
}

export default Note;
