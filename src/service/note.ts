import DatabaseService from '../database/service'

interface NoteData {
    user: {
        create: {
            email: string;
            password: string;
        };
    };
    title: string;
    content: string;
}

export default class NoteService {
    constructor(private readonly databaseService: DatabaseService) {}

    async getAllNotes() {
        return await this.databaseService.getAll();
    }  

    async getNoteById(id: number) {
        return await this.databaseService.getUnique({ id: id });
    }

    async createNote(noteData: NoteData) {
        return await this.databaseService.create(noteData);
    }

    async updateNote(id: number, noteToUpdate: Partial<NoteData>) {
        return await this.databaseService.update({ id: id }, noteToUpdate);
    }

    async deleteNote(id: number) {
        return await this.databaseService.delete({ id: id });
    }
}