//Import modules
import { Exchange } from './lib/exchangeSetup.js';
import { options as chartOptions} from './lib/chartSetup.js';

//DOM elements
const currenctForm = document.querySelector('form');
const arrowButton = document.querySelector('.arrow');

// Exchange setup
const exchange = new Exchange(currenctForm);

currenctForm.addEventListener("change", event => {
    const { id } = event.target;
    if (id === "from" || id === "to") {
        exchange.flagSwitch(event.target);
    }
});

currenctForm.addEventListener('keyup', event => {
    exchange.dailyCurrency(event.target);
});

arrowButton.addEventListener("click", () => exchange.arrowSwitch());

//Chart Setup
const chart = new ApexCharts(document.querySelector("#chart"), chartOptions);
chart.render();