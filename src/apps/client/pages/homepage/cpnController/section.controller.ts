import { useEffect, useRef, useState } from 'react';

const ITEMS_PER_PAGE = 5;

export const useSectionController = (totalItems: number) => {
    const [startIndex, setStartIndex] = useState(0);
    const trackRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const track = trackRef.current;
        if (!track || totalItems === 0) return;

        const targetCard = track.children[startIndex] as HTMLElement | undefined;
        if (targetCard) {
            track.scrollTo({ left: targetCard.offsetLeft, behavior: 'smooth' });
        }
    }, [startIndex, totalItems]);

    const handleNext = () => {
        if (totalItems <= ITEMS_PER_PAGE) return;

        setStartIndex((prev) => {
            const next = prev + ITEMS_PER_PAGE;
            if (prev + ITEMS_PER_PAGE >= totalItems) return 0;
            if (next + ITEMS_PER_PAGE > totalItems) return totalItems - ITEMS_PER_PAGE;
            return next;
        });
    };

    const handlePrev = () => {
        if (totalItems <= ITEMS_PER_PAGE) return;

        setStartIndex((prev) => {
            if (prev === 0) return Math.max(0, totalItems - ITEMS_PER_PAGE);
            return Math.max(0, prev - ITEMS_PER_PAGE);
        });
    };

    return {
        trackRef,
        startIndex,
        handleNext,
        handlePrev,
    };
};