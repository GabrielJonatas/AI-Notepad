import type { Prisma, PrismaClient } from '../../generated/prisma';
import prisma from './prisma';

export class DatabaseService {
    constructor(private readonly prisma: PrismaClient) {}

    async getAllNotes() {
        try {
            const notes = await this.prisma.note.findMany();
            return notes;
        } catch (error) {
            console.error('Error fetching all notes:', error);
            throw error;
        }
    }

    async getUniqueNote(object: Prisma.NoteWhereUniqueInput) {
        try {
            const note = await this.prisma.note.findUnique({
                where: object,
            });
            return note;
        } catch (error) {
            console.error('Error fetching unique note:', error);
            throw error;
        }
    }

    async createNote(object: Prisma.NoteCreateInput) {
        try {
            const note = await this.prisma.note.create({ data: object });
            return note;
        } catch (error) {
            console.error('Error creating note:', error);
            throw error;
        }
    }

    async updateNote(
        filter: Prisma.NoteWhereUniqueInput,
        object: Prisma.NoteUpdateInput,
    ) {
        try {
            const note = await this.prisma.note.update({ where: filter, data: object });
            return note;
        } catch (error) {
            console.error('Error updating note:', error);
            throw error;
        }
    }

    async deleteNote(object: Prisma.NoteWhereUniqueInput) {
        try {
            const note = await this.prisma.note.delete({ where: object });
            return note;
        } catch (error) {
            console.error('Error deleting note:', error);
            throw error;
        }
    }
}

export default new DatabaseService(prisma);