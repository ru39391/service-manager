/**
* Имитация API для тестирования
* @returns {Object} - объект данных
*/
const getDepts = () => {
  return new Promise((resolve, reject) => {
      setTimeout(() => {
          resolve({
            "success": true,
            "data": [
              {
                "id": 10,
                "item_id": 4,
                "name": "Медицина",
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null,
              },
              {
                "id": 9,
                "item_id": 1,
                "name": "Стоматология",
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null,
              }
            ],
            "meta": {
              "total_time": "0.1334 s",
              "query_time": "0.0030 s",
              "php_time": "0.1304 s",
              "queries": 6,
              "source": "cache",
              "memory": "2 048 KB"
            }
          });
          //reject('Поля формы заполнены неверно');
      }, 1000);
  });
}

export default getDepts;
