const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillionairesBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");

let data = [];

// format number as money
const formatMoney = number => {
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
};

const updateDOM = (providedData = data) => {
  main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>";
  providedData.forEach(item => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
      item.money
    )}`;
    main.appendChild(element);
  });
};

// add new obj to data arr
const addData = user => {
  data.push(user);

  updateDOM();
};

// fetch random user and add money
const getRandomUser = async () => {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();

  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000)
  };

  addData(newUser);
};

const doubleMoney = () => {
  data = data.map(user => {
    return { ...user, money: user.money * 2 };
  });

  updateDOM();
};

const sortByRichest = () => {
  data.sort((a, b) => b.money - a.money);

  updateDOM();
};

const showMills = () => {
  data = data.filter(user => user.money > 1000000);

  updateDOM();
};

const calculateWealth = () => {
  const total = data.reduce((acc, user) => acc + user.money, 0);

  const wealthEl = document.createElement("div");
  wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(
    total
  )}</strong></h3>`;
  main.appendChild(wealthEl);
};

getRandomUser();
getRandomUser();
getRandomUser();

addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
sortBtn.addEventListener("click", sortByRichest);
showMillionairesBtn.addEventListener("click", showMills);
calculateWealthBtn.addEventListener("click", calculateWealth);
