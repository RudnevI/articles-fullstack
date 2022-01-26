const getArticleButton = document.getElementById("getArticleButton");

const rootUrl = "http://127.0.0.1:8001";

let fetchedData;

const errorContainer = document.getElementsByClassName("error-container")[0];

let errorText;
let tags;
const getArticleTags = () => {
  fetch(`${rootUrl}/tags/`)
    .then((response) => response.json())
    .then((data) => {
      tags = Array.from(data).filter(
        (el) => el.id === document.querySelector("#articleId").value
      );
    });
};
const getArticleById = (id) => {
  fetch(`${rootUrl}/articles/${id}`)
    .then((response) => {
      if (!response.ok) {
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
    })
    .catch((errorText) => {
      errorContainer.innerHTML = errorText;
    });
};

const fillErrorContainer = (err) => {};

let commentIds = [];

getArticleButton.onclick = function () {
  getArticleById(document.getElementById("articleId").value);
  fetch(
    `${rootUrl}/articles/${
      document.getElementsByName("articleId")[0].value
    }/comments`
  )
    .then((response) => response.json())
    .then((data) => {
      let commentSection = document.querySelector(".comment-section");
      data.forEach((element) => {
        let commentDiv = document.createElement("div");
        commentDiv.innerHTML = element.content;
        commentDiv.classList.add("comment");
        commentSection.appendChild(commentDiv);
        let deletionButton = document.createElement("button");
        deletionButton.style.backgroundColor = "red";
        deletionButton.style.color = "white";
        deletionButton.innerHTML = "Удалить комментарий";
        deletionButton.setAttribute("name", "deleteCommentButton");
        deletionButton.id = element.id;
        console.log(element.id);
        deletionButton.addEventListener("click", function () {
          fetch(`${rootUrl}/comments/${this.id}`, { method: "DELETE" }).then(
            (response) => {
              if (response.ok) {
                this.innerHTML = "удален";
                this.style.backgroundColor = "#d5d5d5";
              }
            }
          );
        });
        commentSection.appendChild(deletionButton);
      });
    });
};

console.log(commentIds);

const deleteArticleButton = document.getElementById("deleteArticleButton");

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

const createNotificationTemplate = () => {
  fetch(`${notificationServiceRootUrl}/api/templates`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      template: {
        name: "Уведомление об удалении статьи",
        text: `Статья под названием ${fetchedData.title} была удалена`,
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

deleteArticleButton.onclick = () => {
  // let rawResponse = await fetch(
  //   `${rootUrl}/articles/${document.getElementById("articleId").value}`,
  //   {
  //     method: "DELETE",
  //   }
  // );
  createNotificationTemplate();
};

document.querySelector(".send-comment-button").addEventListener("click", () => {
  fetch(`${rootUrl}/articles/comments/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: document.querySelector(".comment-field").value,
      article: document.querySelector("#articleId").value,
      user_name: document.querySelector("#userName").value,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
});
