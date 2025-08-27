import type { Prisma, PrismaClient } from '../../generated/prisma';
import prisma from './prisma';

export class DatabaseService {
    constructor(private readonly prisma: PrismaClient) {}

    async getAllNotes() {
        const notes = await this.prisma.note.findMany();
        return notes;
    }

    async getUniqueNote(object: Prisma.NoteWhereUniqueInput) {
        const note = await this.prisma.note.findUnique({
            where: object,
        });
        return note;
    }

    async createNote(object: Prisma.NoteCreateInput) {
        const note = await this.prisma.note.create({ data: object });
        return note;
    }

    async updateNote(
        filter: Prisma.NoteWhereUniqueInput,
        object: Prisma.NoteUpdateInput,
    ) {
        const note = await this.prisma.note.update({ where: filter, data: object });
        return note;
    }

    async deleteNote(object: Prisma.NoteWhereUniqueInput) {
        const note = await this.prisma.note.delete({ where: object });
        return note;
    }
}

export default new DatabaseService(prisma);