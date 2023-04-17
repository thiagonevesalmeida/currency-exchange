export class Exchange {
    constructor(form) {
        this.form = form
        this.fromInput = form.querySelector('#currency1')
        this.toInput =  form.querySelector('#currency2')
        this.fromSelect = form.querySelector('#from')
        this.toSelect = form.querySelector('#to')

        // bind the instance of the class to the flip method
        this.arrowSwitch = this.arrowSwitch.bind(this) 
    }

    flagSwitch(select) {
        const input = select.parentElement.previousElementSibling

        if (input) {
            let placeholderUpdate = 0.0
            input.placeholder = placeholderUpdate.toLocaleString('pt-br', {style: "currency", currency: `${select.value}`})
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

    #calculate(input, data) {
        let originalCurrency = this.fromSelect.value
        let exchangeCurrency = this.toSelect.value

        const isFirstInput = input.id === 'currency1'
        const currencyOption = data[exchangeCurrency.toLowerCase()][originalCurrency.toLowerCase()]

        const inputValue = isFirstInput
            ? this.fromInput.value 
            : this.toInput.value

        const formattedValue = isFirstInput
            ? inputValue / currencyOption
            : inputValue * currencyOption

        const inputConvertor = isFirstInput
            ? '#currency2'
            : '#currency1'

        const localCurrency = isFirstInput
            ? {style: "currency", currency: `${exchangeCurrency}`}
            : {style: "currency", currency: `${originalCurrency}`}

        const total = formattedValue.toLocaleString("pt-br", localCurrency)

    
        this.form.querySelector(inputConvertor).placeholder = total
    }
    
    async dailyCurrency(target) {
        const toSelectValue = this.toSelect.value

        if (target.value) {
            return fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${toSelectValue.toLowerCase()}.json`)
            .then(result => result.json())
            .then(data => {
                // console.log(data.date)
                // console.log(data.usd.brl)  data[to][from]
                
                // let formattedValue = inputValue / data[toSelectValue.toLowerCase()][fromSelectValue.toLowerCase()]
                // const total = formattedValue.toLocaleString("pt-br", {style: "currency", currency: `${toSelectValue}`})

                // this.form.querySelector("#currency2").placeholder = total
                this.#calculate(target, data)
            })
            .catch(error => console.error(error))
        }

        //updatinig flagSwitch function here

    } 
}