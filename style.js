function getUser() {
  const userData = document.getElementById("user-data");
  let username = prompt("Write username here...");
  if (!username) {
    userData.innerHTML = `<p>User not found</p>`;
    return;
  }
  fetch(`https://api.github.com/users/${username}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("User not found");
      }
      return response.json();
    })
    .then((user) => {
      userData.innerHTML = `
        <div>
          <img src="${user.avatar_url}" alt="Avatar" width="150" height="150">
          <h2>${user.name || "No Name"}</h2>
          <p>${user.bio || "No bio available"}</p>
          <p><strong>Public Repositories:</strong> ${user.public_repos}</p>
          <p><strong>Followers:</strong> ${user.followers}</p>
        </div>
      `;
    })
    .catch((error) => {
      userData.innerHTML = `<p>Error: ${error.message}</p>`;
    });
}

document.getElementById("fetch-user-btn").addEventListener("click", getUser);
