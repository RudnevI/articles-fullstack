# Документация микросервиса articleapp:
## Эндпоинты:
- /articles/ с запросом типа GET - получение полного списка статей, ожидает JSON
    - Для получения ответа требуется просто прописать адрес сервера с эндпоинтом в адресной строке
    - Пример ответа:
    
             [
                {
                    "title": "lorem ipsum",
                    "content": "dolor sit",
                    "category": {
                        "id": 1,
                        "name": "music",
                        "parent_id": null
                    },
                    "article_status": "PUBLIC"
                },
                {
                    "title": "lorem ipsum",
                    "content": "dolor sit",
                    "category": {
                        "id": 1,
                        "name": "music",
                        "parent_id": null
                    },
                    "article_status": "PUBLIC"
                },
                ...
            ] 
            Где title - заголовок статьи, content - ее непосредственное содержание,
            category - объект категории статьи, связанный с данным, article_status -
            статус статьи (HIDDEN означает, что статья защищена от непривилегированного доступа, 
            PUBLIC - что доступ к статье имеет любой клиент)
                
- /articles/ с запросом типа POST - создание новой статьи
    - Запрос ожидает JSON со следующими параметрами:
        - title - заголовок статьи,
        - content - содержимое статьи,
        - category - id категории, связанной с данной статьей
        - article_status - статус статьи(HIDDEN или PUBLIC, по умолчанию - PUBLIC)
    - Пример запроса:
    
            {
            "title":"lorem ipsum",
            "content":"dolor sit",
            "category": 1,
            "article_status":"PUBLIC"
            }
    - В качестве ответа сервер присылает JSON созданного объекта со статусом 201; пример:
    
            {
            "title": "lorem ipsum",
            "content": "dolor sit",
            "category": {
                "id": 1,
                "name": "music",
                "parent_id": null
            },
            "article_status": "PUBLIC"
            }

- /articles/id/ с запросом типа GET - получение статьи по id
    - Запрос ожидает параметр типа integer.
    - Для получения ответа требуется просто прописать адрес сервера с эндпоинтом и id в адресной строке
    - Пример ответа:
    
                {
                "title": "lorem ipsum",
                "content": "dolor sit",
                "category": {
                    "id": 1,
                    "name": "music",
                    "parent_id": null
                },
                "article_status": "PUBLIC"
                }
- /articles/id/ с запросом типа PUT - изменение статьи по id
- /articles/id/ с запросом типа DELETE - удаление статьи по id
## Взаимодействия с другими моделями аналогично, поэтому будет целесообразным просто описать их структуру:
- category:
        - {
            parent_id,
            name
           }
