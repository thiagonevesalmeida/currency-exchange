// importing Exchange lib
import { Exchange } from './lib/exchangeSetup.js'
import { options } from './lib/chartSetup.js'

const form = document.querySelector('form')
const button = document.querySelector('.arrow')

//Chart Setup
const chart = new ApexCharts(document.querySelector("#chart"), options)
chart.render()

// Exchange Setup
const exchange = new Exchange(form)

// Arrow Switch behavior
button.addEventListener("click", exchange.arrowSwitch)
form.onchange = function (event) {
    if (event.target.id === "from" || event.target.id === "to") {
        exchange.flagSwitch(event.target)
    }
}

form.addEventListener('keyup', function(event) {

    // exchange trade API - test
    exchange.dailyCurrency(event.target)
})