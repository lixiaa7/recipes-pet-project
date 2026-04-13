type SliderRefs = {
    current: Record<string, HTMLDivElement | null>;
};

export const scrollCategory = (category: string, direction: "left" | "right", sliderRefs: SliderRefs) => {
    const slider = sliderRefs.current[category];

    if (!slider) return;

    const offset = slider.clientWidth * 0.82;
    slider.scrollBy({
        left: direction === "right" ? offset : -offset,
        behavior: "smooth",
    });
};
