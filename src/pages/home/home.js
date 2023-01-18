const onDeleteItem = async (id) => {
  try {
    const email = localStorage.getItem("@walletapp:email");
    await fetch(`https://walletappbackend-production.up.railway.app/finances/${id}`, {
      method: "DELETE",
      headers: {
        email,
      },
    });
    onLoadFinancesData();
  } catch (error) {
    alert("Error ao deletar item.");
  }
};

const renderFinancesList = (data) => {
  const table = document.getElementById("finances-table");
  table.innerHTML = "";

  const tableHeader = document.createElement("tr");

  const titleText = document.createTextNode("Titulo");
  const titleElement = document.createElement("th");
  titleElement.appendChild(titleText);
  tableHeader.appendChild(titleElement);

  const categoryText = document.createTextNode("Categoria");
  const categoryElement = document.createElement("th");
  categoryElement.appendChild(categoryText);
  tableHeader.appendChild(categoryElement);

  const dateText = document.createTextNode("Data");
  const dateElement = document.createElement("th");
  dateElement.appendChild(dateText);
  tableHeader.appendChild(dateElement);

  const valueText = document.createTextNode("Valor");
  const valueElement = document.createElement("th");
  valueElement.className = "center";
  valueElement.appendChild(valueText);
  tableHeader.appendChild(valueElement);

  const actionText = document.createTextNode("Ação");
  const actionElement = document.createElement("th");
  actionElement.className = "right";
  actionElement.appendChild(actionText);
  tableHeader.appendChild(actionElement);

  table.appendChild(tableHeader);

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
    deleteTd.onclick = () => onDeleteItem(item.id);
    const deleteText = document.createTextNode("Deletar");
    deleteTd.style.cursor = "pointer";
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
  financesCard1.innerHTML = "";

  const totalSubtext = document.createTextNode("Total de lançamentos");
  const totalSubtextElement = document.createElement("h3");
  totalSubtextElement.appendChild(totalSubtext);
  financesCard1.appendChild(totalSubtextElement);

  const totalText = document.createTextNode(totalItems);
  const totalElement = document.createElement("h1");
  totalElement.id = "total-element";
  totalElement.appendChild(totalText);
  financesCard1.appendChild(totalElement);

  //render revenue
  const financesCard2 = document.getElementById("finance-card-2");
  financesCard2.innerHTML = "";

  const revenueSubtext = document.createTextNode("Receitas");
  const revenueSubtextElement = document.createElement("h3");
  revenueSubtextElement.appendChild(revenueSubtext);
  financesCard2.appendChild(revenueSubtextElement);

  const revenueText = document.createTextNode(
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
      revenues,
    ),
  );
  const revenueTextElement = document.createElement("h1");
  revenueTextElement.id = "revenue-element";
  revenueTextElement.appendChild(revenueText);
  financesCard2.appendChild(revenueTextElement);

  //render expenses
  const financesCard3 = document.getElementById("finance-card-3");
  financesCard3.innerHTML = "";

  const expansesSubtext = document.createTextNode("Despesas");
  const expansesSubtextElement = document.createElement("h3");
  expansesSubtextElement.appendChild(expansesSubtext);
  financesCard3.appendChild(expansesSubtextElement);

  const expensesText = document.createTextNode(
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
      expenses,
    ),
  );
  const expensesTextElement = document.createElement("h1");
  expensesTextElement.id = "expenses-text";
  expensesTextElement.appendChild(expensesText);
  financesCard3.appendChild(expensesTextElement);

  //render totatl
  const financesCard4 = document.getElementById("finance-card-4");
  financesCard4.innerHTML = "";
  const balanceSubtext = document.createTextNode("Balanço");
  const balanceSubtextElement = document.createElement("h3");
  balanceSubtextElement.appendChild(balanceSubtext);
  financesCard4.appendChild(balanceSubtextElement);

  const balanceText = document.createTextNode(
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
      totalValue,
    ),
  );
  const balanceTextElement = document.createElement("h1");
  balanceTextElement.id = "balance-element";
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

const onLoadCategories = async () => {
  try {
    const categoriesSelector = document.getElementById("categoria");
    const response = await fetch(
      "https://walletappbackend-production.up.railway.app/categories",
    );
    const categoriesResult = await response.json();
    categoriesResult.map((category) => {
      const option = document.createElement("option");
      const categorieText = document.createTextNode(category.name);
      option.appendChild(categorieText);
      option.value = category.id;
      option.id = `category_${category.id}`;
      categoriesSelector.appendChild(option);
    });
  } catch (error) {
    alert("Erro ao carregas as categorias");
  }
};

const openModal = () => {
  const modal = document.getElementById("modal");
  modal.style.display = "flex";
};

const openCloseModal = () => {
  const modal = document.getElementById("modal");
  modal.style.display = "none";
};

const onCallAddFinance = async (data) => {
  try {
    const email = localStorage.getItem("@walletapp:email");

    const response = await fetch(
      "https://walletappbackend-production.up.railway.app/finances",
      {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          email: email,
        },
        body: JSON.stringify(data),
      },
    );
    const user = await response.json();
    return user;
  } catch (error) {
    return { error };
  }
};

const onCreateFinanceRealease = async (target) => {
  try {
    const title = target[0].value;
    const value = Number(target[1].value);
    const date = target[2].value;
    const category_id = Number(target[3].value);
    const result = await onCallAddFinance({
      title,
      value,
      date,
      category_id,
    });
    if (result.error) {
      alert("Erro ao adcionar novo dado financeiro");
      return;
    }
    openCloseModal();
    onLoadFinancesData();
  } catch (error) {
    alert("Erro ao adcionar novo dado financeiro");
  }
};

window.onload = () => {
  onLoadUserInfo();
  onLoadFinancesData();
  onLoadCategories();

  const form = document.getElementById("form-finance-release");
  form.onsubmit = (event) => {
    event.preventDefault();

    onCreateFinanceRealease(event.target);
  };
};
