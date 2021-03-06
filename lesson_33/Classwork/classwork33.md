#Class Work 
Для удобства тестирования REST API при выполнении задач этого урока используйте приложение для отправки HTTP запросов. 
Например, Postman(https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop?hl=en)

###Задача 1 
Создайте базовый сервер с помощью Restify. Реализуйте следующее: 
* При GET-запросе по пути '/test' на странице отображаются заголовки запроса.
* При POST-запросе по пути '/test' на странице отображается тело запроса. 

###Задача 2 
Дано массив users: 
```
users = [
{ name: 'Jane', age: 23 }, { name: 'John', age: 30 }, { name: 'Vasya', age: 25 },
{ name: 'Yvonne', age: 34 }, { name: 'Will', age: 18 }, {name: 'Jack', age: 26}
]
``` 
Реализуйте следующее: 
* При GET-запросе по пути '/users' в ответе сервера отправляется массив users в формате JSON. 
* При POST-запросе по пути '/users' в массив users добавляется элемент {name: 'random user', age: 30}.  

###Задача 3 
Модифицируйте код предыдущей задачи. Реализуйте следующее: 
* При PUT-запросе по пути '/users/index', где index - индекс элемента в массиве users, элемент по указанному индексу заменяется на следующий объект: {name: 'updated name', age: 'updated age'}. 
* При DELETE-запросе по пути '/users/index', где index - индекс элемента в массиве users, происходит удаление элемента с указанным индексом из массива. 