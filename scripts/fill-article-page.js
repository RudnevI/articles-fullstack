const getArticleButton = document.getElementById("getArticleButton");

const rootUrl = "http://127.0.0.1:8001";

let fetchedData;


const errorContainer = document.getElementsByClassName('error-container')[0];

let errorText;


const getArticleById = (id) => {
  fetch(`${rootUrl}/articles/${id}`)
    .then((response) => {
      if(!response.ok) {
        errorText = response.json().messsage;
    }
      return response.json();
      
    })
    .then((data) => {
      fetchedData = data;
      console.log(fetchedData);
      document.getElementsByClassName("title")[0].innerHTML = fetchedData.title;
      document.getElementsByClassName("content")[0].innerHTML =
        fetchedData.content;
    }).catch(errorText => {
        errorContainer.innerHTML = errorText;
    });
};

const fillErrorContainer = (err) => {

}


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
