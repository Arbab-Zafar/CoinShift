let content = document.querySelectorAll('.content');
let selectBtn = document.querySelectorAll('.selectBtn');
let downArrow = document.querySelectorAll('#downArrow');
let list = document.querySelectorAll('.list');
let submit = document.querySelector('#submit');
let notification = document.querySelector('#notification');
let notificationText = document.querySelector('#notificationText');
let resultText = document.querySelector('#resultText');
let table = document.querySelector('#table');
let resultSearch = document.querySelector('#resultSearch');

let currencyArr = ["ADA", "AED", "AFN", "ALL", "AMD", "ANG", "AOA", "ARB", "ARS", "AUD", "AVAX", "AWG", "AZN", "BAM", "BBD", "BDT", "BGN", "BHD", "BIF", "BMD", "BNB", "BND", "BOB", "BRL", "BSD", "BTC", "BTN", "BUSD", "BWP", "BYN", "BYR", "BZD", "CAD", "CDF", "CHF", "CLF", "CLP", "CNY", "COP", "CRC", "CUC", "CUP", "CVE", "CZK", "DAI", "DJF", "DKK", "DOP", "DOT", "DZD", "EGP", "ERN", "ETB", "ETH", "EUR", "FJD", "FKP", "GBP", "GEL", "GGP", "GHS", "GIP", "GMD", "GNF", "GTQ", "GYD", "HKD", "HNL", "HRK", "HTG", "HUF", "IDR", "ILS", "IMP", "INR", "IQD", "IRR", "ISK", "JEP", "JMD", "JOD", "JPY", "KES", "KGS", "KHR", "KMF", "KPW", "KRW", "KWD", "KYD", "KZT", "LAK", "LBP", "LKR", "LRD", "LSL", "LTC", "LTL", "LVL", "LYD", "MAD", "MATIC", "MDL", "MGA", "MKD", "MMK", "MNT", "MOP", "MRO", "MUR", "MVR", "MWK", "MXN", "MYR", "MZN", "NAD", "NGN", "NIO", "NOK", "NPR", "NZD", "OMR", "OP", "PAB", "PEN", "PGK", "PHP", "PKR", "PLN", "PYG", "QAR", "RON", "RSD", "RUB", "RWF", "SAR", "SBD", "SCR", "SDG", "SEK", "SGD", "SHP", "SLL", "SOL", "SOS", "SRD", "STD", "SVC", "SYP", "SZL", "THB", "TJS", "TMT", "TND", "TOP", "TRY", "TTD", "TWD", "TZS", "UAH", "UGX", "USD", "USDC", "USDT", "UYU", "UZS", "VEF", "VND", "VUV", "WST", "XAF", "XAG", "XAU", "XCD", "XDR", "XOF", "XPD", "XPF", "XPT", "XRP", "YER", "ZAR", "ZMK", "ZMW", "ZWL"];

selectBtn.forEach((e, index) => {
    e.addEventListener('click', () => {
        addSearchTerms(index);
        content[index].classList.toggle('active');
        downArrow[index].classList.toggle('rotate');
        searchInput[index].focus()
    })
})

function addSearchTerms(index) {
    if (index == 0) {
        let string = "";
        for (let i = 0; i < currencyArr.length; i++) {
            let html = `<div class="searchItem">${currencyArr[i]}</div>`;
            string += html;
            list[index].innerHTML = string;
        }
    }
    else {
        let string2 = "<div class='searchItem2'>All currency</div>";
        for (let i = 0; i < currencyArr.length; i++) {
            let html = `<div class="searchItem2">${currencyArr[i]}</div>`;
            string2 += html;
            list[index].innerHTML = string2;
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

submit.addEventListener('click', () => {
    let baseCurrency = selectBtn[0].innerText;
    let toCurrency = selectBtn[1].innerText;
    let amount = document.querySelector('#amount').value;
    if (amount == "" || amount == 0) {
        notificationHandler("#d25151", "Please enter the valid amount!", "2px 2px 2px 2px #f28888")
    }
    else {
        populate(baseCurrency, toCurrency, amount);
    }
})

async function populate(baseCurrency, toCurrency, amount) {
    document.querySelector('#notification').style.opacity = '1';
    let apiKey = `https://api.currencyapi.com/v3/latest?apikey=cur_live_JyPIXvfXJmcoEkBZRHqCpJWoUQppE6MWN0Y1uQa7&base_currency=${baseCurrency}`;

    notificationHandler("#4dbf7b", "Shifting currency ... Please Wait! ...", "2px 2px 2px 2px #b7f8d5");

    let response = await fetch(apiKey);
    let result = await response.json();

    let date = result["meta"]["last_updated_at"]
    date = date.slice(0, 10);
    let finalDate = date.slice(-2) + "-" + date.slice(5, 7) + "-" + date.slice(0, 4);
    document.querySelector('#lastUpdated').innerText = "Last Updated: " + finalDate;


    if (toCurrency != "All currency") {
        document.querySelector('#result').style.opacity = "1";
        document.querySelector('#tableResult').style.opacity = "0";
        let value = result["data"][toCurrency]["value"] * amount;
        value = value.toFixed(2)
        resultText.innerText = value + " " + toCurrency;
    }
    else {
        document.querySelector('#tableResult').style.opacity = "1";
        document.querySelector('#result').style.opacity = "0";
        let str = "";
        for (const key of Object.keys(result['data'])) {
            let html = `<tr  class="tr"><td>${result["data"][key]['code']}</td><td>${(result["data"][key]['value'] * amount).toFixed(2)}</td></tr>`;
            str += html;
        }
        document.querySelector('#header').focus();
        setTimeout(() => {
            resultSearch.focus();
        }, 900);
        table.innerHTML = str;
    }
}

function notificationHandler(color, text, shadowColor) {
    notificationText.innerText = text;
    notification.style.background = color;
    notification.style.boxShadow = shadowColor;
    notification.style.opacity = '1';

    setTimeout(() => {
        document.querySelector('#notification').style.opacity = '0';
    }, 1000);
}

amount.addEventListener('change', () => {
    if (amount.value == 0) {
        amount.value = 1;
    }
})

resultSearch.addEventListener('input', () => {
    let tr = document.querySelectorAll('.tr');
    tr.forEach(element => {
        let td = element.getElementsByTagName('td')[0];
        console.log(td)
        if (td.innerText.includes(resultSearch.value.toUpperCase())) {
            element.style.display = "contents";
        }
        else {
            element.style.display = "none";
        }
    });
})