const rootUrl = "http://127.0.0.1:8001";

const getAllTags = () => {
  let tagSelect = document.querySelector("#tags");
  fetch(`${rootUrl}/tags/`)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((element) => {
        let option = document.createElement("option");
        option.value = element.id;
        option.innerHTML = element.tag_name;
        tagSelect.appendChild(option);
      });
    });
};

getAllTags();

const notificationServiceRootUrl = "http://127.0.0.1:8002";

let templateId;

const notifyOfCreation = (template_id) => {
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

const createNotificationTemplate = (title) => {
  fetch(`${notificationServiceRootUrl}/api/templates`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      template: {
        name: "Уведомление о создании статьи",
        text: `Новая статья: ${title}\n${getSelectedTagsNames()}`,
      },
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      templateId = data.id;
      console.log(templateId);
      notifyOfCreation(templateId);
    });
};

const getSelectedTags = () => {
  return Array.from(document.querySelector("#tags").children).filter(
    (child) => child.selected
  );
};

const getSelectedTagsNames = () => {
  return getSelectedTags()
    .map((tag) => `#${tag.innerHTML}`)
    .join(" ");
};

const postArticleButton = document.getElementById("postArticleButton");
const postArticle = async () => {
  let id;
  await fetch(`${rootUrl}/articles/`, {
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
  })
    .then((response) => {
      if (response.ok) {
        createNotificationTemplate(
          document.getElementsByName("title")[0].value
        );
      }
      return response.json();
    })

    .then((data) => {
      id = data.id;
    });

  getSelectedTags().forEach((child) => {
    console.log({
      tag_name: child.innerHTML,
      article_id: [
        {
          title: document.getElementsByName("title")[0].value,
        },
      ],
    });
    fetch(`${rootUrl}/tags/${child.value}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tag_name: child.innerHTML,
        article_id: [id],
      }),
    });
  });
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
