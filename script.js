'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const account5 = {
  owner: 'Gokulraj Mariyapan',
  movements: [230, 1000, 3700, -185, 150, 2190, -280, 2900, -1300, 2800],
  interestRate: 2.3,
  pin: 1011,
};

const account6 = {
  owner: 'Jyosini Gokulraj',
  movements: [230, 1000, 700, -185, 50, 90, -280, 500, -1300, 2800],
  interestRate: 2.1,
  pin: 1407,
};

const accounts = [account1, account2, account3, account4, account5, account6];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelInvalid = document.querySelector('.invalid');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;
  movs.forEach(function (mov, i) {
    const trans = mov > 0 ? 'deposit' : 'withdrawal';
    const HTML = `

<div class="movements__row">
          <div class="movements__type movements__type--${trans}">${
      i + 1
    } ${trans}</div>
          
          <div class="movements__value">${mov}£</div>
        </div>
`;
    containerMovements.insertAdjacentHTML('afterbegin', HTML);
  });
};

const calcDisplayBalance = function (accs) {
  accs.balance = accs.movements.reduce(function (acc, curr) {
    return acc + curr;
  }, 0);
  labelBalance.textContent = `${accs.balance}£`;
  // console.log(balance);
};

const calcDisplaySummary = function (accs) {
  const income = accs.movements
    .filter(mov => mov > 0)
    .reduce((acc, curr) => acc + curr, 0);
  labelSumIn.textContent = `${income}£`;

  const outgoing = accs.movements
    .filter(mov => mov < 0)
    .reduce((acc, curr) => acc + curr, 0);
  labelSumOut.textContent = `${Math.abs(outgoing)}£`;

  const interest = accs.movements
    .filter(mov => mov > 0)
    .map(mov => (mov * accs.interestRate) / 100)
    .filter(mov => mov > 1)
    .reduce((acc, curr) => acc + curr, 0);
  labelSumInterest.textContent = `${interest.toFixed(2)}£`;
};

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

const createUserNames = function (accs) {
  accs.forEach(function (acc) {
    acc.userName = acc.owner
      .toLowerCase()
      .split(' ')
      .map(value => value[0])
      .join('');
  });
};
createUserNames(accounts);
// console.log(accounts);

const updateUI = function (accs) {
  displayMovements(accs.movements);
  calcDisplayBalance(accs);
  calcDisplaySummary(accs);
};

let currentAccount;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.userName === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `Welcome, ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    updateUI(currentAccount);
  } else {
    labelInvalid.classList.remove('hidden');
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const recevierAcc = accounts.find(
    acc => acc.userName === inputTransferTo.value
  );
  inputTransferTo.value = inputTransferAmount.value = '';
  if (
    amount > 0 &&
    recevierAcc &&
    amount < currentAccount.balance &&
    recevierAcc !== currentAccount.userName
  ) {
    currentAccount.movements.push(-amount);
    recevierAcc.movements.push(amount);
    updateUI(currentAccount);
    console.log(`Transfer ${amount}£ Completed`);
  } else {
    console.log(`Invalid Transfer`);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const loanAmount = Number(inputLoanAmount.value);
  const loanPercentage = currentAccount.movements.some(
    mov => mov >= loanAmount * 0.1
  );
  console.log(loanPercentage);
  if (loanAmount > 0 && loanPercentage) {
    currentAccount.movements.push(loanAmount);
    updateUI(currentAccount);
    inputLoanAmount.value = '';
  } else {
    console.log(`Invalid Loan Amount`);
  }
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  const userAccountConfim = inputCloseUsername.value;
  const userPinConfirm = Number(inputClosePin.value);
  if (
    userAccountConfim === currentAccount.userName &&
    userPinConfirm === currentAccount.pin
  ) {
    const userDelete = accounts.findIndex(
      acc => acc.userName === currentAccount.userName
    );
    accounts.splice(userDelete, 1);
    // console.log(`Deleted account: ${currentAccount.owner}`);
    containerApp.style.opacity = 0;
    labelWelcome.textContent = `Your account has been deleted`;
  } else {
    console.log(`Invalid account entered: ${userAccountConfim}`);
  }
});
/////////////////////////////////////////////////
/////////////////////////////////////////////////

//-------------Challenges

const findOwner = function (accs) {
  // for (const acc of accs) {}
  const accOwners = accs.find(ao => ao.owner === 'Jessica Davis');
  console.log(accOwners);
};

// findOwner(accounts);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// // const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// /////////////////////////////////////////////////

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// // console.log(movements.entries());
// // console.log(movements);

// for (const [i, movement] of movements.entries()) {
//   if (movement > 0) {
//     console.log(`Movement ${i + 1}: You have made a deposit of ${movement}`);
//   } else {
//     console.log(
//       `Movement ${i + 1}: You have made a withdrawl of ${Math.abs(movement)}`
//     );
//   }
// }

// console.log(`----ForEach----`);

// movements.forEach(function (movement, i, arr) {
//   if (movement > 0) {
//     console.log(`Movement ${i + 1}: You have made a deposit of ${movement}`);
//   } else {
//     console.log(
//       `Movement ${i + 1}: You have made a withdrawl of ${Math.abs(movement)}`
//     );
//   }
// });
