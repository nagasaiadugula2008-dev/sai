const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

function appendValue(value) {
  display.value += value;
}

function clearDisplay() {
  display.value = '';
}

function deleteLast() {
  display.value = display.value.slice(0, -1);
}

function calculateExpression() {
  const expression = display.value.trim();

  if (!expression) return;

  try {
    const sanitized = expression
      .replace(/×/g, '*')
      .replace(/÷/g, '/')
      .replace(/%/g, '/100');

    const result = Function(`"use strict"; return (${sanitized})`)();

    display.value = Number.isFinite(result) ? result : 'Error';
  } catch {
    display.value = 'Error';
  }
}

buttons.forEach((button) => {
  const action = button.dataset.action;
  const value = button.dataset.value;

  button.addEventListener('click', () => {
    if (action === 'clear') {
      clearDisplay();
      return;
    }

    if (action === 'delete') {
      deleteLast();
      return;
    }

    if (action === 'equals') {
      calculateExpression();
      return;
    }

    appendValue(value);
  });
});

document.addEventListener('keydown', (event) => {
  const key = event.key;

  if (/^[0-9]$/.test(key)) appendValue(key);
  else if (['+', '-', '*', '/', '.'].includes(key)) appendValue(key);
  else if (key === 'Enter' || key === '=') calculateExpression();
  else if (key === 'Backspace') deleteLast();
  else if (key === 'Escape') clearDisplay();
});
