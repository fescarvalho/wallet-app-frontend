const renderFinancesList = (data) => {
  const table = document.getElementById("finances-table");
  /*  <tr>
  <td>Item1</td>
  <td>Item2</td>
  <td>Item3</td>
  <td class="center">Item5</td>
  <td class="right">Item4</td>
</tr> */
  data.map((item) => {
    const tableRow = document.createElement("tr");
    tableRow.className = "mt-s";

    //title
    const titleTd = document.createElement("td");
    const titleText = document.createTextNode(item.title);
    titleTd.appendChild(titleText);

    tableRow.appendChild(titleTd);

    //category
    const categoryTd = document.createElement("td");
    const tcategoryText = document.createTextNode(item.name);
    categoryTd.appendChild(tcategoryText);

    tableRow.appendChild(categoryTd);

    //date
    const dateTd = document.createElement("td");
    const dateText = document.createTextNode(new Date(item.date).toLocaleDateString());
    dateTd.appendChild(dateText);

    tableRow.appendChild(dateTd);

    //value
    const valueTd = document.createElement("td");
    const valueText = document.createTextNode(
      new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
        item.value,
      ),
    );
    valueTd.className = "center";
    valueTd.appendChild(valueText);

    tableRow.appendChild(valueTd);

    //table add tableRow
    table.appendChild(tableRow);

    //delete
    const deleteTd = document.createElement("td");
    const deleteText = document.createTextNode("Deletar");

    deleteTd.className = "right";
    deleteTd.appendChild(deleteText);

    tableRow.appendChild(deleteTd);
  });
};

const renderFinancesElements = (data) => {
  const totalItems = data.length;
  const revenues = data
    .filter((item) => Number(item.value) > 0)
    .reduce((acc, item) => acc + Number(item.value), 0);
  const expenses = data
    .filter((item) => Number(item.value) < 0)
    .reduce((acc, item) => acc + Number(item.value), 0);
  const totalValue = revenues + expenses;

  //render total items
  const financesCard1 = document.getElementById("finance-card-1");
  const totalText = document.createTextNode(totalItems);
  const totalElement = document.createElement("h1");
  totalElement.appendChild(totalText);
  financesCard1.appendChild(totalElement);

  //render revenue
  const financesCard2 = document.getElementById("finance-card-2");
  const revenueText = document.createTextNode(
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
      revenues,
    ),
  );
  const revenueTextElement = document.createElement("h1");
  revenueTextElement.appendChild(revenueText);
  financesCard2.appendChild(revenueTextElement);

  //render expenses
  const financesCard3 = document.getElementById("finance-card-3");
  const expensesText = document.createTextNode(
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
      expenses,
    ),
  );
  const expensesTextElement = document.createElement("h1");
  expensesTextElement.appendChild(expensesText);
  financesCard3.appendChild(expensesTextElement);

  //render totatl
  const financesCard4 = document.getElementById("finance-card-4");
  const balanceText = document.createTextNode(
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
      totalValue,
    ),
  );
  const balanceTextElement = document.createElement("h1");
  balanceTextElement.appendChild(balanceText);
  balanceTextElement.style.color = "#5936CD";
  financesCard4.appendChild(balanceTextElement);
};

const onLoadFinancesData = async () => {
  try {
    const date = "2023-01-17";
    const email = localStorage.getItem("@walletapp:email");
    const result = await fetch(
      `https://walletappbackend-production.up.railway.app/finances?date=${date}`,
      {
        method: "GET",
        headers: {
          email,
        },
      },
    );
    const data = await result.json();
    renderFinancesElements(data);
    renderFinancesList(data);
    return data;
  } catch (error) {
    return { error };
  }
};

const onLoadUserInfo = () => {
  const email = localStorage.getItem("@walletapp:email");
  const name = localStorage.getItem("@walletapp:name");

  const navbarUserInfo = document.getElementById("navbar-user-container");
  const navbarUserAvatar = document.getElementById("navbar-user-avatar");

  //add user email
  const emailElement = document.createElement("p");
  const emailText = document.createTextNode(email);
  emailElement.appendChild(emailText);
  navbarUserInfo.appendChild(emailElement);

  //add logout link
  const logoutElement = document.createElement("a");
  const logoutText = document.createTextNode("sair");

  logoutElement.appendChild(logoutText);
  navbarUserInfo.appendChild(logoutElement);

  //add user first latter inside avatar
  const nameElement = document.createElement("h3");
  const nameText = document.createTextNode(name.charAt(0));

  nameElement.appendChild(nameText);
  navbarUserAvatar.appendChild(nameElement);
};

window.onload = () => {
  onLoadUserInfo();
  onLoadFinancesData();
};
