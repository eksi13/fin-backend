export interface CategoryData {
    id: string; // UUID
    name: string;
    lastUpdated: Date;
    budget?: number | null;
}