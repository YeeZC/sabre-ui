export const testColor = (color: string | undefined | null): boolean => {
    if (!color) {
        return false;
    }
    const re1 = /^#([0-9a-f]{6}|[0-9a-f]{3})$/i;
    return re1.test(color);
}