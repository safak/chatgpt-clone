// Grammar rules with production numbers
const grammar = [
    { lhs: "Statement", rhs: ["id", "=", "Expression", ";"] },
    { lhs: "Expression", rhs: ["Expression", "+", "Expression"] },
    { lhs: "Expression", rhs: ["Expression", "*", "Expression"] },
    { lhs: "Expression", rhs: ["id"] },
    { lhs: "Expression", rhs: ["num"] }
];

// Parse table (simplified for this grammar)
const parseTable = {
    0: { id: "S5", num: "S6", "Statement": 1, "Expression": 2 },
    1: { "$": "ACCEPT" },
    2: { "+": "S7", "*": "S8", ";": "R4" },
    5: { "=": "S9" },
    6: { ";": "R5" },
    7: { id: "S5", num: "S6", "Expression": 10 },
    8: { id: "S5", num: "S6", "Expression": 11 },
    9: { id: "S5", num: "S6", "Expression": 12 },
    10: { ";": "R2", "+": "S7", "*": "S8" },
    11: { ";": "R3", "+": "S7", "*": "S8" },
    12: { ";": "R1" }
};

// Intermediate code generator
const generateIntermediateCode = (tokens) => {
    const stack = [];
    let tempCounter = 1;
    const code = [];

    const getTemp = () => `T${tempCounter++}`;

    tokens.forEach((token) => {
        if (token.type === "num" || token.type === "id") {
            stack.push({ value: token.value, isTemp: false });
        } else if (token.type === "+" || token.type === "*") {
            const right = stack.pop();
            const left = stack.pop();
            const temp = getTemp();
            code.push(`${token.type === "+" ? "Add" : "Mul"} ${left.value},${right.value},${temp}`);
            stack.push({ value: temp, isTemp: true });
        }
    });

    const result = stack.pop();
    return code;
};

// Main parser function
const parse = (input) => {
    const tokens = tokenize(input);
    const stack = [0];
    const symbolStack = [];
    const intermediateCode = [];

    let i = 0;
    while (i < tokens.length) {
        const state = stack[stack.length - 1];
        const token = tokens[i];

        if (!(token.type in parseTable[state])) {
            return { valid: false, message: "Syntax is incorrect." };
        }

        const action = parseTable[state][token.type];
        if (action.startsWith("S")) {
            // Shift operation
            stack.push(parseInt(action.slice(1)));
            symbolStack.push(token);
            i++;
        } else if (action.startsWith("R")) {
            // Reduce operation
            const rule = grammar[parseInt(action.slice(1)) - 1];
            for (let j = 0; j < rule.rhs.length; j++) {
                stack.pop();
                symbolStack.pop();
            }
            const newState = parseTable[stack[stack.length - 1]][rule.lhs];
            stack.push(newState);
            symbolStack.push({ type: rule.lhs });

            if (rule.lhs === "Expression") {
                const tokensForCode = rule.rhs.map((_, idx) => symbolStack[symbolStack.length - rule.rhs.length + idx]);
                intermediateCode.push(...generateIntermediateCode(tokensForCode));
            }
        } else if (action === "ACCEPT") {
            intermediateCode.push(`Mov ${symbolStack[0].value},,a`);
            return { valid: true, message: "Syntax is correct.", code: intermediateCode };
        }
    }

    return { valid: false, message: "Syntax is incorrect." };
};

// Tokenizer for input
const tokenize = (input) => {
    const regex = /([a-zA-Z_][a-zA-Z0-9_]*|\d+|[=;+*])/g;
    const tokens = [];
    let match;

    while ((match = regex.exec(input)) !== null) {
        const value = match[0];
        if (/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(value)) {
            tokens.push({ type: "id", value });
        } else if (/^\d+$/.test(value)) {
            tokens.push({ type: "num", value });
        } else {
            tokens.push({ type: value, value });
        }
    }
    tokens.push({ type: "$", value: "$" });
    return tokens;
};

// Example usage
const input = "a = b + c ;";
const result = parse(input);
if (result.valid) {
    console.log(result.message);
    result.code.forEach((line) => console.log(line));
} else {
    console.log(result.message);
}
