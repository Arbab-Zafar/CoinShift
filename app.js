let content = document.querySelectorAll('.content');
let selectBtn = document.querySelectorAll('.selectBtn');
let downArrow = document.querySelectorAll('#downArrow');
let list = document.querySelectorAll('.list');

let currencyArr = ["ADA", "AED", "AFN", "ALL", "AMD", "ANG", "AOA", "ARB", "ARS", "AUD", "AVAX", "AWG", "AZN", "BAM", "BBD", "BDT", "BGN", "BHD", "BIF", "BMD", "BNB", "BND", "BOB", "BRL", "BSD", "BTC", "BTN", "BUSD", "BWP", "BYN", "BYR", "BZD", "CAD", "CDF", "CHF", "CLF", "CLP", "CNY", "COP", "CRC", "CUC", "CUP", "CVE", "CZK", "DAI", "DJF", "DKK", "DOP", "DOT", "DZD", "EGP", "ERN", "ETB", "ETH", "EUR", "FJD", "FKP", "GBP", "GEL", "GGP", "GHS", "GIP", "GMD", "GNF", "GTQ", "GYD", "HKD", "HNL", "HRK", "HTG", "HUF", "IDR", "ILS", "IMP", "INR", "IQD", "IRR", "ISK", "JEP", "JMD", "JOD", "JPY", "KES", "KGS", "KHR", "KMF", "KPW", "KRW", "KWD", "KYD", "KZT", "LAK", "LBP", "LKR", "LRD", "LSL", "LTC", "LTL", "LVL", "LYD", "MAD", "MATIC", "MDL", "MGA", "MKD", "MMK", "MNT", "MOP", "MRO", "MUR", "MVR", "MWK", "MXN", "MYR", "MZN", "NAD", "NGN", "NIO", "NOK", "NPR", "NZD", "OMR", "OP", "PAB", "PEN", "PGK", "PHP", "PKR", "PLN", "PYG", "QAR", "RON", "RSD", "RUB", "RWF", "SAR", "SBD", "SCR", "SDG", "SEK", "SGD", "SHP", "SLL", "SOL", "SOS", "SRD", "STD", "SVC", "SYP", "SZL", "THB", "TJS", "TMT", "TND", "TOP", "TRY", "TTD", "TWD", "TZS", "UAH", "UGX", "USD", "USDC", "USDT", "UYU", "UZS", "VEF", "VND", "VUV", "WST", "XAF", "XAG", "XAU", "XCD", "XDR", "XOF", "XPD", "XPF", "XPT", "XRP", "YER", "ZAR", "ZMK", "ZMW", "ZWL"];

selectBtn.forEach((e, index) => {
    e.addEventListener('click', () => {
        addSearchTerms(index);
        content[index].classList.toggle('active');
        downArrow[index].classList.toggle('rotate');
    })
})

function addSearchTerms(index) {
    if (index == 0) {
        for (let i = 0; i < currencyArr.length; i++) {
            let html = `<div class="searchItem">${currencyArr[i]}</div>`;
            list[index].innerHTML += html;
        }
    }
    else {
        for (let i = 0; i < currencyArr.length; i++) {
            let html = `<div class="searchItem2">${currencyArr[i]}</div>`;
            list[index].innerHTML += html;
        }
    }
    addEventOnSearchItem(index)
}

searchInput = document.querySelectorAll('.searchInput')
searchInput.forEach((e, i) => {
    if (i == 0) {
        console.log('inside if')
        e.addEventListener('input', () => {
            let searchItem = document.querySelectorAll('.searchItem');
            searchItem.forEach((element, index) => {
                if (element.innerText.includes(searchInput[0].value.toUpperCase())) {
                    element.style.display = 'block';
                }
                else {
                    element.style.display = 'none';
                }
            })
        })
    }
    else {
        e.addEventListener('input', () => {
            let searchItem = document.querySelectorAll('.searchItem2');
            searchItem.forEach((element, index) => {
                if (element.innerText.includes(searchInput[1].value.toUpperCase())) {
                    element.style.display = 'block';
                }
                else {
                    element.style.display = 'none';
                }
            })
        })
    }
})

function addEventOnSearchItem(index) {
    if (index == 0) {
        document.querySelectorAll('.searchItem').forEach((element, index) => {
            element.addEventListener('click', () => {
                document.querySelectorAll('.selectedText')[0].innerText = element.innerText;
                content[0].classList.toggle('active');
                downArrow[0].classList.toggle('rotate');
            })
        })
    }
    else {
        document.querySelectorAll('.searchItem2').forEach((element, index) => {
            element.addEventListener('click', () => {
                document.querySelectorAll('.selectedText')[1].innerText = element.innerText;
                content[1].classList.toggle('active');
                downArrow[1].classList.toggle('rotate');
            })
        })
    }
}
