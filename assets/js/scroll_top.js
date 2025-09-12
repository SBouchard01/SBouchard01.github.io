// Detect if scroll position is greater than 100px
window.addEventListener("scroll", () => {
    var scrollToTop = document.querySelectorAll('.pop-up');
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        scrollToTop.forEach(element => element.classList.add('is-active'));
    } else {
        scrollToTop.forEach(element => element.classList.remove('is-active'));
    }
});

// On click on a scroll-to-top element, scroll to the top of the page
document.querySelector('.scroll-to-top').addEventListener('click', (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});