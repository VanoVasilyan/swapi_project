export interface IFilter {
    title: string;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    data: any
};
