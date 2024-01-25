export function createPixelArtSentence(text, pixelChar) {
    const alphabet = {
        'a': [
            `  ${pixelChar}  `,
            ` ${pixelChar} ${pixelChar} `,
            `${pixelChar}${pixelChar}${pixelChar}${pixelChar}${pixelChar}`,
            `${pixelChar}   ${pixelChar}`,
            `${pixelChar}   ${pixelChar}`
        ],
        'b': [
            `${pixelChar}${pixelChar}${pixelChar} `,
            `${pixelChar}   ${pixelChar}`,
            `${pixelChar}${pixelChar}${pixelChar} `,
            `${pixelChar}   ${pixelChar}`,
            `${pixelChar}${pixelChar}${pixelChar} `
        ],
        'c': [
            ` ${pixelChar}${pixelChar}${pixelChar}`,
            `${pixelChar}  `,
            `${pixelChar}  `,
            `${pixelChar}  `,
            ` ${pixelChar}${pixelChar}${pixelChar}`
        ],
        'd': [
            `${pixelChar}${pixelChar}${pixelChar} `,
            `${pixelChar}   ${pixelChar}`,
            `${pixelChar}   ${pixelChar}`,
            `${pixelChar}   ${pixelChar}`,
            `${pixelChar}${pixelChar}${pixelChar} `
        ],
        'e': [
            `${pixelChar}${pixelChar}${pixelChar}${pixelChar} `,
            `${pixelChar}    `,
            `${pixelChar}${pixelChar}${pixelChar}  `,
            `${pixelChar}    `,
            `${pixelChar}${pixelChar}${pixelChar}${pixelChar} `
        ],
        'f': [
            `${pixelChar}${pixelChar}${pixelChar}${pixelChar}${pixelChar}`,
            `${pixelChar}  `,
            `${pixelChar}${pixelChar}${pixelChar}`,
            `${pixelChar}  `,
            `${pixelChar}  `
        ],
        'g': [
            ` ${pixelChar}${pixelChar}${pixelChar}`,
            `${pixelChar}  `,
            `${pixelChar} ${pixelChar}${pixelChar}`,
            `${pixelChar}   ${pixelChar}`,
            ` ${pixelChar}${pixelChar}${pixelChar}`
        ],
        'h': [
            `${pixelChar}   ${pixelChar}`,
            `${pixelChar}   ${pixelChar}`,
            `${pixelChar}${pixelChar}${pixelChar}`,
            `${pixelChar}   ${pixelChar}`,
            `${pixelChar}   ${pixelChar}`
        ],
        'i': [
            `${pixelChar}${pixelChar}${pixelChar}`,
            `  ${pixelChar}  `,
            `  ${pixelChar}  `,
            `  ${pixelChar}  `,
            `${pixelChar}${pixelChar}${pixelChar}`
        ],
        'j': [
            `  ${pixelChar}${pixelChar}`,
            `   ${pixelChar}`,
            `   ${pixelChar}`,
            `${pixelChar} ${pixelChar}`,
            ` ${pixelChar}  `
        ],
        'k': [
            `${pixelChar}   ${pixelChar}`,
            `${pixelChar} ${pixelChar} `,
            `${pixelChar}${pixelChar}  `,
            `${pixelChar} ${pixelChar} `,
            `${pixelChar}   ${pixelChar}`
        ],
        'l': [
            `${pixelChar}   `,
            `${pixelChar}   `,
            `${pixelChar}   `,
            `${pixelChar}   `,
            `${pixelChar}${pixelChar}${pixelChar}${pixelChar}`
        ],
        'm': [
            `${pixelChar}   ${pixelChar}`,
            `${pixelChar}${pixelChar} ${pixelChar}${pixelChar}`,
            `${pixelChar} ${pixelChar} ${pixelChar}`,
            `${pixelChar}   ${pixelChar}`,
            `${pixelChar}   ${pixelChar}`
        ],
        'n': [
            `${pixelChar}   ${pixelChar}`,
            `${pixelChar}${pixelChar}  ${pixelChar}`,
            `${pixelChar} ${pixelChar} ${pixelChar}`,
            `${pixelChar}  ${pixelChar}${pixelChar}`,
            `${pixelChar}   ${pixelChar}`
        ],
        'o': [
            ` ${pixelChar}${pixelChar}${pixelChar} `,
            `${pixelChar}   ${pixelChar}`,
            `${pixelChar}   ${pixelChar}`,
            `${pixelChar}   ${pixelChar}`,
            ` ${pixelChar}${pixelChar}${pixelChar} `
        ],
        'p': [
            `${pixelChar}${pixelChar}${pixelChar} `,
            `${pixelChar}   ${pixelChar}`,
            `${pixelChar}${pixelChar}${pixelChar} `,
            `${pixelChar}  `,
            `${pixelChar}  `
        ],
        'q': [
            ` ${pixelChar}${pixelChar}${pixelChar} `,
            `${pixelChar}   ${pixelChar}`,
            `${pixelChar} ${pixelChar} ${pixelChar}`,
            `  ${pixelChar}${pixelChar}`,
            `    ${pixelChar}`
        ],
        'r': [
            `${pixelChar}${pixelChar}${pixelChar} `,
            `${pixelChar}   ${pixelChar}`,
            `${pixelChar}${pixelChar}${pixelChar} `,
            `${pixelChar} ${pixelChar} `,
            `${pixelChar}   ${pixelChar}`
        ],
        's': [
            ` ${pixelChar}${pixelChar}${pixelChar}`,
            `${pixelChar}  `,
            ` ${pixelChar}${pixelChar}${pixelChar}`,
            `   ${pixelChar}`,
            `${pixelChar}${pixelChar}${pixelChar} `
        ],
        't': [
            `${pixelChar}${pixelChar}${pixelChar}${pixelChar}${pixelChar}`,
            `  ${pixelChar}  `,
            `  ${pixelChar}  `,
            `  ${pixelChar}  `,
            `  ${pixelChar}  `
        ],
        'u': [
            `${pixelChar}   ${pixelChar}`,
            `${pixelChar}   ${pixelChar}`,
            `${pixelChar}   ${pixelChar}`,
            `${pixelChar}   ${pixelChar}`,
            ` ${pixelChar}${pixelChar}${pixelChar} `
        ],
        'v': [
            `${pixelChar}     ${pixelChar} `,
            `${pixelChar}     ${pixelChar} `,
            ` ${pixelChar}   ${pixelChar}  `,
            `  ${pixelChar} ${pixelChar}   `,
            `   ${pixelChar}    `
        ],
        'w': [
            `${pixelChar}   ${pixelChar}`,
            `${pixelChar}   ${pixelChar}`,
            `${pixelChar} ${pixelChar} ${pixelChar}`,
            `${pixelChar}${pixelChar} ${pixelChar}${pixelChar}`,
            `${pixelChar}   ${pixelChar}`
        ],
        'x': [
            `${pixelChar}   ${pixelChar}`,
            ` ${pixelChar} ${pixelChar} `,
            `  ${pixelChar}  `,
            ` ${pixelChar} ${pixelChar} `,
            `${pixelChar}   ${pixelChar}`
        ],
        'z': [
            `${pixelChar}${pixelChar}${pixelChar}${pixelChar}${pixelChar}`,
            `    ${pixelChar}`,
            `  ${pixelChar}  `,
            `${pixelChar}    `,
            `${pixelChar}${pixelChar}${pixelChar}${pixelChar}${pixelChar}`
        ],
        ' ': [
            '     ',
            '     ',
            '     ',
            '     ',
            '     '
        ],
        '1': [
            `  ${pixelChar}  `,
            ` ${pixelChar}${pixelChar}  `,
            `  ${pixelChar}  `,
            `  ${pixelChar}  `,
            `${pixelChar}${pixelChar}${pixelChar}${pixelChar}${pixelChar}`
        ],
        '2': [
            ` ${pixelChar}${pixelChar}${pixelChar}${pixelChar} `,
            `${pixelChar}    ${pixelChar}`,
            `   ${pixelChar} `,
            ` ${pixelChar}  `,
            `${pixelChar}${pixelChar}${pixelChar}${pixelChar}${pixelChar}${pixelChar}`
        ],
        '3': [
            `${pixelChar}${pixelChar}${pixelChar} `,
            `   ${pixelChar}`,
            ` ${pixelChar}${pixelChar}${pixelChar} `,
            `   ${pixelChar}`,
            `${pixelChar}${pixelChar}${pixelChar} `
        ],
        '4': [
            `${pixelChar}   ${pixelChar}`,
            `${pixelChar}   ${pixelChar}`,
            `${pixelChar}${pixelChar}${pixelChar}${pixelChar}${pixelChar}`,
            `    ${pixelChar}`,
            `    ${pixelChar}`
        ],
        '5': [
            `${pixelChar}${pixelChar}${pixelChar}${pixelChar}${pixelChar}`,
            `${pixelChar}  `,
            `${pixelChar}${pixelChar}${pixelChar}${pixelChar}${pixelChar}`,
            `   ${pixelChar}`,
            `${pixelChar}${pixelChar}${pixelChar} `
        ],
        '6': [
            ` ${pixelChar}${pixelChar}${pixelChar} `,
            `${pixelChar}   `,
            `${pixelChar}${pixelChar}${pixelChar}${pixelChar}${pixelChar}`,
            `${pixelChar}   ${pixelChar}`,
            ` ${pixelChar}${pixelChar}${pixelChar} `
        ],
        '7': [
            `${pixelChar}${pixelChar}${pixelChar}${pixelChar}${pixelChar}`,
            `   ${pixelChar}`,
            `  ${pixelChar}  `,
            ` ${pixelChar}   `,
            `${pixelChar}    `
        ],
        '8': [
            ` ${pixelChar}${pixelChar}${pixelChar} `,
            `${pixelChar}   ${pixelChar}`,
            ` ${pixelChar}${pixelChar}${pixelChar} `,
            `${pixelChar}   ${pixelChar}`,
            ` ${pixelChar}${pixelChar}${pixelChar} `
        ],
        '9': [
            ` ${pixelChar}${pixelChar}${pixelChar} `,
            `${pixelChar}   ${pixelChar}`,
            ` ${pixelChar}${pixelChar}${pixelChar}${pixelChar}${pixelChar}`,
            `   ${pixelChar}`,
            ` ${pixelChar}${pixelChar}${pixelChar} `
        ],
        '0': [
            ` ${pixelChar}${pixelChar}${pixelChar} `,
            `${pixelChar}   ${pixelChar}`,
            `${pixelChar}   ${pixelChar}`,
            `${pixelChar}   ${pixelChar}`,
            ` ${pixelChar}${pixelChar}${pixelChar} `
        ],
    };

    let lines = ['', '', '', '', ''];
    for (let char of text.toLowerCase()) {
        if (alphabet[char]) {
            for (let i = 0; i < 5; i++) {
                lines[i] += alphabet[char][i] + ' ';
            }
        }
    }

    return lines.join('\n');
}
