const onCallRegister = async (email, name) => {
  try {
    const data = {
      email,
      name,
    };
    const response = await fetch(
      "https://walletappbackend-production.up.railway.app/users",
      {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
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

const onRegister = async () => {
  const email = document.getElementById("email").value;
  const name = document.getElementById("name").value;

  if (name.length < 3) {
    alert("Nome deve ter mais de 3 caracteres.");
  }
  if (email.length < 5 || !email.includes("@")) {
    alert("Nao permitido.");
    return;
  }

  const result = await onCallRegister(email, name);
  if (result.error) {
    alert("Falha ao cadastrar email.");
    return;
  }

  localStorage.setItem("@walletapp:email", result.email);
  localStorage.setItem("@walletapp:name", result.name);
  localStorage.setItem("@walletapp:userId", result.id);

  window.open("../home/home.html", "_selft");
};

window.onload = () => {
  const form = document.getElementById("register");
  form.onsubmit = (e) => {
    e.preventDefault();
    onRegister();
  };
};
