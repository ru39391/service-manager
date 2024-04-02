/**
* Имитация API для тестирования
* @returns {Object} - объект данных
*/
const deleteDepts = () => {
  return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
            //"success": false,
            "success": true,
            //"errors": [],
            "data": {
              "0": {
                  "item_id": 1,
                  "name": "Медицина",
                  "updatedon": null
                  //"updatedon": "2024-03-31 23:17:21"
              },
              "1": {
                  "item_id": 4,
                  "name": "Гомеопатия",
                  //"updatedon": null
                  "updatedon": "2024-03-31 23:17:21"
              },
              "success": true
            },
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

export default deleteDepts;
