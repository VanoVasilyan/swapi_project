export const splitWords = (word: string): string => {
    const indexOfWord = word.split('').findIndex(item => item === item.toUpperCase());

    if (indexOfWord !== -1) {
        return word[0].toUpperCase() + word.slice(1, indexOfWord) + ' ' + word.slice(indexOfWord) + ':';
    }

    return word[0].toUpperCase() + word.slice(1) + ':';
};
