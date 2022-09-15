const repoContainer = document.querySelector("#repo-container");

const user = "webvahvero";
const branch = "main";

const getRepos = async () => {
  try {
    const response = await fetch(`https://api.github.com/users/${user}/repos`);
    if (response.ok) {
      const repos = await response.json();
      let output = "";
      for (let i in repos) {
        let path = repos[i].name;
        output += `
           <div class="repo">
            ${await fetchText(path)}
           </div>
          `;
      }
      repoContainer.innerHTML = output;
    }
    throw new Error("Request Failed");
  } catch (error) {
    console.log(error);
  }
};

async function fetchText(repoName) {
  const url = `https://raw.githubusercontent.com/${user}/${repoName}/${branch}/README.md`;
  try {
    let response = await fetch(url);

    if (response.ok) {
      let data = await response.text();
      return parseMd(data);
    }
    throw new Error("Request failed");
  } catch (error) {
    console.log(error);
  }
}

function parseMd(md) {
  return DOMPurify.sanitize(marked.parse(md));
}

getRepos();
