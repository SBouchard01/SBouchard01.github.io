const dropdownButtons = document.querySelectorAll('.dropdown-trigger button');
console.log('Dropdown buttons found:', dropdownButtons.length);

dropdownButtons.forEach(button => {
    // Toggle the dropdown visibility on button click
    button.addEventListener('click', () => {
        console.log('Dropdown button clicked');
        const dropdown = button.closest('.dropdown');
        dropdown.classList.toggle('is-active');
    });

    // Close the dropdown when clicking outside of it
    document.addEventListener('click', (event) => {
        if (!button.contains(event.target) && !button.closest('.dropdown').contains(event.target)) {
            const dropdown = button.closest('.dropdown');
            if (dropdown.classList.contains('is-active')) {
                console.log('Closing dropdown');
                dropdown.classList.remove('is-active');
            }
        }
    });
});