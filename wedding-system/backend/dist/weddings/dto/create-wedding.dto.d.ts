import { WeddingStatus } from '@prisma/client';
export declare class CreateWeddingDto {
    bride_name: string;
    groom_name: string;
    couple_email: string;
    couple_phone: string;
    wedding_date: string;
    venue: string;
    city: string;
    state: string;
    estimated_guests: number;
    total_budget: number;
    status?: WeddingStatus;
    notes?: string;
}
