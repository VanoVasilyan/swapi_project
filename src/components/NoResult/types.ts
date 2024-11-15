import { Nullable } from '../../types/global';

export type TNoResult = Partial<{
    text: string;
    errorFromRouter: string;
    goBack: Nullable<() => void>;
}>;
