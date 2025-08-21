---
layout: none
---
// Updates the theme based on user preference or if toggled
function updateTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

// toggle between light and dark themes when called
async function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    updateTheme(newTheme);
}

// Call updateTheme before page load
(function() { 
    const savedTheme = localStorage.getItem('theme') || '{{ site.css_theme }}'; 
    // document.documentElement.setAttribute('data-theme', savedTheme); 
    updateTheme(savedTheme);
    console.log(`Theme set to ${savedTheme} on page load.`);
})();