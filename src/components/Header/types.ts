export type THeader = Partial<{
    searchvalue: string;
    delayDebounceSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}>;
