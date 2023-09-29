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
    // let apiKey = `https://api.currencyapi.com/v3/latest?apikey=cur_live_JyPIXvfXJmcoEkBZRHqCpJWoUQppE6MWN0Y1uQa7&base_currency=${baseCurrency}`;

    notificationHandler("#4dbf7b", "Shifting currency ... Please Wait! ...", "2px 2px 2px 2px #b7f8d5");

    // let response = await fetch(apiKey);
    // let result = await response.json();
    let result = {
        "meta": {
            "last_updated_at": "2023-09-28T23:59:59Z"
        },
        "data": {
            "ADA": {
                "code": "ADA",
                "value": 4.0288552181
            },
            "AED": {
                "code": "AED",
                "value": 3.6721704931
            },
            "AFN": {
                "code": "AFN",
                "value": 77.9836485971
            },
            "ALL": {
                "code": "ALL",
                "value": 101.1734797428
            },
            "AMD": {
                "code": "AMD",
                "value": 390.5443530321
            },
            "ANG": {
                "code": "ANG",
                "value": 1.787030234
            },
            "AOA": {
                "code": "AOA",
                "value": 826.3653320933
            },
            "ARB": {
                "code": "ARB",
                "value": 1.1235625593
            },
            "ARS": {
                "code": "ARS",
                "value": 350.1123295345
            },
            "AUD": {
                "code": "AUD",
                "value": 1.5562502553
            },
            "AVAX": {
                "code": "AVAX",
                "value": 0.1082040803
            },
            "AWG": {
                "code": "AWG",
                "value": 1.79
            },
            "AZN": {
                "code": "AZN",
                "value": 1.7
            },
            "BAM": {
                "code": "BAM",
                "value": 1.8544903182
            },
            "BBD": {
                "code": "BBD",
                "value": 2
            },
            "BDT": {
                "code": "BDT",
                "value": 110.1424420071
            },
            "BGN": {
                "code": "BGN",
                "value": 1.8503303311
            },
            "BHD": {
                "code": "BHD",
                "value": 0.376
            },
            "BIF": {
                "code": "BIF",
                "value": 2836.0271703479
            },
            "BMD": {
                "code": "BMD",
                "value": 1
            },
            "BNB": {
                "code": "BNB",
                "value": 0.0046545857
            },
            "BND": {
                "code": "BND",
                "value": 1.3651102648
            },
            "BOB": {
                "code": "BOB",
                "value": 6.9361511868
            },
            "BRL": {
                "code": "BRL",
                "value": 5.0342509464
            },
            "BSD": {
                "code": "BSD",
                "value": 1
            },
            "BTC": {
                "code": "BTC",
                "value": 0.0000370049
            },
            "BTN": {
                "code": "BTN",
                "value": 83.3297946324
            },
            "BUSD": {
                "code": "BUSD",
                "value": 1.0020596916
            },
            "BWP": {
                "code": "BWP",
                "value": 13.779342419
            },
            "BYN": {
                "code": "BYN",
                "value": 2.4996268992
            },
            "BYR": {
                "code": "BYR",
                "value": 24996.260356759
            },
            "BZD": {
                "code": "BZD",
                "value": 2
            },
            "CAD": {
                "code": "CAD",
                "value": 1.3491401435
            },
            "CDF": {
                "code": "CDF",
                "value": 2482.9720400109
            },
            "CHF": {
                "code": "CHF",
                "value": 0.9148201253
            },
            "CLF": {
                "code": "CLF",
                "value": 0.024630003
            },
            "CLP": {
                "code": "CLP",
                "value": 906.1805172196
            },
            "CNY": {
                "code": "CNY",
                "value": 7.3030613499
            },
            "COP": {
                "code": "COP",
                "value": 4061.1075215252
            },
            "CRC": {
                "code": "CRC",
                "value": 533.4434804308
            },
            "CUC": {
                "code": "CUC",
                "value": 1
            },
            "CUP": {
                "code": "CUP",
                "value": 24
            },
            "CVE": {
                "code": "CVE",
                "value": 104.3996858504
            },
            "CZK": {
                "code": "CZK",
                "value": 23.0361727149
            },
            "DAI": {
                "code": "DAI",
                "value": 1.0082970268
            },
            "DJF": {
                "code": "DJF",
                "value": 177.721
            },
            "DKK": {
                "code": "DKK",
                "value": 7.0597010037
            },
            "DOP": {
                "code": "DOP",
                "value": 56.7884813256
            },
            "DOT": {
                "code": "DOT",
                "value": 0.2461166423
            },
            "DZD": {
                "code": "DZD",
                "value": 138.3530641245
            },
            "EGP": {
                "code": "EGP",
                "value": 30.9132938692
            },
            "ERN": {
                "code": "ERN",
                "value": 15
            },
            "ETB": {
                "code": "ETB",
                "value": 55.2618260962
            },
            "ETH": {
                "code": "ETH",
                "value": 0.0006049972
            },
            "EUR": {
                "code": "EUR",
                "value": 0.9468501578
            },
            "FJD": {
                "code": "FJD",
                "value": 2.2946503321
            },
            "FKP": {
                "code": "FKP",
                "value": 0.8193561488
            },
            "GBP": {
                "code": "GBP",
                "value": 0.819460138
            },
            "GEL": {
                "code": "GEL",
                "value": 2.661380469
            },
            "GGP": {
                "code": "GGP",
                "value": 0.8193559426
            },
            "GHS": {
                "code": "GHS",
                "value": 11.5772913366
            },
            "GIP": {
                "code": "GIP",
                "value": 0.8193557769
            },
            "GMD": {
                "code": "GMD",
                "value": 60.7005592411
            },
            "GNF": {
                "code": "GNF",
                "value": 8528.5023600997
            },
            "GTQ": {
                "code": "GTQ",
                "value": 7.8526508324
            },
            "GYD": {
                "code": "GYD",
                "value": 208.9640681803
            },
            "HKD": {
                "code": "HKD",
                "value": 7.8275713363
            },
            "HNL": {
                "code": "HNL",
                "value": 24.6590227465
            },
            "HRK": {
                "code": "HRK",
                "value": 7.0434607639
            },
            "HTG": {
                "code": "HTG",
                "value": 135.5308571611
            },
            "HUF": {
                "code": "HUF",
                "value": 371.0052178631
            },
            "IDR": {
                "code": "IDR",
                "value": 15505.361284552
            },
            "ILS": {
                "code": "ILS",
                "value": 3.8406204266
            },
            "IMP": {
                "code": "IMP",
                "value": 0.8193559186
            },
            "INR": {
                "code": "INR",
                "value": 83.0855909618
            },
            "IQD": {
                "code": "IQD",
                "value": 1308.0095382715
            },
            "IRR": {
                "code": "IRR",
                "value": 42020.950465447
            },
            "ISK": {
                "code": "ISK",
                "value": 137.0706219863
            },
            "JEP": {
                "code": "JEP",
                "value": 0.8193558338
            },
            "JMD": {
                "code": "JMD",
                "value": 155.5354548463
            },
            "JOD": {
                "code": "JOD",
                "value": 0.71
            },
            "JPY": {
                "code": "JPY",
                "value": 149.366587597
            },
            "KES": {
                "code": "KES",
                "value": 147.7735570266
            },
            "KGS": {
                "code": "KGS",
                "value": 88.5964410281
            },
            "KHR": {
                "code": "KHR",
                "value": 4117.5270177491
            },
            "KMF": {
                "code": "KMF",
                "value": 467.570864441
            },
            "KPW": {
                "code": "KPW",
                "value": 900.0039069467
            },
            "KRW": {
                "code": "KRW",
                "value": 1346.4339096853
            },
            "KWD": {
                "code": "KWD",
                "value": 0.3078300449
            },
            "KYD": {
                "code": "KYD",
                "value": 0.83333
            },
            "KZT": {
                "code": "KZT",
                "value": 473.7077981171
            },
            "LAK": {
                "code": "LAK",
                "value": 20311.232815924
            },
            "LBP": {
                "code": "LBP",
                "value": 15017.620232253
            },
            "LKR": {
                "code": "LKR",
                "value": 322.886659865
            },
            "LRD": {
                "code": "LRD",
                "value": 186.7125200532
            },
            "LSL": {
                "code": "LSL",
                "value": 19.0889319801
            },
            "LTC": {
                "code": "LTC",
                "value": 0.0153376978
            },
            "LTL": {
                "code": "LTL",
                "value": 3.2690947517
            },
            "LVL": {
                "code": "LVL",
                "value": 0.6654076754
            },
            "LYD": {
                "code": "LYD",
                "value": 4.8865508509
            },
            "MAD": {
                "code": "MAD",
                "value": 10.3073017969
            },
            "MATIC": {
                "code": "MATIC",
                "value": 1.9292566895
            },
            "MDL": {
                "code": "MDL",
                "value": 18.1281130797
            },
            "MGA": {
                "code": "MGA",
                "value": 4518.9464690982
            },
            "MKD": {
                "code": "MKD",
                "value": 57.9585761191
            },
            "MMK": {
                "code": "MMK",
                "value": 2095.2049200178
            },
            "MNT": {
                "code": "MNT",
                "value": 3479.4384146403
            },
            "MOP": {
                "code": "MOP",
                "value": 8.0922315231
            },
            "MRO": {
                "code": "MRO",
                "value": 356.999828
            },
            "MUR": {
                "code": "MUR",
                "value": 44.5575870557
            },
            "MVR": {
                "code": "MVR",
                "value": 15.4548829
            },
            "MWK": {
                "code": "MWK",
                "value": 1083.986342678
            },
            "MXN": {
                "code": "MXN",
                "value": 17.5377022382
            },
            "MYR": {
                "code": "MYR",
                "value": 4.708120928
            },
            "MZN": {
                "code": "MZN",
                "value": 63.6999419503
            },
            "NAD": {
                "code": "NAD",
                "value": 19.0706529764
            },
            "NGN": {
                "code": "NGN",
                "value": 778.2500739475
            },
            "NIO": {
                "code": "NIO",
                "value": 36.5609510454
            },
            "NOK": {
                "code": "NOK",
                "value": 10.7286618996
            },
            "NPR": {
                "code": "NPR",
                "value": 132.8397725115
            },
            "NZD": {
                "code": "NZD",
                "value": 1.6766702891
            },
            "OMR": {
                "code": "OMR",
                "value": 0.3841700573
            },
            "OP": {
                "code": "OP",
                "value": 0.7573475471
            },
            "PAB": {
                "code": "PAB",
                "value": 0.9991301671
            },
            "PEN": {
                "code": "PEN",
                "value": 3.7755705604
            },
            "PGK": {
                "code": "PGK",
                "value": 3.6539003873
            },
            "PHP": {
                "code": "PHP",
                "value": 56.7082495601
            },
            "PKR": {
                "code": "PKR",
                "value": 287.7524220608
            },
            "PLN": {
                "code": "PLN",
                "value": 4.3904307889
            },
            "PYG": {
                "code": "PYG",
                "value": 7318.2704253521
            },
            "QAR": {
                "code": "QAR",
                "value": 3.6407805129
            },
            "RON": {
                "code": "RON",
                "value": 4.7083906331
            },
            "RSD": {
                "code": "RSD",
                "value": 110.6382046822
            },
            "RUB": {
                "code": "RUB",
                "value": 96.6738385647
            },
            "RWF": {
                "code": "RWF",
                "value": 1210.2893208872
            },
            "SAR": {
                "code": "SAR",
                "value": 3.7459807171
            },
            "SBD": {
                "code": "SBD",
                "value": 8.4478511168
            },
            "SCR": {
                "code": "SCR",
                "value": 14.1924221055
            },
            "SDG": {
                "code": "SDG",
                "value": 601.5
            },
            "SEK": {
                "code": "SEK",
                "value": 10.9228721561
            },
            "SGD": {
                "code": "SGD",
                "value": 1.3659602302
            },
            "SHP": {
                "code": "SHP",
                "value": 0.8194601215
            },
            "SLL": {
                "code": "SLL",
                "value": 22482.875923129
            },
            "SOL": {
                "code": "SOL",
                "value": 0.0502436346
            },
            "SOS": {
                "code": "SOS",
                "value": 569.5433350948
            },
            "SRD": {
                "code": "SRD",
                "value": 38.1369671129
            },
            "STD": {
                "code": "STD",
                "value": 23405.748488374
            },
            "SVC": {
                "code": "SVC",
                "value": 8.75
            },
            "SYP": {
                "code": "SYP",
                "value": 13001.875362454
            },
            "SZL": {
                "code": "SZL",
                "value": 18.9560924434
            },
            "THB": {
                "code": "THB",
                "value": 36.5799138867
            },
            "TJS": {
                "code": "TJS",
                "value": 10.8933721715
            },
            "TMT": {
                "code": "TMT",
                "value": 3.5
            },
            "TND": {
                "code": "TND",
                "value": 3.1633804609
            },
            "TOP": {
                "code": "TOP",
                "value": 2.3672304527
            },
            "TRY": {
                "code": "TRY",
                "value": 27.450423035
            },
            "TTD": {
                "code": "TTD",
                "value": 6.7723209507
            },
            "TWD": {
                "code": "TWD",
                "value": 32.1275641476
            },
            "TZS": {
                "code": "TZS",
                "value": 2503.3846348351
            },
            "UAH": {
                "code": "UAH",
                "value": 36.7084961443
            },
            "UGX": {
                "code": "UGX",
                "value": 3755.8678002934
            },
            "USD": {
                "code": "USD",
                "value": 1
            },
            "USDC": {
                "code": "USDC",
                "value": 1.0040612325
            },
            "USDT": {
                "code": "USDT",
                "value": 1.0026793725
            },
            "UYU": {
                "code": "UYU",
                "value": 38.5049061084
            },
            "UZS": {
                "code": "UZS",
                "value": 12197.539608113
            },
            "VEF": {
                "code": "VEF",
                "value": 3425794.3807803
            },
            "VND": {
                "code": "VND",
                "value": 24386.147739405
            },
            "VUV": {
                "code": "VUV",
                "value": 122.0009344825
            },
            "WST": {
                "code": "WST",
                "value": 2.7759957184
            },
            "XAF": {
                "code": "XAF",
                "value": 620.9536272958
            },
            "XAG": {
                "code": "XAG",
                "value": 0.044119681
            },
            "XAU": {
                "code": "XAU",
                "value": 0.0005357505
            },
            "XCD": {
                "code": "XCD",
                "value": 2.7
            },
            "XDR": {
                "code": "XDR",
                "value": 0.7610701298
            },
            "XOF": {
                "code": "XOF",
                "value": 620.9535879612
            },
            "XPD": {
                "code": "XPD",
                "value": 0.000796331
            },
            "XPF": {
                "code": "XPF",
                "value": 112.8835214359
            },
            "XPT": {
                "code": "XPT",
                "value": 0.0010979124
            },
            "XRP": {
                "code": "XRP",
                "value": 1.9670696714
            },
            "YER": {
                "code": "YER",
                "value": 249.8877566534
            },
            "ZAR": {
                "code": "ZAR",
                "value": 18.9874823413
            },
            "ZMK": {
                "code": "ZMK",
                "value": 9001.2
            },
            "ZMW": {
                "code": "ZMW",
                "value": 20.8171621381
            },
            "ZWL": {
                "code": "ZWL",
                "value": 5359.2595817284
            }
        }
    }

    let date = result["meta"]["last_updated_at"]
    date = date.slice(0, 10);
    let finalDate = date.slice(-2) + "-" + date.slice(5, 7) + "-" + date.slice(0, 4);
    document.querySelector('#lastUpdated').style.display = "initial";
    document.querySelector('#disclaimerText').style.display = "initial";
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
    tr.forEach((element, index) => {
        let td = element.getElementsByTagName('td')[0];
        if (td.innerText.includes(resultSearch.value.toUpperCase())) {
            element.style.display = "table-row";
            if(resultSearch.value != ""){
                element.style.border = "1px solid #dddddd";
                element.style.backgroundColor = "white";
            }
        }
        else {
            element.style.display = "none";
        }
    });
})

// document.body.addEventListener('click', ()=>{
//     Array.from(content).forEach((element,index)=>{
//         addSearchTerms(index);
//         element.classList.toggle('active');
//         downArrow[index].classList.toggle('rotate');
//     })
// })


let inputSec = document.querySelector('#input');


// inputSec.addEventListener("mouseup", function (e) {
//     // rest code here
//     if(!inputSec.is(e.target) && inputSec.has(e.target).length === 0) {
//         console.log("yes")
//     }
// })

window.addEventListener('click', function (e) {
    if (!inputSec.contains(e.target)) {
        Array.from(content).forEach((element, index) => {
            if (element.classList.contains('active')) {
                element.classList.toggle('active');
                downArrow[index].classList.toggle('rotate');
            }
        })
    }
});