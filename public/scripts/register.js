document.querySelector("#register").addEventListener("click", async (event) => {
  event.preventDefault();

  const data = {
    email: document.querySelector("#email").value,
    password: document.querySelector("#password").value,
    photo: document.querySelector("#photo").value,
  };
  const opts = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  let response = await fetch("/api/sessions/register", opts);

  response = await response.json();

  if (response.statusCode === 201) {
    return location.replace("/pages/login.html");
  }
  return alert(response.message);
});
