export type TButton = Partial<{
    type: string;
    onClick: (() => Promise<void>) | (() => void);
    isLoading: boolean;
    to: string;
    name: string;
    isActive: boolean;
}>;
