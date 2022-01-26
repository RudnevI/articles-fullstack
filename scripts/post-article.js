const rootUrl = "http://127.0.0.1:8001";

const postArticleButton = document.getElementById("postArticleButton");
const postArticle = async () => {
  let rawResponse = await fetch(`${rootUrl}/articles/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: document.getElementsByName("title")[0].value,
      content: document.getElementsByName("content")[0].value,
      category: document.getElementsByName("category")[0].value,
      article_status: document.getElementsByName("articleStatus")[0].value,
    }),
  });
  console.log(rawResponse.json());
};

postArticleButton.onclick = postArticle;

let fetchedCategories;
const getAllCategories = async () => {
  await fetch(`${rootUrl}/categories/`)
    .then((response) => response.json())
    .then((data) => {
      fetchedCategories = data;
      console.log(data);
    });
};

const categoryDropdown = document.getElementsByName("category")[0];

const fillCategoryDropdown = async () => {
  await getAllCategories();
  fetchedCategories.forEach((category) => {
    let option = document.createElement("option");
    option.value = category.id;
    option.innerHTML = category.name;
    categoryDropdown.appendChild(option);
  });
};

fillCategoryDropdown();

document.querySelector("#addTagButton").addEventListener("click", () => {
  let tagFieldToInsert = document.createElement("input");
  tagFieldToInsert.setAttribute("type", "text");
  tagFieldToInsert.setAttribute("name", "articleTag");

  document
    .getElementsByName("articleTag")
    [document.getElementsByName("articleTag").length - 1].insertAdjacentElement(
      "afterend",
      tagFieldToInsert
    );
});
