import { IPagination } from './types';

export const usePagination = ({ next, previous, previousPage, nextPage }: IPagination) => {

    const handlePreviousPage = async () => {
        try {
            await previousPage({ url: previous });
        } catch (error) {
            console.log('Error', error);
        };
    };

    const handleNextPage = async () => {
        try {
            await nextPage({ url: next });
        } catch (error) {
            console.log('Error', error);
        };
    };

    return {
        handleNextPage,
        handlePreviousPage
    };
};
