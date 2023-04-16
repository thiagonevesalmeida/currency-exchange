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

button.addEventListener("click", exchange.arrowSwitch)
form.onchange = function (event) {
    if (event.target.id === "from" || event.target.id === "to") {
        exchange.flagSwitch(event.target)
    }
}

form.querySelector('input').addEventListener('keyup', function(event) {
    form.querySelector("#currency2").placeholder = exchange.calculate(event.target)
})

// form.querySelector('input').addEventListener('keyup', function(event) {

//     // exchange trade API - test
//     exchange.dailyCurrency(event.target)
// })


console.log(exchange.dailyCurrency())