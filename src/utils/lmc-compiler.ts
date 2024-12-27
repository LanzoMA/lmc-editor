export const assembleIntoRam = (code: string): number[] => {
    const validInstructions = new Set(['ADD', 'SUB', 'STA', 'STO', 'LDA', 'BRA', 'BRZ', 'BRP', 'INP', 'OUT', 'HLT']);
    const branchInstructions = new Set(['BRA', 'BRZ', 'BRP']);

    const ram: number[] = new Array(100).fill(0);

    const instructions: Array<string> = code.split('\n');
    const tokenisedInstructions: Array<Array<string>> = instructions.map(instruction => instruction.split(/\s+/));

    let datPointer = 99;
    const datStore: { [key: string]: number } = {};

    // Initialise DAT locations
    tokenisedInstructions.forEach(tokenisedInstruction => {
        if (tokenisedInstruction.includes('DAT')) {
            // Check if DAT variable has already been initialised
            if (tokenisedInstruction.length === 3) {
                ram[datPointer] = Number(tokenisedInstruction[2]);
            }

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

    const branchStore: { [key: string]: number } = {};

    // Initialise branch instructions
    tokenisedInstructions.forEach((tokenisedInstruction, i) => {
        tokenisedInstruction.forEach((token, j) => {
            if (token === 'BRA' || token === 'BRZ' || token === 'BRP') {
                branchStore[tokenisedInstructions[i][j + 1]] = -1;
            }
        });
    });

    // Find branch values
    tokenisedInstructions.forEach((tokenisedInstruction, index) => {
        const label = tokenisedInstruction[0]

        if (!validInstructions.has(label)) {
            if (!(label in branchStore)) {
                console.error('Unknown label/instruction')
                return;
            }

            branchStore[label] = index;
        }
    });

    // Remove labels
    for (const instructionIndex of Object.values(branchStore)) {
        tokenisedInstructions[instructionIndex].shift();
    }

    // Replace branch variables with branch values
    tokenisedInstructions.forEach(tokenisedInstruction => {
        const opcode = tokenisedInstruction[0];

        if (branchInstructions.has(opcode)) {
            const operand = tokenisedInstruction[1];

            if (!(operand in branchStore)) {
                console.error('Invalid branch instruction');
                return;
            }

            tokenisedInstruction[1] = branchStore[operand].toString();
        }
    })

    console.log(tokenisedInstructions);

    // Convert tokens into numerical instructions
    tokenisedInstructions.forEach((tokenisedInstruction, i) => {
        const opcode = tokenisedInstruction[0];
        const operand = Number(tokenisedInstruction[1]);



        switch (opcode) {
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

    return ram;
};