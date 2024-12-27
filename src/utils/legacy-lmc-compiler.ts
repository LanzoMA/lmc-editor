import React from "react";

function isNumber(value: string): boolean {
    return !isNaN(parseFloat(value)) && isFinite(Number(value));
}

function initialiseDataLocations(tokens: string[]) {
    tokens.forEach((token, index) => {
        if (token === 'DAT') {
            const identifier = tokens[index - 1];
            const dataLocation = tokens.length;

            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            isNumber(tokens[index + 1]) ? tokens.push(tokens[index + 1]) : tokens.push('0');

            tokens.forEach((token, index) => {
                if (token === identifier) {
                    tokens[index] = dataLocation.toString();
                }
            })

            return;
        }

        if (token.startsWith('B') && token.length === 3) {
            const identifier: string = tokens[index + 1];

            const start: number = index + 2

            const dataLocation = tokens.findIndex((token, index) => {
                return (index !== start - 2) && (token === identifier)
            }) - 1;

            if (dataLocation === -2) {
                throw SyntaxError('Branch instruction address not found');
            }

            tokens[index + 1] = dataLocation.toString();
        }
    })
}

export function assembleIntoRam(code: string): number[] {
    const ram: number[] = new Array(100).fill(0);

    const tokens: string[] = code.split(/[ \r\n\t]/).filter(token => token !== '');

    initialiseDataLocations(tokens);

    console.log(tokens);

    let ramIndex = 0;

    tokens.forEach((token, index) => {

        switch (token) {
            case 'HLT':
                ram[ramIndex] = 0;
                ramIndex++;
                break;

            case 'ADD':
                ram[ramIndex] = 100 + Number(tokens[index + 1])
                ramIndex++;

                break;

            case 'SUB':
                ram[ramIndex] = 200 + Number(tokens[index + 1]);
                ramIndex++;

                break;

            case 'STO':
            case 'STA':
                ram[ramIndex] = 300 + Number(tokens[index + 1]);
                ramIndex++;

                break;

            case 'LDA':
                ram[ramIndex] = 500 + Number(tokens[index + 1]);
                ramIndex++;

                break;

            case 'BRA':
                ram[ramIndex] = 600 + Number(tokens[index + 1]);
                ramIndex++;

                break;

            case 'BRZ':
                ram[ramIndex] = 700 + Number(tokens[index + 1]);
                ramIndex++;

                break;

            case 'BRP':
                ram[ramIndex] = 800 + Number(tokens[index + 1]);
                ramIndex++;

                break;

            case 'INP':
                ram[ramIndex] = 901;
                ramIndex++;

                break;

            case 'OUT':
                ram[ramIndex] = 902;
                ramIndex++;

                break;
        }
    });

    return ram;
}

export function run(
    output: string,
    setOutput: React.Dispatch<React.SetStateAction<string>>,
    ram: number[],
    setRam: React.Dispatch<React.SetStateAction<number[]>>
) {
    let programCounter = -1;
    let accumulator = 0;

    let running = true;

    while (running) {
        programCounter++;

        let dataLocation: number;

        if (programCounter >= ram.length) break;

        const instruction = ram[programCounter];

        switch (true) {
            // HLT (Halt) Instruction
            case instruction === 0:
                running = false;
                break;

            // ADD (Addition) Instruction
            case instruction < 200:
                dataLocation = instruction - 100;
                accumulator += ram[dataLocation];
                break;

            // SUB (Subtraction) Instruction
            case instruction < 300:
                dataLocation = instruction - 200;
                accumulator -= ram[dataLocation];
                break;

            // STA/STO (Store) Instruction
            case instruction < 400:
                dataLocation = instruction - 300;

                ram = ram.slice(0, dataLocation).concat([accumulator], ram.slice(dataLocation + 1))

                setTimeout(() => {
                    setRam(ram);
                }, 0);

                break;

            // Instructions that start with 4XX do not exist
            case instruction < 500:
                running = false;

                setTimeout(() => {
                    setOutput(`Invalid instruction: ${instruction}`)
                }, 0);

                break;

            // LDA (Load) Instruction
            case instruction < 600:
                dataLocation = instruction - 500;
                accumulator = ram[dataLocation];
                break;

            // BRA (Branch Always) Instruction
            case instruction < 700:
                dataLocation = instruction - 600;
                programCounter = dataLocation - 1;
                break;

            // BRZ (Branch If Zero) Instruction
            case instruction < 800:
                if (accumulator === 0) {
                    dataLocation = instruction - 700;
                    programCounter = dataLocation - 1;
                }

                break;

            // BRP (Branch If Positive) Instruction
            case instruction < 900:
                if (accumulator >= 0) {
                    dataLocation = instruction - 800;
                    programCounter = dataLocation - 1;
                }

                break;

            // INP (Input) Instruction
            case instruction === 901:
                accumulator = Number(prompt('Input: '));
                break;

            // OUT (Output) Instruction
            case instruction === 902:
                output += '\n' + accumulator.toString();

                setTimeout(() => {
                    setOutput(output);
                }, 5);

                break;

            default:
                setOutput(`Unknown instruction ${instruction}`)
        }
    }


}