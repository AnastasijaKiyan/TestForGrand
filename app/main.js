var bitcointData, ethereumData, litecoinData;
var urlPrefix = "https://apiv2.bitcoinaverage.com/indices/global/ticker/";
var cryptos = {
    Bitcoin: "BTC",
    Ethereum: "ETH",
    Litecoin: "LTC"
};
var currencies = {
    USD: "$",
    EUR: "€",
    RUB: "₽",
    GBP: "£"
};

MakeRequest: function MakeRequest(crypto, currency, callback) {
    var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
    var xhr = new XHR();
    xhr.open('GET', urlPrefix + crypto + currency, false);
    xhr.send();
    if (xhr.status != 200) {
        console.log(xhr.status + ': ' + xhr.statusText);
    } else {
        callback(xhr.responseText);
    }
};


Render: function Render(currency) {
    MakeRequest(cryptos.Bitcoin, currency, function (responseText) {
        bitcointData = JSON.parse(responseText);
    });
    MakeRequest(cryptos.Litecoin, currency, function (responseText) {
        litecoinData = JSON.parse(responseText);
    });
    MakeRequest(cryptos.Ethereum, currency, function (responseText) {
        ethereumData = JSON.parse(responseText);
    });
    var currencySymbol = currencies[currency];
    var dataTemp;
    // Ethereum
    dataTemp = ethereumData.volume.toFixed(2);
    $(".EnthereumCurrency .data-values .price .data").text(currencySymbol + dataTemp);
    dataTemp = 100 + ethereumData.volume_percent.toFixed(1);
    $(".EnthereumCurrency .data-values .percent-change .data").text("%" + dataTemp);
    if (dataTemp < 0) {
        $(".EnthereumCurrency .data-values .percent-change .data").css("color", "red");
    }
    dataTemp = ethereumData.changes.price.hour.toFixed(2);
    $(".EnthereumCurrency .data-values .hour-change .data").text(currencySymbol + dataTemp);
    if (dataTemp < 0) {
        $(".EnthereumCurrency .data-values .hour-change .data").css("color", "red");
    }
    dataTemp = ethereumData.changes.price.day.toFixed(2);
    $(".EnthereumCurrency .data-values .day-change .data").text(currencySymbol + dataTemp);
    if (dataTemp < 0) {
        $(".EnthereumCurrency .data-values .day-change .data").css("color", "red");
    }
    dataTemp = ethereumData.changes.price.week.toFixed(2);
    $(".EnthereumCurrency .data-values .week-change .data").text(currencySymbol + dataTemp);
    if (dataTemp < 0) {
        $(".EnthereumCurrency .data-values .week-change .data").css("color", "red");
    }
    dataTemp = ethereumData.changes.price.month.toFixed(2);
    $(".EnthereumCurrency .data-values .month-change .data").text(currencySymbol + dataTemp);
    if (dataTemp < 0) {
        $(".EnthereumCurrency .data-values .month-change .data").css("color", "red");
    }
    // Bitcoin


    // Litecoin


}



$("#DropDownSelector a").click(function (e) {
    e.preventDefault();
    var selText = $(this).text();
    $("#dropdownMenuOffset").text(selText);
    Render(selText);
});