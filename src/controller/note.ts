import DatabaseService from '../database/service'
import { ValidateNoteSchema } from '../zod/noteSchema';
import type {Request, Response} from 'express';

export const getAllEntries = async (req: Request, res: Response) => {
    try {
        const notes = await DatabaseService.getAllNotes();
        return res.status(200).send(notes);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to retrieve notes.' });
    }
}

export const getEntryById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id ?? '-1', 10);

    if(id < 0 || isNaN(id)) {
        return res.status(400).json({
            error: "An Invalid ID was sent"
        });
    }

    try {
        const note =  await DatabaseService.getUniqueNote({id : id});
        if(!note) return res.status(404).json({ error: 'Note not found' });
        return res.status(200).send(note);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to retrieve note.' });
    }
}

export const createEntry = async (req: Request,res: Response) => {
    const noteValidated = ValidateNoteSchema.safeParse(req.body);

    if(!noteValidated.success) {
        return res.status(400).json({
            error: noteValidated.error.issues[0]?.message ?? 'Unknown error'
        })
    }
    
    try {
        const createdNote = await DatabaseService.createNote(noteValidated.data);
        return res.status(201).send(createdNote);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to create note.' });
    }
}

export async function updateEntry(req: Request,res: Response){
    const id = parseInt(req.params.id ?? '-1', 10);

    if(id < 0 || isNaN(id)) {
        return res.status(400).json({
            error: "An Invalid ID was sent"
        });
    }

    try {
        const note =  await DatabaseService.getUniqueNote({id : id});
        if(!note) return res.status(404).json({ error: 'Note not found' });

        const noteValidated = ValidateNoteSchema.safeParse(req.body);

        if(!noteValidated.success) {
            return res.status(400).json({
                error: noteValidated.error.issues[0]?.message ?? 'Unknown error'
            })
        }
        
        const updatedNote = await DatabaseService.updateNote({ id:id }, noteValidated.data);
        return res.status(200).send(updatedNote);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to update note.' });
    }
}

export async function deleteEntry(req: Request,res: Response){
    const id = parseInt(req.params.id ?? '-1', 10);

    if(id < 0 || isNaN(id)) {
        return res.status(400).json({
            error: "An Invalid ID was sent"
        });
    }

    try {
        const note =  await DatabaseService.getUniqueNote({id : id});
        if(!note) return res.status(404).json({ error: 'Note not found' });

        const deletedNote = await DatabaseService.deleteNote({ id:id });
        return res.status(200).send(deletedNote);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to delete note.' });
    }
}