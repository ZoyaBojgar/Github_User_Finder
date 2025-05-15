let usernameinp = document.querySelector(".searchplace");
let searchBtn = document.querySelector(".searchBtn");
let card = document.querySelector(".card");

function getProfileData(username) {
    return fetch(`https://api.github.com/users/${username}`)
        .then((raw) => {
            if (!raw.ok) throw new Error("User not found");
            return raw.json();
        });
}

function getRepos(username) {
    return fetch(`https://api.github.com/users/${username}/repos`)
        .then((raw) => {
            if (!raw.ok) throw new Error("Failed to fetch repos.");
            return raw.json();
        });
}

function decorateProfileData(details) {
    let data = `
        <div class="avatar">
            <img src="${details.avatar_url}" alt="Profile pic">
        </div>
        <div class="info">
            <p><h5 style="font-size: 1.2rem;">${details.name || "No Name"}</h5></p>
            <p>${details.login}</p>
            <p>${details.bio ? details.bio : "Sorry, there is no bio"}</p>
            <p>
                <pre><b>Public Repos:</b> ${details.public_repos}   <b>Followers:</b> ${details.followers}   <br><b>Following:</b> ${details.following}   <b>Location:</b> ${details.location || "N/A"}</pre>
            </p>
            <p>
                <pre><b>Company:</b> ${details.company || "N/A"}   <br><b>Blog:</b> <a style="color: blue;" href="${details.blog || '#'}" target="_blank">${details.blog || "N/A"}</a></pre>
            </p>
        </div>`;
    card.innerHTML = data;
}

searchBtn.addEventListener("click", function () {
    let username = usernameinp.value.trim();

    if (username.length === 0) {
        // alert("Please enter a GitHub username");
        card.innerHTML = "Please enter a GitHub username";
        return;
    }

    card.innerHTML = "Loading...";

    getProfileData(username)
        .then((data) => {
            decorateProfileData(data);
        })
        .catch((err) => {
            card.innerHTML = `<p style="color: red; text-align: center;">Please Enter a valid Username..</p>`;
        });
});


