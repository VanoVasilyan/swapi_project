export interface IFilter {
    title: string;
    onChange: (check: string, title: string) => void;
    data: any
};
