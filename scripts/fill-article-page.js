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


const notificationServiceRootUrl = "http://127.0.0.1:8002";


let templateId;


const notifyOfDeletion = (template_id) => {
  fetch(`${notificationServiceRootUrl}/api/notifications/`, {
   method: "POST",
   headers: {
     'Accept': 'application/json',
     'Content-Type': 'application/json'
   },
   body: JSON.stringify({
     notification: {
       params: {
         PARAMS1: "abdulla123123123123"
       },
       sendMethodID_id: 2,
       templateID_id: template_id

     }
   })
 })
}

const createNotificationTemplate = () => {
   fetch(`${notificationServiceRootUrl}/api/templates`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
       template: {
        name: "Уведомление об удалении статьи",
        text: `Статья под названием ${fetchedData.title} была удалена`
       }
    })
  })
  .then(response => response.json())
  .then(data => {
    templateId = data.id;
    console.log(templateId);
    notifyOfDeletion(data.id)
    
  })
}







deleteArticleButton.onclick = () => {
  // let rawResponse = await fetch(
  //   `${rootUrl}/articles/${document.getElementById("articleId").value}`,
  //   {
  //     method: "DELETE",
  //   }
  // );
    createNotificationTemplate();
  
};


