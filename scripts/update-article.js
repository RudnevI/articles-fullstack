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

const updateArticleById = async (id) => {
  await fetch(`${rootUrl}/articles/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: document.getElementsByName("title")[0].value,
      content: document.getElementsByName("content")[0].value,
      category: document.getElementsByName("categoryId")[0].value,
      article_status: document.getElementsByName("articleStatus")[0].value
    })
  })}


  const updateArticleButton = document.getElementById("updateArticleButton");

  updateArticleButton.onclick = function() {
    updateArticleById(document.getElementById("articleId").value)
  }


  
