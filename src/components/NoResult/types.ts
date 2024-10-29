import { Nullable } from "../../types/global";

export type TNoResult = Partial<{
    text: string;
    goBack: Nullable<() => void>;
}>;
