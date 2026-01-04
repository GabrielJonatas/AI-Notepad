import Router from 'express';
import { createEntry, deleteEntry, getAllEntries, getEntryById, updateEntry } from '../controller/note';

export const notesRouter = Router();

notesRouter.get('/', getAllEntries) 

notesRouter.get('/:id', getEntryById);

notesRouter.post('/createNote', createEntry);

notesRouter.put('/updateNote/:id', updateEntry);

notesRouter.delete('/deleteNote/:id', deleteEntry);