export class Exchange {
    constructor(form) {
        this.form = form
        this.arrowSwitch = this.arrowSwitch.bind(this) // bind the instance of the class to the flip method
    }

    calculate(input, exchangeRate = 5.07) {
        const isBrazilianReal = input.placeholder.includes("R")
        
        const formattedValue = isBrazilianReal
            ? input.value / exchangeRate
            : input.value * exchangeRate

        const currencyOptions = isBrazilianReal
            ? {style: "currency", currency: "USD"}
            : {style: "currency", currency: "BRL"}

        const total = formattedValue.toLocaleString("pt-br", currencyOptions)
        return total
    }

    
    flagSwitch(select) {
        const input = select.parentElement.previousElementSibling
        if (input) {
            input.placeholder = select.value === 'USD' ? '$ 0.00':'R$ 0,00'
        }
    
        const flag = select.previousElementSibling
        flag.className = `fi fi-${select.value.slice(0, 2).toLowerCase()} fis`
    }

    arrowSwitch() {
        const currency1 = this.form.querySelector('#to')
        const currency2 = this.form.querySelector('#from')

        if (currency1 && currency2) {
            [currency1.value, currency2.value] = [currency2.value, currency1.value]
        }
        
        this.flagSwitch(currency1)
        this.flagSwitch(currency2)
    }

    
    async dailyCurrency() {
        return fetch('https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd.json')
        .then(result => result.json())
        .then(data => {
            return data.usd
        })
        .catch(error => console.error(error))
    } 
}