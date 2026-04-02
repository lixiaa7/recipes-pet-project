export const capitalize = (str: string) => {
    if (!str) return '';

    return decodeURIComponent(str)
        .replace(/-/g, ' ')
        .split(' ')
        .filter(Boolean)
        .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
}
