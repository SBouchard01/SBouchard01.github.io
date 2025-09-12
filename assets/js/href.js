// Find all page anchor href and override base link 
document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll('a[href^="#"]').forEach(element => {
        const href = element.getAttribute('href');
        element.href = location.href.split("#")[0] + element.getAttribute("href");
        console.log("Updated anchor href to: ", element.href);
    });
});