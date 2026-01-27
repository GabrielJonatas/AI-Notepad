import DatabaseService from '../database/service';
import AIService from '../service/ai';
import type { NoteData } from '../types/noteData';
import { ValidateNoteSchema } from '../zod/noteSchema';
import type { Request, Response } from 'express';

const aiService = new AIService(new DatabaseService('ai'));

export const getAiAnalyse = async (req: Request, res: Response) => {
    // TODO
}

export const createAnalyse = async (req: Request, res: Response) => {
    // TODO
}

export async function updateEntry(req: Request, res: Response) {
    // TODO
}

export async function deleteEntry(req: Request, res: Response) {
   // TODO
}