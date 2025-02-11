document.addEventListener('DOMContentLoaded', () => {
    const progressBar = document.getElementById('soupProgress');
    const stirButton = document.getElementById('soupButton');
    let progress = 0;
    let isHeating = false;
    let animationFrame;
    
    const HEAT_RATE = 0.5; // Percentage increase per frame
    
    function heatSoup() {
        if (!isHeating) return;
        
        if (progress < 100) {
            progress = Math.min(100, progress + HEAT_RATE);
            progressBar.style.width = `${progress}%`;
            
            // Update button text based on progress
            if (progress >= 75) {
                soupButton.textContent = "Almost ready!";
            } else if (progress >= 50) {
                soupButton.textContent = "Warming bowls...";
            } else if (progress >= 25) {
                soupButton.textContent = "Making stock...";
            }
            
            // If we've reached 100%, handle completion
            if (progress >= 100) {
                completeHeating();
                return;
            }
            
            // Continue the animation
            animationFrame = requestAnimationFrame(heatSoup);
        }
    }
    
    function completeHeating() {
        isHeating = false;
        soupButton.textContent = "Soup's ready!";
        soupButton.disabled = true;
        setTimeout(() => {
            window.location.href = 'https://google.com';
        }, 1000);
    }
    
    function startHeating() {
        isHeating = true;
        soupButton.textContent = "Soup's on";
        animationFrame = requestAnimationFrame(heatSoup);
    }
    
    function stopHeating() {
        isHeating = false;
        if (progress < 100) {
            soupButton.textContent = "Sign Up";
        }
        if (animationFrame) {
            cancelAnimationFrame(animationFrame);
        }
    }
    
    // Mouse events
    soupButton.addEventListener('mousedown', startHeating);
    document.addEventListener('mouseup', stopHeating);
    
    // Touch events
    soupButton.addEventListener('touchstart', (e) => {
        e.preventDefault(); // Prevent mouse events from firing
        startHeating();
    });
    document.addEventListener('touchend', stopHeating);
    document.addEventListener('touchcancel', stopHeating);
    
    // Cleanup - stop heating if user moves mouse out of window
    document.addEventListener('mouseleave', stopHeating);
    
    // Initial button text
    soupButton.textContent = "Sign Up";
});
