const validateUser = async (email) => {
  try {
    const result = await fetch(
      `https://walletappbackend-production.up.railway.app/users?email=${email}`,
    );
    const user = await result.json();
    return user;
  } catch (err) {
    return { err };
  }
};

const onClickLogin = async () => {
  const email = document.getElementById("email").value;
  if (email.length < 5 || !email.includes("@")) {
    alert("Nao permitido.");
    return;
  }

  const result = await validateUser(email);
  if (result.err) {
    alert("Falha ao validar email.");
    return;
  }

  localStorage.setItem("@walletapp:email", result.email);
  localStorage.setItem("@walletapp:name", result.name);
  localStorage.setItem("@walletapp:userId", result.id);

  window.open("./src/pages/home/home.html", "_selft");
};
