export const assembleIntoRam = (code: string): number[] => {
    const ram: number[] = new Array(100).fill(0);

    const instructions: Array<string> = code.split('\n');
    const tokenisedInstructions: Array<Array<string>> = instructions.map(instruction => instruction.split(' '));

    let datPointer = 99;
    const datStore: { [key: string]: number } = {};

    // initial dat locations
    tokenisedInstructions.forEach(tokenisedInstruction => {
        if (tokenisedInstruction.includes('DAT')) {
            datStore[tokenisedInstruction[0]] = datPointer;
            datPointer--;
        }
    });

    // Remove DAT instructions
    for (let i = 0; i < Object.keys(datStore).length; i++) {
        tokenisedInstructions.pop();
    }

    // Replace variable with physical memory locations
    tokenisedInstructions.forEach((tokenisedInstruction, i) => {
        tokenisedInstruction.forEach((token, j) => {
            if (token in datStore) {
                tokenisedInstructions[i][j] = datStore[token].toString();
            }
        })
    });

    // Todo: Add branch initialisation code

    // Convert tokens into numerical instructions
    tokenisedInstructions.forEach((tokenisedInstruction, i) => {
        tokenisedInstruction.forEach((token, j) => {
            const operand = Number(tokenisedInstruction[j + 1]);

            switch (token) {
                case 'ADD':
                    ram[i] = 100 + operand;
                    break;
                case 'SUB':
                    ram[i] = 200 + operand;
                    break;
                case 'STA':
                case 'STO':
                    ram[i] = 300 + operand;
                    break;
                case 'LDA':
                    ram[i] = 500 + operand;
                    break;
                case 'BRA':
                    ram[i] = 600 + operand;
                    break;
                case 'BRZ':
                    ram[i] = 700 + operand;
                    break;
                case 'BRP':
                    ram[i] = 800 + operand;
                    break;
                case 'INP':
                    ram[i] = 901;
                    break;
                case 'OUT':
                    ram[i] = 902;
                    break;
                case 'HLT':
                    ram[i] = 0;
                    break;
                default:
                    console.error('Unknown instruction');
            }
        });
    });

    return ram;
};