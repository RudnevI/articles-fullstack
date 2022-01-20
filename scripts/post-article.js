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
      category: document.getElementsByName("categoryId")[0].value,
      article_status: document.getElementsByName("articleStatus")[0].value,
    }),
  });
  console.log(rawResponse.json());
};

postArticleButton.onclick = postArticle;
