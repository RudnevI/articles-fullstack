const getArticleButton = document.getElementById("getArticleButton");

const rootUrl = "http://127.0.0.1:8001";

let fetchedData;

const getArticleById = (id) => {
  fetch(`${rootUrl}/articles/${id}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      fetchedData = data;
      console.log(fetchedData);
      document.getElementsByClassName("title")[0].innerHTML = fetchedData.title;
      document.getElementsByClassName("content")[0].innerHTML =
        fetchedData.content;
    });
};

getArticleButton.onclick = function () {
  getArticleById(document.getElementById("articleId").value);
};

const deleteArticleButton = document.getElementById("deleteArticleButton");

deleteArticleButton.onclick = () => {
  let rawResponse = fetch(
    `${rootUrl}/articles/${document.getElementById("articleId").value}`,
    {
      method: "DELETE",
    }
  );

  console.log(rawResponse);
};
