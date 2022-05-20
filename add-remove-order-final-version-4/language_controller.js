// the default language is english

let lang = 'en';
const selector = document.querySelector('#lang');
// const selectorMenu = document.querySelector('#langMenu');
selector.addEventListener('change', changeLang);
// function to change the languague according to user's selection
// adding
function changeLang() {
    // change lange according to the change of user
    if (this.value === 'en') {
        lang = 'en';
    } else if (this.value === 'sw') {
        lang = 'sw';
    } else if (this.value === 'gm') {
        lang = 'gm';
    }
    //update view
    display();
}
function display() {
    // taking the list of ids from dictionary and change the content accordingly
    let keys = dict.keys;
    for (let key of keys) {
        document.querySelector(`#${key}`).textContent = dict[lang][key];
    }
    // similar thing with attributes - placeholder
    let attributes = dict.attributes;
    for (let attribute of attributes) {
        document.querySelector(`#${attribute}`).setAttribute('placeholder', dict[lang][attribute])
    }
}
// loading the content of the page
window.addEventListener('DOMContentLoaded', display);

