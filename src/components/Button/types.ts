export type TButton = Partial<{
    type: string;
    onClick: () => Promise<void>;
    isLoading: boolean;
    to: string;
    name: string;
    isActive: boolean;
}>;
