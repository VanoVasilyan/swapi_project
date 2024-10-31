import { useState } from "react";

export const useSingleFilm = () => {
    const [showMore, setShowMore] = useState(false);

    const handleShowMore = () => {
        setShowMore(prev => !prev);
    };

    return {
        showMore,
        handleShowMore
    }
};
