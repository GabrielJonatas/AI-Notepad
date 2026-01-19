import DatabaseService from '../database/service';
import type { NoteData } from '../types/noteData';

export default class NoteService {
    constructor(private readonly databaseService: DatabaseService) {}

    async getAllNotes(userId: string) {
        return await this.databaseService.getAll(userId);
    }  

    async getNoteById(id: string, userId: string) {
        return await this.databaseService.getUnique({ id: id, userId: userId });
    }

    async createNote(noteData: NoteData) {
        return await this.databaseService.create(noteData);
    }

    async updateNote(id: string, noteToUpdate: Partial<NoteData>) {
        return await this.databaseService.update({ id: id }, noteToUpdate);
    }

    async deleteNote(id: string) {
        return await this.databaseService.delete({ id: id });
    }
}