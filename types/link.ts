export interface Link {
    id: number;
    code: string;
    target_url: string;
    total_clicks: number;
    last_clicked: string | null;
    created_at: string;
}