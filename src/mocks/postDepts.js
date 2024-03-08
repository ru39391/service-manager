/**
* Имитация API для тестирования
* @returns {Object} - объект данных
*/
const postDepts = () => {
  // 2/2
  return new Promise((resolve, reject) => {
      setTimeout(() => {
          resolve({
            "success": true,
            "data": {
              "0": {
                "id": 9,
                "item_id": 1,
                "name": "Стоматология",
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "1": {
                "id": 10,
                "item_id": 4,
                "name": "Медицина",
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "success": true
            },
            "meta": {
              "total_time": "0.1308 s",
              "query_time": "0.0008 s",
              "php_time": "0.1300 s",
              "queries": 5,
              "source": "cache",
              "memory": "2 048 KB"
            }
          });
          //reject('Поля формы заполнены неверно');
      }, 1000);
  });
}

export default postDepts;
