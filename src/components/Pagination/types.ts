import { Nullable } from '../../types/global';

export interface IPagination {
    previous: Nullable<string>;
    next: Nullable<string>;
    previousPage: ({ url }: { url: Nullable<string> }) => Promise<any>;
    nextPage: ({ url }: { url: Nullable<string> }) => Promise<any>;
};
