
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

function scrollToBalance() {
  var charitySection = document.getElementById("total-balance");
  charitySection.scrollIntoView({ behavior: "smooth" });
}
function scrollToIncome() {
  var charitySection = document.getElementById("total-income");
  charitySection.scrollIntoView({ behavior: "smooth" });
}
function scrollToExpense() {
  var charitySection = document.getElementById("total-expense");
  charitySection.scrollIntoView({ behavior: "smooth" });
}
function scrollToGoals() {
  var charitySection = document.getElementById("outer-rectangle5");
  charitySection.scrollIntoView({ behavior: "smooth" });
}



// Load weekly graph data and render by default
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

// open weekly/monthly/yearly graph for week/month/year button respectively 
function openGraph(interval) {
  // Clear previous graph if any
  document.getElementById("graphContainer").innerHTML = "";

  // Load and render graph data based on the selected interval
  if (interval === "weekly") {
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
      text: "Expenses (Past Week)"
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


const animateMeElements = document.querySelectorAll('.animate-me');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-me-visible');
    } else {
      entry.target.classList.remove('animate-me-visible');
    }
  });
});

animateMeElements.forEach(element => {
  observer.observe(element);
});

const todoCheckbox = document.getElementById('todo-checkbox');
const todoText = document.querySelector('.todo-text');

todoCheckbox.addEventListener('click', () => {
  if (todoCheckbox.checked) {
    todoText.style.textDecoration = 'line-through';
    todoText.style.color = '#ccc';
  } else {
    todoText.style.textDecoration = 'none';
    todoText.style.color = '#000';
  }
});

const transactionForm = document.getElementById('transaction-form');
const transactionTable = document.querySelector('.outer-rectangle3 table tbody');

transactionForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const dateInput = document.getElementById('date-input');
  const descriptionInput = document.getElementById('description-input');
  const amountInput = document.getElementById('amount-input');
  const date = dateInput.value;
  const description = descriptionInput.value;
  const amount = amountInput.value;
  const transactionRow = `
    <tr>
      <td>${date}</td>
      <td>${description}</td>
      <td>${amount}</td>
    </tr>
  `;
  transactionTable.insertAdjacentHTML('beforeend', transactionRow);
  dateInput.value = '';
  descriptionInput.value = '';
  amountInput.value = '';
});

