import Router from 'express';
import { createEntry, deleteEntry, getAllEntries, getEntryById, updateEntry } from '../controller/note';

export const router = Router();

router.get('/', getAllEntries) 

router.get('/:id', getEntryById);

router.post('/createNote', createEntry);

router.put('/updateNote/:id', updateEntry);

router.delete('/deleteNote/:id', deleteEntry);