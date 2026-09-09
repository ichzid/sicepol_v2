export type Row = Record<string, string | number>;
export type Column = { key: string; label: string; money?: boolean; width?: string };
export type Notify = (message: string) => void;
