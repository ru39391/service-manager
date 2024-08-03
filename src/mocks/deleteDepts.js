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
              "success": true,
              "counter": {
                  "succeed": 1,
                  "failed": 0,
                  "valid": 1,
                  "inValid": 1,
                  "total": 2
              },
              "succeed": [
                  {
                      "item_id": 1234567890,
                      "price": 900,
                      "index": 12,
                      "dept": 4,
                      "subdept": 10007937,
                      "group": 10640,
                      "isComplex": 0,
                      "complex": "[]",
                      "isComplexItem": 1,
                      "isVisible": 1,
                      "isValid": true,
                      "updatedon": "2024-08-03 14:01:27"
                  }
              ],
              "failed": [],
              "inValid": {
                  "1": {
                      "item_id": "олег",
                      "name": "медицинская услуга 2",
                      "price": 1900,
                      "index": 123,
                      "dept": 4,
                      "subdept": 10007937,
                      "group": 10640,
                      "isComplex": 0,
                      "complex": "[]",
                      "isComplexItem": 1,
                      "isVisible": 1,
                      "isValid": false,
                      "updatedon": null
                  }
              }
            },
            /*
            "data": {
              "0": {
                  "item_id": 1,
                  "name": "Стоматология",
                  "updatedon": null
                  //"updatedon": "2024-03-31 23:17:21"
              },
              "1": {
                  "item_id": 4,
                  "name": "Медицина",
                  //"updatedon": null
                  "updatedon": "2024-03-31 23:17:21"
              },
              "success": true
            },
            */
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
