
const colorBox = document.querySelector('[data-testid="colorBox"]');
const colorOptions = document.querySelectorAll('[data-testid="colorOption"]');
const gameStatus = document.querySelector('[data-testid="gameStatus"]');
const scoreElement = document.querySelector('[data-testid="score"]');
const totalGuessesElement = document.querySelector('[data-testid="totalGuesses"]');
const gameOverMessage = document.querySelector('[data-testid="gameOverMessage"]');
const newGameButton = document.querySelector('[data-testid="newGameButton"]');

let targetColor;
let score = 0;
let totalGuesses = 0;
const maxGuesses = 10;

// Generate a random color in hex format
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Initialize the game
function initGame() {
  // Reset score, total guesses, and status
  score = 0;
  totalGuesses = 0;
  scoreElement.textContent = `Score: ${score}`;
  totalGuessesElement.textContent = `Total Guesses: ${totalGuesses}/${maxGuesses}`;
  gameStatus.textContent = '';
  gameOverMessage.textContent = '';

  // Set a new target color
  targetColor = getRandomColor();
  colorBox.style.backgroundColor = targetColor;

  // Assign random colors to the options
  const colors = [targetColor];
  while (colors.length < 6) {
    const color = getRandomColor();
    if (!colors.includes(color)) colors.push(color);
  }

  // Shuffle the colors and assign them to buttons
  colors.sort(() => Math.random() - 0.5);
  colorOptions.forEach((button, index) => {
    button.style.backgroundColor = colors[index];
    button.onclick = () => checkGuess(colors[index]);
    button.disabled = false; // Re-enable buttons
  });
}

// Check if the guessed color is correct
// script.js
function checkGuess(guess) {
    totalGuesses++;
    totalGuessesElement.textContent = `Total Guesses: ${totalGuesses}/${maxGuesses}`;
  
    if (guess === targetColor) {
      gameStatus.textContent = 'Correct!';
      gameStatus.className = 'game-status correct celebrate'; // Add celebration animation
  
      // Add celebration animation to the correct color box
      colorOptions.forEach((button) => {
        if (button.style.backgroundColor === targetColor) {
          button.classList.add('celebrate-box');
        }
      });
  
      score++;
      scoreElement.textContent = `Score: ${score}`;
    } else {
      gameStatus.textContent = 'Wrong! Try again.';
      gameStatus.className = 'game-status wrong fade-out'; // Add fade-out animation
  
      // Add depressed animation to the wrong color boxes
      colorOptions.forEach((button) => {
        if (button.style.backgroundColor !== targetColor) {
          button.classList.add('depress-box');
        }
      });
    }
  
    // Check if the game is over
    if (totalGuesses >= maxGuesses) {
      endGame();
    } else {
      // Start a new round after 1 second
      setTimeout(() => {
        targetColor = getRandomColor();
        colorBox.style.backgroundColor = targetColor;
  
        const colors = [targetColor];
        while (colors.length < 6) {
          const color = getRandomColor();
          if (!colors.includes(color)) colors.push(color);
        }
  
        colors.sort(() => Math.random() - 0.5);
        colorOptions.forEach((button, index) => {
          button.style.backgroundColor = colors[index];
          button.onclick = () => checkGuess(colors[index]);
  
          // Remove animations for the next round
          button.classList.remove('celebrate-box', 'depress-box');
        });
  
        // Reset game status animation
        gameStatus.className = 'game-status';
      }, 1000);
    }
  }
// End the game and display results
function endGame() {
  const percentageScore = (score / maxGuesses) * 100;
  let performanceRating;

  if (percentageScore < 50) {
    performanceRating = 'Fair';
  } else if (percentageScore >= 50 && percentageScore < 70) {
    performanceRating = 'Good';
  } else {
    performanceRating = 'Excellent';
  }

  gameOverMessage.textContent = `Game Over! Your Score: ${percentageScore.toFixed(2)}% (${performanceRating})`;
  colorOptions.forEach((button) => (button.disabled = true)); // Disable buttons
}

// Start a new game when the button is clicked
newGameButton.onclick = initGame;

// Initialize the first game
initGame();