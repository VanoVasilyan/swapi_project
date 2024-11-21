export const removeObjectEmptyProperties = (item: Record<string, unknown>) => {
    const finalResult: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(item)) {
        if(key === 'name' && value === 'unknown') {
            finalResult[key] = 'New Planet'
        }
        if (value !== '0' && value !== 'unknown' && !(Array.isArray(value) && !value.length)) {
            finalResult[key] = value
        }
    };
    return finalResult
};
