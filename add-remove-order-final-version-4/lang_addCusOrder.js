// the default language is english
let lang = 'en';
// taking the language selector and assign changing event
const selector = document.querySelector('#lang');
selector.addEventListener('change', changeLang);
// the function for making change in language selector
function changeLang() {
    if (this.value === 'en') {
        lang = 'en';
    } else if (this.value === 'sw') {
        lang = 'sw';
    } else if (this.value === 'gm') {
        lang = 'gm';
    }
    // loading the content of the page
    display();
}
function display() {
    // taking the lists of keys and replace with the coresponding content stored in the dictionary
    let keys = dict_addCusOrder.keys;
    for (let key of keys) {
        document.querySelector(`#${key}`).textContent = dict_addCusOrder[lang][key];
    }
    // taking the lists of attribute 
    let attributes = dict_addCusOrder.attributes;
    for (let attribute of attributes) {
        document.querySelector(`#${attribute}`).setAttribute('placeholder', dict_addCusOrder[lang][attribute])
    }
    var count = allCustomerBeverages();
    let container = "";
    document.getElementById("itemsContainer").innerHTML = "";
    container = document.getElementById('itemsContainer');
    for (i = 0; i < count.length; i++) {
        // the original string stored the content of each card, and default in english
        origin_string = `
  <div  id=${count[i].artikelid} data-status="finished" title="Finished Project"  ondrop="drop(event)" ondragover="allowDrop(event)"  draggable="true" ondragstart="drag(event)" class="col" ontouchstart="this.classList.toggle('hover');">
            <div class="container">
              <div class="front" style="background-image: url(./logo.png)">
                <div class="inner">
                  <p> ${count[i].namn} </p>
                  <span>${count[i].namn2}</span>
                </div>
              </div>
              <div class="back">
                <div class="inner">
                  <p>Alc: ${count[i].alkoholhalt}
                    <br/>
                    Price:${count[i].prisinklmoms} SEK
                    <br/>
                    <h5>Quantity:<span><input id=qty${count[i].artikelid} style="width:25%;" type="number"></input></span> </h5>                            </p>
                </div>
              </div>
            </div>
          </div>
      
`;
        // changing the content of the orginal string according to the language selector
        if (lang === 'en') {
            temp_string = origin_string.replace("Price", "Price");
            temp_string = temp_string.replace("Quantity", "Quantity");
        } else if (lang === 'sw') {
            temp_string = origin_string.replace("Price", "Pris");
            temp_string = temp_string.replace("Quantity", "Kvantitet");
        } else {
            temp_string = origin_string.replace("Price", "Preis");
            temp_string = temp_string.replace("Quantity", "Menge");
        }
        // concatenating in the container
        container.innerHTML += temp_string;

    }
}
//loading the content page
window.addEventListener('DOMContentLoaded', display);

