export class Exchange {
    constructor(form) {
        this.form = form
        this.fromInput = form.querySelector('#currency1');
        this.toInput =  form.querySelector('#currency2');
        this.fromSelect = form.querySelector('#from');
        this.toSelect = form.querySelector('#to');
    };

    flagSwitch(select) {
        const input = select.parentElement.previousElementSibling

        if (input) {
            const placeholderUpdate = 0.0
            input.placeholder = placeholderUpdate.toLocaleString('pt-br', {
                style: "currency", 
                currency: `${select.value}`
            });
        }
    
        const flag = select.previousElementSibling;
        flag.className = `fi fi-${select.value.slice(0, 2).toLowerCase()} fis`;
    };

    arrowSwitch() {
        if (this.fromSelect && this.toSelect) {
            [this.fromSelect.value, this.toSelect.value] = [this.toSelect.value, this.fromSelect.value]
        }
        
        this.flagSwitch(this.fromSelect);
        this.flagSwitch(this.toSelect);
    };

    #calculate = async (input, data) => {
        const originalCurrency = this.fromSelect.value;
        const exchangeCurrency = this.toSelect.value;

        const isFirstInput = input.id === 'currency1';

        const {[originalCurrency.toLowerCase()]: currencyOption} = data[exchangeCurrency.toLowerCase()];

        const inputValue = isFirstInput? this.fromInput.value : this.toInput.value;

        const formattedValue = isFirstInput
            ? inputValue / currencyOption
            : inputValue * currencyOption;

        const inputConvertor = isFirstInput? '#currency2' : '#currency1';

        const localCurrency = isFirstInput
            ? {style: "currency", currency: `${exchangeCurrency}`}
            : {style: "currency", currency: `${originalCurrency}`};

        const total = formattedValue.toLocaleString("pt-br", localCurrency);
        
        this.form.querySelector(inputConvertor).placeholder = total;
    };
    
    dailyCurrency = async (target) => {
        const toSelectValue = this.toSelect.value;

        try{
            if (target.value) {
                const response = await fetch(
                    `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${toSelectValue.toLowerCase()}.json`
                    );
                
                const data = await response.json();
                await this.#calculate(target, data);
            }    
        } catch (error) {
            console.error(error);
        }
    };
}