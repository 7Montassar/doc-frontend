//old document type
export interface OldDocumentType {
    id: number;
    user_id: number;
    category: string;
    created_at: string;
    filename: string;
    status: 'pending' | 'migrated';
}