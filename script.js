// Variáveis para armazenar entradas e operadores
let currentInput = ''; // Entrada atual do usuário
let operator = ''; // Operador selecionado
let firstOperand = null; // Primeiro operando
let secondOperand = null; // Segundo operando

// Função para atualizar a exibição do resultado
function updateResult() {
    const resultElement = document.getElementById('result'); // Seleciona o elemento resultado
    resultElement.textContent = currentInput || '0'; // Atualiza o conteúdo, ou mostra 0 se vazio
}

// Função para limpar a calculadora
function clear() {
    currentInput = ''; // Reseta a entrada atual
    operator = ''; // Reseta o operador
    firstOperand = null; // Reseta o primeiro operando
    secondOperand = null; // Reseta o segundo operando
    updateResult(); // Atualiza o resultado
}

// Função para alternar o sinal da entrada atual
function toggleSign() {
    if (currentInput) { // Verifica se há uma entrada
        currentInput = String(-parseFloat(currentInput)); // Altera o sinal da entrada
        updateResult(); // Atualiza o resultado
    }
}

// Função para adicionar um número à entrada atual
function appendNumber(number) {
    currentInput += number; // Adiciona o número à entrada
    updateResult(); // Atualiza o resultado
}

// Função para definir o operador
function setOperator(op) {
    if (currentInput === '') return; // Se não há entrada, não faz nada
    if (firstOperand === null) {
        firstOperand = parseFloat(currentInput); // Define o primeiro operando
    } else if (operator) {
        secondOperand = parseFloat(currentInput); // Define o segundo operando
        firstOperand = operate(operator, firstOperand, secondOperand); // Realiza a operação
    }
    operator = op; // Define o operador
    currentInput = ''; // Reseta a entrada atual
}

// Função que realiza a operação matemática
function operate(op, a, b) {
    switch (op) {
        case '+':
            return a + b; // Soma
        case '-':
            return a - b; // Subtração
        case '*':
            return a * b; // Multiplicação
        case '/':
            return a / b; // Divisão
        default:
            return b; // Retorna o segundo operando por padrão
    }
}

// Função para calcular o resultado final
function calculate() {
    if (firstOperand === null || operator === '' || currentInput === '') return; // Verifica se os operandos e operador estão definidos
    secondOperand = parseFloat(currentInput); // Define o segundo operando
    currentInput = operate(operator, firstOperand, secondOperand).toString(); // Realiza a operação e atualiza a entrada
    operator = ''; // Reseta o operador
    firstOperand = null; // Reseta o primeiro operando
    updateResult(); // Atualiza o resultado
}

// Adiciona eventos de clique aos botões
document.getElementById('clear').addEventListener('click', clear);
document.getElementById('toggle-sign').addEventListener('click', toggleSign);
document.getElementById('equals').addEventListener('click', calculate);
document.getElementById('divide').addEventListener('click', () => setOperator('/'));
document.getElementById('multiply').addEventListener('click', () => setOperator('*'));
document.getElementById('subtract').addEventListener('click', () => setOperator('-'));
document.getElementById('add').addEventListener('click', () => setOperator('+'));

// Adiciona eventos de clique aos botões numéricos
const numberButtons = document.querySelectorAll('.buttons .btn:not(.gray, .orange)');
numberButtons.forEach(button => {
    button.addEventListener('click', () => appendNumber(button.textContent)); // Adiciona o número à entrada
});