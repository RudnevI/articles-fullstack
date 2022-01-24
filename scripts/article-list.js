const rootUrl = "http://127.0.0.1:8001";

let fetchedData;

const getArticles = async () => {
  await fetch(`${rootUrl}/articles/`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      fetchedData = data;
      console.log(fetchedData);
      fetchedData.forEach((element) => {
        let listElement = document.createElement("div");
        listElement.classList.add("list-element");

        let idDiv = document.createElement("div");
        let titleDiv = document.createElement("div");
        let contentDiv = document.createElement("div");
        let categoryIdDiv = document.createElement("div");
        let articleStatusDiv = document.createElement("div");

        idDiv.innerHTML = element.id;
        titleDiv.innerHTML = element.title;
        contentDiv.innerHTML = element.content;
        categoryIdDiv.innerHTML = element.category.name;
        articleStatusDiv.innerHTML = element.article_status;

        [
          idDiv,
          titleDiv,
          contentDiv,
          categoryIdDiv,
          articleStatusDiv,
        ].forEach((div) => listElement.appendChild(div));
        document
          .getElementsByClassName("main-container")[0]
          .appendChild(listElement);
      });
    });
};

getArticles();
