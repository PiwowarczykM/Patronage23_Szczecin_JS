var url = "https://api.npoint.io/38edf0c5f3eb9ac768bd";
window.onload = () => {
    getData(url);
    const query = window.location.search;
    const params = new URLSearchParams(query);
    const username = params.get("username");
    
    document.getElementById('username').innerHTML = username;
};

function usernameLoad() {

}

async function getData(url) {
    var response = await fetch(url);

    var data = await response.json();

    show(data);
};

function show(data) {
    const iconDictionary = {
        1: '<i class="fa-solid fa-hand-holding-dollar"></i>',
        2: '<i class="fa-solid fa-cart-shopping"></i>',
        3: '<i class="fa-solid fa-sack-dollar"></i>',
        4: '<i class="fa-regular fa-credit-card"></i>'
    }

    let tab = 
        `<tr>
          <th>Data</th>
          <th>Typ transakcji</th>
          <th>Opis</th>
          <th>Kwota</th>
          <th>Saldo</th>
         </tr>`;
    
    for (let r of data.transactions) {
        tab += `<tr> 
    <td>${r.date} </td>
    <td>${iconDictionary[r.type]}</td>
    <td>${r.description}</td> 
    <td>${r.amount}</td> 
    <td>${r.balance}</td>                   
</tr>`;
    }
    document.getElementById("transactionsTable").innerHTML = tab;
    
    pieChart = document.getElementById("chart1");
    barChart = document.getElementById("chart2");

    const percentageTranactionTypes = calculateTransactionPercentage(data);

    new Chart(pieChart, {
        type: 'pie',
        data: {
        labels: Object.values(data.transacationTypes),
        datasets: [{
            label: '% transakcji',
            data: percentageTranactionTypes,
            borderWidth: 1
        }]
        },
        options: {
        }
    });

    let days = new Set();


    data.transactions.forEach(element => {
        days.add(element.date);
    });

    days = Array.from(days);

    let finalDayBalance = [];

    days.forEach(element => {
        var day = data.transactions.find((transaction) =>{
            return transaction.date == element
        });
        finalDayBalance.push(day.balance);
    }); 

    new Chart(barChart, {
        type: 'bar',
        data: {
        labels: days,
        datasets: [{
            label: 'Saldo',
            data: finalDayBalance,
            borderWidth: 1
        }]
        },
        options: {
        }
    });

}

function calculateTransactionPercentage(data) {
    let totalValue = data.transactions.length;
    let enumerate = [0,0,0,0,0];

    data.transactions.forEach(transaction => {
        enumerate[transaction.type] = enumerate[transaction.type] + 1;
    });

    Object.keys(enumerate).forEach((key) =>{
        enumerate[key] = Math.round((100 * enumerate[key]) / totalValue);
    });

    return enumerate.slice(1);
};

function logout() {
    sessionStorage.setItem('loggedin', false);
    window.location.href='index.html';
}