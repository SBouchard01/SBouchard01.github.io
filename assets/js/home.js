
// Allow right-click context menu on buttons
window.oncontextmenu = function () {
  showCustomMenu();
  return true;     // set false to cancel default menu
}

// Function to open a new page in a popup window
function openPage(url) {
if (url == null || url == "") {
    console.error("No URL provided for popup.");
    return;
}
window.open(url,'popup','width=600,height=600')
}


//Function to redirect to a specific URL
function redirectTo(url) {
    if (url == null || url == "") {
        console.log("No URL provided, redirecting a default page.");
        url = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
    }

window.location.href = url;
}

// Function to update content based on selected language
function updateContent(langData) {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (key === "flag") {
            element.src = langData[key];
        }
        else {
            element.innerHTML = langData[key];
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
    const response = await fetch(`assets/lang/home/${lang}.json`);
    return response.json();
}

// Function to change language
async function changeLanguage(lang) {
    await setLanguagePreference(lang);

    console.log(`Language preference set to ${lang}. Reloading page...`);
    const langData = await fetchLanguageData(lang);
    console.log(`Language data for ${lang} loaded successfully. : ${langData["flag"]}`);
    updateContent(langData);
}

// Call updateContent() on page load
window.addEventListener('DOMContentLoaded', async () => {
    const userPreferredLanguage = localStorage.getItem('language') || 'en';
    const langData = await fetchLanguageData(userPreferredLanguage);
    updateContent(langData);
});