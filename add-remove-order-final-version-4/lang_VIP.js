// the default language is english
let lang = 'en';
// taking the language selector and assign changing event

const selector = document.querySelector('#lang');
selector.addEventListener('change', changeLang);
var orders = [];
var user = localStorage.getItem("CurrentUser");
var discounts = allDiscounts();
var userCredit = displayCredit(user);
var bev = noDiscount();
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
  let keys = dict_VIPmenu.keys;
  for (let key of keys) {
    document.querySelector(`#${key}`).textContent = dict_VIPmenu[lang][key];
  }
  // taking the lists of attribute 

  let attributes = dict_VIPmenu.attributes;
  for (let attribute of attributes) {
    document.querySelector(`#${attribute}`).setAttribute('placeholder', dict_VIPmenu[lang][attribute])
  }
  document.getElementById("credit").innerHTML = userCredit;
  document.getElementById('vipDiscounts').innerHTML = "";
  container = document.getElementById('vipDiscounts');
  for (i = 0; i < discounts.length; i++) {
    // the original string stored the content of each card, and default in english

    origin_string = `
                    <div id="drag2"  data-status="finished" title="Finished Project"  draggable="true" ondragstart="drag(event)" class="col" ontouchstart="this.classList.toggle('hover');">
                              <div class="container">
                                <div class="front" style="background-image: url(./logo.png)">
                                  <div class="inner">
                                    <p> ${discounts[i].namn} </p>
                                    <span>${discounts[i].namn2}</span>
                                  </div>
                                </div>
                                <div class="back">
                                  <div class="inner">
                                    <p>Alc: ${discounts[i].alkoholhalt}
                                      <br/>
                                      Price:${discounts[i].prisinklmoms} SEK
                                      <br/>
                                      <h5>Quantity:<span><input style="width:25%;" type="number"></input></span> </h5>                            </p>
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
  const addOrder = (order) => {
    orders.push(order)
    console.log(orders)
  }

  document.getElementById('drinkM').innerHTML = "";
  container = document.getElementById('drinkM');
  for (i = 0; i < bev.length; i++) {
    origin_container = `
                          <div id=${bev[i].artikelid}  data-status="finished" title="Finished Project"  draggable="true" ondragstart="drag(event)" class="col" ontouchstart="this.classList.toggle('hover');">
                                    <div class="container">
                                      <div class="front" style="background-image: url(./logo.png)">
                                        <div class="inner">
                                          <p> ${bev[i].namn} </p>
                                          <span>${bev[i].namn2}</span>
                                        </div>
                                      </div>
                                      <div class="back">
                                        <div class="inner">
                                          <p>Alc: ${bev[i].alkoholhalt}
                                            <br/>
                                            Price:${bev[i].prisinklmoms} SEK
                                            <br/>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                      `;
    // changing the content of the orginal string according to the language selector

    if (lang === 'en') {
      temp_string = origin_container.replace("Price", "Price");
      temp_string = temp_string.replace("Quantity", "Quantity");
    } else if (lang === 'sw') {
      temp_string = origin_container.replace("Price", "Pris");
      temp_string = temp_string.replace("Quantity", "Kvantitet");
    } else {
      temp_string = origin_container.replace("Price", "Preis");
      temp_string = temp_string.replace("Quantity", "Menge");
    }
    // concatenating in the container

    container.innerHTML += temp_string;
  }
}
window.addEventListener('DOMContentLoaded', display);

