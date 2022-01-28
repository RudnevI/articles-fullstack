const rootUrl = "http://127.0.0.1:8001";

let fetchedData;
const deleteIconHtml = `<i class="fa fa-trash" aria-hidden="true"></i>`;
const editIconHtml = `<i class="fa fa-pencil-square-o" aria-hidden="true"></i>
    `;
const notificationServiceRootUrl = "http://127.0.0.1:8002";

let templateId;

const notifyOfDeletion = (template_id) => {
  fetch(`${notificationServiceRootUrl}/api/notifications/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      notification: {
        params: {
          PARAMS1: "abdulla123123123123",
        },
        sendMethodID_id: 2,
        templateID_id: template_id,
      },
    }),
  });
};

const getTagsByArticleId = (articleId) => {
  let tags;
  fetch(`${rootUrl}/tags/`)
    .then((response) => response.json())
    .then((data) => {
      tags = Array.from(data)
        .filter((tag) => tag.article_id.includes(articleId))
        .map((tag) => `#${tag.tag_name}`)
        .join(" ");
    });
  return tags;
};

let tagArticleMap = new Map();

const createNotificationTemplate = async (articleId, title) => {
  await fetch(`${notificationServiceRootUrl}/api/templates`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      template: {
        name: "Уведомление об удалении статьи",
        text: `Статья под названием ${title} была удалена`,
      },
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      templateId = data.id;
      console.log(templateId);
      notifyOfDeletion(data.id);
    });
};
const getArticles = async () => {
  await fetch(`${rootUrl}/articles/`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      fetchedData = data;
      console.log(fetchedData);
      fetchedData.forEach((element) => {
        let tdButtons = document.createElement("td");

        let deleteButton = document.createElement("button");
        deleteButton.classList.add("btn", "btn-danger");
        deleteButton.innerHTML = deleteIconHtml;

        let editButton = document.createElement("button");
        editButton.classList.add("btn", "btn-success");
        editButton.innerHTML = editIconHtml;

        [editButton, deleteButton].forEach((btn) => tdButtons.appendChild(btn));

        editButton.id = element.id;
        deleteButton.id = element.id;

        editButton.style.marginRight = "1vw";

        let associatedTags = getTagsByArticleId(element.id);
        tagArticleMap.set(element.id, associatedTags);

        editButton.addEventListener("click", function () {
          location.replace(`./update-article.html?id=${this.id}`);
        });
        deleteButton.name = element.title;
        deleteButton.addEventListener("click", function () {
          fetch(`${rootUrl}/articles/${this.id}`, {
            method: "DELETE",
          }).then((response) => {
            if (response.ok) {
              this.parentElement.parentElement.remove();
            }
          });
          createNotificationTemplate(this.id, this.name);
        });

        let tr = document.createElement("tr");

        let idDiv = document.createElement("td");

        let articleLink = document.createElement("a");
        articleLink.href = `./article.html?id=${element.id}`;
        articleLink.innerText = element.title;

        let titleDiv = document.createElement("td");
        let contentDiv = document.createElement("td");
        let categoryIdDiv = document.createElement("td");
        let articleStatusDiv = document.createElement("td");

        idDiv.innerHTML = element.id;
        titleDiv.appendChild(articleLink);
        contentDiv.innerHTML = element.content.split(" ").slice(0, 5);
        categoryIdDiv.innerHTML = element.category.name;
        articleStatusDiv.innerHTML = element.article_status;

        [
          idDiv,
          titleDiv,
          contentDiv,
          categoryIdDiv,
          articleStatusDiv,
          tdButtons,
        ].forEach((div) => tr.appendChild(div));
        document.querySelector("tbody").appendChild(tr);
      });
    });
};

getArticles();
console.log(tagArticleMap);
