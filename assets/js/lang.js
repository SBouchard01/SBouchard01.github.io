// Function to update content based on selected language
function updateContent(langData) {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (key === "flag") {
            element.src = langData[key];
        }
        else {
            // If slashes in key, split by slashes and access nested properties
            if (key.includes('/')) {
                try { 
                    const keys = key.split('/');
                    // console.log(`Resolving translation key "${key}" to nested properties: ${keys.join(' -> ')}`);
                    newElement = keys?.reduce((acc, curr) => { return acc[curr]; }, langData);
                    // console.info(`Translation key "${key}" resolved to "${newElement}".`);
                } catch (error) {
                    // Catch errors to avoid breaking the script if a key is not found
                    console.error(`Error resolving translation key "${key}":`, error);
                    newElement = undefined;
                }
            } 
            // If the key is a simple string, directly access the property
            else {
                newElement = langData[key];
            }
            // If the key is not found in the language data, log a warning
            // and do not update the element to avoid errors
            if (newElement === undefined) {
                console.warn(`Translation key "${key}" not found in language data.`);
                return;
            }
            // If no slashes, modify the innerHTML or textContent of the element
            else {
                // console.log(`Updating element with key "${element.innerHTML}" to "${newElement}".`);
                element.innerHTML = newElement;
            }
            
        }
    });
}

function hideLanguageClasses(lang) {
    // Hide elements with id starting with 'hide-' if the language is not lang
    document.querySelectorAll('[id^="hide-"]').forEach(element => {
        const hideLang = element.id.split('-')[1]; // Get the language code from the id
        if (hideLang && hideLang !== lang) {
            element.classList.add('is-hidden');
            console.log(`Element with ID "${element.id}" is hidden for language "${hideLang}".`);
        } else {
            element.classList.remove('is-hidden');
            console.log(`Element with ID "${element.id}" is visible for language "${lang}".`);
        }
    });
}

// Function to set the language preference
function setLanguagePreference(lang) {
    localStorage.setItem('language', lang);
    location.reload();
}

// Function to fetch language data
async function fetchLanguageData(lang) {
    const response = await fetch(`assets/lang/${lang}.json`);
    return response.json();
}

// Function to change language
async function changeLanguage(lang) {
    await setLanguagePreference(lang);

    console.log(`Language preference set to ${lang}. Reloading page...`);
    const langData = await fetchLanguageData(lang);
    console.log(`Language data for ${lang} loaded successfully.`);
    updateContent(langData);
    hideLanguageClasses(lang);
}

// Call updateContent() on page load
window.addEventListener('DOMContentLoaded', async () => {
    const userPreferredLanguage = localStorage.getItem('language') || 'en';
    const langData = await fetchLanguageData(userPreferredLanguage);
    updateContent(langData);
    hideLanguageClasses(userPreferredLanguage);
});

// Function to un-hide elements on click
async function unhideElement(ParentClass, elementId, elementHideID) {
    // First, hide all elements with the 'is-hidden' class in the specified parent class
    const parentElement = document.querySelector(`[id=${ParentClass}]`);
    if (!parentElement) {
        console.warn(`Parent element with class "${ParentClass}" not found.`);
        return;
    }
    var elements = parentElement.querySelectorAll('[id^="' + elementHideID + '"]');
    elements.forEach(el => {
        el.classList.add('is-hidden');
        console.log(`Element with ID "${el.id}" is now hidden.`);
    });
    const element = parentElement.querySelector(`[id=${elementId}]`);
    if (element) {
        element.classList.remove('is-hidden');
        console.log(`Element with ID "${elementId}" is now visible.`);
    }
    else {
        console.warn(`Element with ID "${elementId}" not found.`);
    }
}