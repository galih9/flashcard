const mapping: { [key: string]: string } = {
    'sch': 'щ',
    'sh': 'ш',
    'ch': 'ч',
    'ts': 'ц',
    'ye': 'е',
    'yo': 'ё',
    'yu': 'ю',
    'ya': 'я',
    'zh': 'ж',
    'a': 'а', 'b': 'б', 'v': 'в', 'g': 'г', 'd': 'д', 'e': 'э',
    'z': 'з', 'i': 'и', 'j': 'й', 'k': 'к', 'l': 'л', 'm': 'м', 'n': 'н', 'o': 'о',
    'p': 'п', 'r': 'р', 's': 'с', 't': 'т', 'u': 'у', 'f': 'ф', 'h': 'х',
    'y': 'ы', "'": 'ь',
    'Sch': 'Щ',
    'Sh': 'Ш',
    'Ch': 'Ч',
    'Ts': 'Ц',
    'Ye': 'Е',
    'Yo': 'Ё',
    'Yu': 'Ю',
    'Ya': 'Я',
    'Zh': 'Ж',
    'A': 'А', 'B': 'Б', 'V': 'В', 'G': 'Г', 'D': 'Д', 'E': 'Э',
    'Z': 'З', 'I': 'И', 'J': 'Й', 'K': 'К', 'L': 'Л', 'M': 'М', 'N': 'Н', 'O': 'О',
    'P': 'П', 'R': 'Р', 'S': 'С', 'T': 'Т', 'U': 'У', 'F': 'Ф', 'H': 'Х',
    'Y': 'Ы',
};

export const transliterate = (text: string): string => {
    let result = '';
    let i = 0;
    while (i < text.length) {
        let matched = false;
        // Check for 3-character matches
        if (i + 3 <= text.length) {
            const sub = text.substring(i, i + 3);
            if (mapping[sub]) {
                result += mapping[sub];
                i += 3;
                matched = true;
            }
        }
        // Check for 2-character matches
        if (!matched && i + 2 <= text.length) {
            const sub = text.substring(i, i + 2);
            if (mapping[sub]) {
                result += mapping[sub];
                i += 2;
                matched = true;
            }
        }
        // Check for 1-character matches
        if (!matched) {
            const sub = text.substring(i, i + 1);
            if (mapping[sub]) {
                result += mapping[sub];
            } else {
                result += sub;
            }
            i += 1;
        }
    }
    return result;
};
