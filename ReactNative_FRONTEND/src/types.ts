export type Gymkhana = {
  id: number;
  name: string;
  description?: string | null;
  location?: string | null;
  starts_at?: string | null; // ISO
  ends_at?: string | null; // ISO
  created_at?: string;
  updated_at?: string;
};
