import type { Prisma } from '../../generated/prisma';
import prisma from './prisma';
import type { Schema } from '../types/schema'

export default class DatabaseService {
    constructor(private readonly schema: Schema) {}

    async getAll(userId: string) {
        try {
            const delegate = prisma[this.schema] as any;
            const elements = await delegate.findMany({
                where: { userId },
                orderBy: { createdAt: 'desc' }
            });
            return elements;
        } catch (error) {
            console.error('Error fetching all elements:', error);
            throw error;
        }
    }

    async getUnique(uniqueElement: Prisma.Args<typeof prisma[Schema], 'findUnique'>['where']) {
        try {
            const delegate = prisma[this.schema] as any;
            const element = await delegate.findUnique({ where: uniqueElement});
            return element;
        } catch (error) {
            console.error('Error fetching unique element:', error);
            throw error;
        }
    }

    async create(elementData: Prisma.Args<typeof prisma[Schema], 'create'>['data']) {
        try {
            const delegate = prisma[this.schema] as any;
            const element = await delegate.create({ data: elementData });
            return element;
        } catch (error) {
            console.error('Error creating element:', error);
            throw error;
        }
    }

    async update(
        uniqueElement: Prisma.Args<typeof prisma[Schema], 'findUnique'>['where'],
        elementToUpdate: Prisma.Args<typeof prisma[Schema], 'update'>['data'],
    ) {
        try {
            const delegate = prisma[this.schema] as any;
            const element = await delegate.update({ where: uniqueElement, data: elementToUpdate });
            return element;
        } catch (error) {
            console.error('Error updating element:', error);
            throw error;
        }
    }

    async delete(uniqueElement: Prisma.Args<typeof prisma[Schema], 'findUnique'>['where']) {
        try {
            const delegate = prisma[this.schema] as any;
            const element = await delegate.delete({ where: uniqueElement });
            return element;
        } catch (error) {
            console.error('Error deleting element:', error);
            throw error;
        }
    }
}