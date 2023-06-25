
// Get references to HTML elements
const transactionForm = document.getElementById('transaction-form');
const typeInput = document.getElementById('type');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const transactionHistory = document.getElementById('transaction-history');
const currentBalance = document.getElementById('current-balance');

// Data structures for transactions
let incomeTransactions = [];
let expenseTransactions = [];

// Function to add a new transaction
function addTransaction(type, description, amount) {
  const transaction = {
    id: Date.now(),
    type: type,
    description: description,
    amount: parseFloat(amount)
  };

  if (type === 'income') {
    incomeTransactions.push(transaction);
  } else if (type === 'expense') {
    expenseTransactions.push(transaction);
  }

  updateBalance();
  updateTransactionHistory();
}

// Function to update the balance
function updateBalance() {
  const income = incomeTransactions.reduce((total, transaction) => total + transaction.amount, 0);
  const expenses = expenseTransactions.reduce((total, transaction) => total + transaction.amount, 0);
  const balance = income - expenses;

  currentBalance.textContent = formatCurrency(balance);
}

// Function to update the transaction history
function updateTransactionHistory() {
  transactionHistory.innerHTML = '';

  incomeTransactions.forEach(transaction => {
    const listItem = createTransactionListItem(transaction, 'income');
    transactionHistory.appendChild(listItem);
  });

  expenseTransactions.forEach(transaction => {
    const listItem = createTransactionListItem(transaction, 'expense');
    transactionHistory.appendChild(listItem);
  });
}

// Helper function to create a transaction list item
function createTransactionListItem(transaction, type) {
  const listItem = document.createElement('li');
  listItem.classList.add('transaction-item', type);

  const sign = (type === 'income') ? '+' : '-';
  const amount = formatCurrency(transaction.amount);

  listItem.innerHTML = `
    <span class="transaction-description">${transaction.description}</span>
    <span class="transaction-amount">${sign}${amount}</span>
    <button class="delete-button" onclick="deleteTransaction(${transaction.id}, '${type}')">
      <i class="fas fa-trash"></i>
    </button>
  `;

  return listItem;
}

// Helper function to format currency values
function formatCurrency(value) {
  return value.toFixed(2);
}

// Calculate and display the initial balance
updateBalance();

// Event listener for form submission
transactionForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const type = typeInput.value;
  const description = descriptionInput.value;
  const amount = amountInput.value;

  if (type && description && amount) {
    addTransaction(type, description, amount);

    // Reset the form
    typeInput.value = '';
    descriptionInput.value = '';
    amountInput.value = '';
  }
});



// Function to delete a transaction
function deleteTransaction(transactionId, type) {
  if (type === 'income') {
    incomeTransactions = incomeTransactions.filter(transaction => transaction.id !== transactionId);
  } else if (type === 'expense') {
    expenseTransactions = expenseTransactions.filter(transaction => transaction.id !== transactionId);
  }

  updateBalance();
  updateTransactionHistory();
}
function calculateTotal() {
  // Get all the input fields for amount
  var amountInputs = document.querySelectorAll('input[name="amount"]');
  
  // Initialize a variable to hold the total sum
  var totalSum = 0;
  
  // Iterate over the input fields and add up the values
  amountInputs.forEach(function(input) {
    var amount = parseFloat(input.value);
    if (!isNaN(amount)) {
      totalSum += amount;
    }
  });
  
  // Display the total sum in the designated element
  document.getElementById("total-charity").textContent = "Total Charity: " + totalSum.toFixed(2);
}
function scrollToCharity() {
  var charitySection = document.getElementById("charity");
  charitySection.scrollIntoView({ behavior: "smooth" });
}
function scrollToInvestment() {
  var charitySection = document.getElementById("Investment");
  charitySection.scrollIntoView({ behavior: "smooth" });
}
function scrollToLoans() {
  var charitySection = document.getElementById("Loans");
  charitySection.scrollIntoView({ behavior: "smooth" });
}
function scrollToUtility() {
  var charitySection = document.getElementById("utility");
  charitySection.scrollIntoView({ behavior: "smooth" });
}

function addCard() {
  var cardName = document.getElementById('cardName').value;
  var cardNumber = document.getElementById('cardNumber').value;

  var cardElement = document.createElement('div');
  cardElement.classList.add('card');
  cardElement.innerHTML = '<strong>' + cardName + '</strong><br>Card Number: ' + cardNumber;

  document.getElementById('cardList').appendChild(cardElement);

  // Reset the form fields
  document.getElementById('cardName').value = '';
  document.getElementById('cardNumber').value = '';
}

// open weekly/monthly/yearly graph for week/month/year button respectively 
function openGraph(interval) {
  // Clear previous graph if any
  document.getElementById("graphContainer").innerHTML = "";

  // Load and render graph data based on the selected interval
  if (interval === "weekly") {
    // Load weekly graph data and render
    var weeklyData = [
      // Weekly graph data
      {
        type: "bar",
        yValueFormatString: "#,##0.## $",
        indexLabel: "{y}",
        indexLabelPlacement: "inside",
        indexLabelFontColor: "white",
        dataPoints: [
          { label: "M", y: 100},  
          { label: "T", y: 150 },
          { label: "W", y: 50 },
          { label: "T", y: 110 },
          { label: "F", y: 200 },
          { label: "S", y: 120 },
          { label: "S", y: 100 }
        ]
      }

    ];
    renderGraph(weeklyData);
  } else if (interval === "monthly") {
    // Load monthly graph data and render
    var monthlyData = [
      // Monthly graph data
      {
        type: "bar",
        yValueFormatString: "#,##0.## $",
        indexLabel: "{y}",
        indexLabelPlacement: "inside",
        indexLabelFontColor: "white",
        dataPoints: [
          { label: "Jan", y: 10000},
          {  label: "Feb", y: 15000 },
          { label: "Mar", y: 5000 },
          { label: "Apr", y: 11000 },
          { label: "May", y: 20000 },
          { label: "Jun", y: 12000 },
          { label: "Jul", y: 10800 },
          { label: "Aug", y: 10080 },
          { label: "Sep", y: 19000 },
          { label: "Oct", y: 15000 },
          { label: "Nov", y: 20000 },
          { label: "Dec", y: 10000 }
        ]
      }
    ];
    renderGraph(monthlyData);
  } else if (interval === "yearly") {
    // Load yearly graph data and render
    var yearlyData = [
      // Yearly graph data
      {
        type: "bar",
        yValueFormatString: "#,##0.## $",
        indexLabel: "{y}",
        indexLabelPlacement: "inside",
        indexLabelFontColor: "white",
        dataPoints: [

          { label: "2015", y: 100},
          { label: "2016", y: 150 },
          { label: "2017", y: 50 },
          { label: "2018", y: 110 },
          { label: "2019", y: 200 },
          { label: "2020", y: 120 },
          { label: "2021", y: 100 }
        ]
      }

    ];
    renderGraph(yearlyData);
  }
}

function renderGraph(data) {
  // Render the graph using the provided data
  var chart = new CanvasJS.Chart("graphContainer", {
    // Chart options
    animationEnabled: true,
    theme: "dark2",
    colorSet: "colorSet2",
    
    title: {
      text: "Expenses"
    },
    axisY: {
      title: "Amount in $"
    },
    data:
      [
        {
          dataPoints: data[0].dataPoints
        }
      ]
  });
  chart.render();
}

function createCalendar() {
  const calendarContainer = document.getElementById('calendar');

  // Get the current date
  const currentDate = new Date();

  // Get the year and month of the current date
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Get the number of days in the current month
  const numDays = new Date(year, month + 1, 0).getDate();

  // Get the day of the week the month starts on
  const startDay = new Date(year, month, 1).getDay();

  // Create a calendar grid with the dates
  for (let i = 0; i < startDay; i++) {
    const emptyDateElement = document.createElement('div');
    emptyDateElement.classList.add('date', 'empty');
    calendarContainer.appendChild(emptyDateElement);
  }

  for (let i = 1; i <= numDays; i++) {
    const dateElement = document.createElement('div');
    dateElement.classList.add('date');
    dateElement.textContent = i;
    calendarContainer.appendChild(dateElement);
  }
}

// Call the createCalendar function to generate the calendar
createCalendar();
