const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Function to resize the canvas
function resizeCanvas() {
    canvas.width = window.innerWidth * 0.9; // 90% of the window width
    canvas.height = window.innerHeight * 0.7; // 70% of the window height
}

// Set initial canvas size
resizeCanvas();

// Add event listener for window resize
window.addEventListener('resize', resizeCanvas);

// Ball properties
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 20,
    color: 'blue',
    vx: 2, // Velocity in x direction
    vy: 0, // Velocity in y direction
    gravity: 0.5, // Gravity effect
    bounce: 0.7 // Bounce factor (0 to 1)
};

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

    // Draw ground
    ctx.fillStyle = '#4CAF50'; // Ground color
    ctx.fillRect(0, canvas.height - 20, canvas.width, 20); // Ground rectangle

    // Update ball position
    ball.vy += ball.gravity; // Apply gravity
    ball.x += ball.vx;
    ball.y += ball.vy;

    // Check for collision with the ground
    if (ball.y + ball.radius >= canvas.height - 20) {
        ball.y = canvas.height - 20 - ball.radius; // Reset position
        ball.vy *= -ball.bounce; // Reverse velocity and apply bounce factor
    }

    // Check for collision with walls
    if (ball.x + ball.radius >= canvas.width || ball.x - ball.radius <= 0) {
        ball.vx *= -1; // Reverse x velocity
    }

    // Draw the ball
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = ball.color;
    ctx.fill();
    ctx.closePath();

    // Draw ball shadow
    ctx.beginPath();
    ctx.arc(ball.x, ball.y + 5, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'; // Shadow color
    ctx.fill();
    ctx.closePath();

    requestAnimationFrame(animate); // Request next frame
}

// Start the animation
animate();