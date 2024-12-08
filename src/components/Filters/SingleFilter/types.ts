export interface ISingleFilter {
    title: string;
    onChange: (check: string, title: string) => void;
    data: string[];
    titleColor: string;
    labelColor: string;
};
