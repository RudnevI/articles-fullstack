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
      document.getElementsByName("title")[0].value = fetchedData.title;
      document.getElementsByName("content")[0].value = fetchedData.content;
      document.getElementsByName("categoryId")[0].value =
        fetchedData.category.id;
      document.getElementsByName("articleStatus")[0].value =
        fetchedData.article_status;
    });
};
getArticleButton.onclick = function () {
  getArticleById(document.getElementById("articleId").value);
};
