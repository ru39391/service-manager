/**
* Имитация API для тестирования
* @returns {Object} - объект данных
*/
const fetchData = () => {
  // 2/2
  return new Promise((resolve, reject) => {
      setTimeout(() => {
          resolve([
            {
              "data": {
                "success": true,
                "data": [
                  {
                    "id": 10,
                    "item_id": 4,
                    "name": "Медицина",
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  {
                    "id": 9,
                    "item_id": 1,
                    "name": "Стоматология",
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": "2024-03-31 23:13:30"
                  },
                  {
                    "id": 13,
                    "item_id": 5,
                    "name": "Гомеопатия",
                    "createdon": "2024-04-01 22:21:26",
                    "updatedon": null
                  }
                ],
                "meta": {
                  "total_time": "0.0641 s",
                  "query_time": "0.0003 s",
                  "php_time": "0.0638 s",
                  "queries": 2,
                  "source": "cache",
                  "memory": "2 048 KB"
                }
              },
              "status": 200,
              "statusText": "OK",
              "headers": {
                "cache-control": "no-store, no-cache, must-revalidate",
                "content-length": "598",
                "content-type": "application/json; charset=UTF-8",
                "expires": "Thu, 19 Nov 1981 08:52:00 GMT",
                "pragma": "no-cache"
              },
              "config": {
                "transitional": {
                  "silentJSONParsing": true,
                  "forcedJSONParsing": true,
                  "clarifyTimeoutError": false
                },
                "adapter": [
                  "xhr",
                  "http"
                ],
                "transformRequest": [
                  null
                ],
                "transformResponse": [
                  null
                ],
                "timeout": 0,
                "xsrfCookieName": "XSRF-TOKEN",
                "xsrfHeaderName": "X-XSRF-TOKEN",
                "maxContentLength": -1,
                "maxBodyLength": -1,
                "env": {},
                "headers": {
                  "Accept": "application/json, text/plain, */*",
                  "Content-Type": null
                },
                "method": "get",
                "url": "http://localhost:5173/api/depts"
              },
              "request": {}
            },
            {
              "data": {
                "success": true,
                "data": [
                  {
                    "id": 68,
                    "item_id": 10006357,
                    "name": "Кардиология",
                    "dept": 4,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  {
                    "id": 69,
                    "item_id": 10019707,
                    "name": "Детский массаж",
                    "dept": 4,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  {
                    "id": 67,
                    "item_id": 10019704,
                    "name": "Дерматовенерология",
                    "dept": 4,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  {
                    "id": 66,
                    "item_id": 10009840,
                    "name": "Гинекология",
                    "dept": 4,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  {
                    "id": 65,
                    "item_id": 10019705,
                    "name": "Гастроэнтерология",
                    "dept": 4,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  {
                    "id": 64,
                    "item_id": 10013059,
                    "name": "Аллергология-иммунология",
                    "dept": 4,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  {
                    "id": 63,
                    "item_id": 10038191,
                    "name": "Лабораторная диагностика INVITRO",
                    "dept": 4,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  {
                    "id": 62,
                    "item_id": 10008375,
                    "name": "Лаборатррная диагностика CMD - программы",
                    "dept": 4,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  {
                    "id": 60,
                    "item_id": 10019731,
                    "name": "ЭКГ",
                    "dept": 4,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  {
                    "id": 61,
                    "item_id": 10008373,
                    "name": "Лабораторная диагностика CMD",
                    "dept": 4,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  {
                    "id": 59,
                    "item_id": 10019730,
                    "name": "Холтер",
                    "dept": 4,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  {
                    "id": 58,
                    "item_id": 10006356,
                    "name": "УЗИ",
                    "dept": 4,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  {
                    "id": 57,
                    "item_id": 10019745,
                    "name": "Продажа: гигиенические наборы",
                    "dept": 1,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  {
                    "id": 56,
                    "item_id": 10017692,
                    "name": "Услуги зуботехнической лаборатории для внешних стоматологий",
                    "dept": 1,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  {
                    "id": 55,
                    "item_id": 10000342,
                    "name": "Услуги на литье в зуботехнической лаборатории",
                    "dept": 1,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  {
                    "id": 54,
                    "item_id": 10001722,
                    "name": "Стоматология ортопедическая",
                    "dept": 1,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  {
                    "id": 53,
                    "item_id": 21,
                    "name": "Стоматология ортодонтическая",
                    "dept": 1,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  {
                    "id": 52,
                    "item_id": 17,
                    "name": "Стоматология детская",
                    "dept": 1,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  {
                    "id": 51,
                    "item_id": 10003550,
                    "name": "Имплантология стоматологическая",
                    "dept": 1,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  {
                    "id": 50,
                    "item_id": 10001721,
                    "name": "Стоматология хирургическая",
                    "dept": 1,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  {
                    "id": 49,
                    "item_id": 10019703,
                    "name": "Стоматология с использованием оптики",
                    "dept": 1,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  {
                    "id": 48,
                    "item_id": 10019720,
                    "name": "Стоматология эстетическая и профгигиена",
                    "dept": 1,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  {
                    "id": 47,
                    "item_id": 10018259,
                    "name": "Пародонтология стоматологическая",
                    "dept": 1,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  {
                    "id": 46,
                    "item_id": 10001720,
                    "name": "Стоматология терапевтическая",
                    "dept": 1,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  {
                    "id": 45,
                    "item_id": 14,
                    "name": "Стоматологическое обезболивание",
                    "dept": 1,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  {
                    "id": 44,
                    "item_id": 12,
                    "name": "Стоматологические диагностические исследования",
                    "dept": 1,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  {
                    "id": 43,
                    "item_id": 10001723,
                    "name": "Стоматологические общие манипуляции",
                    "dept": 1,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  {
                    "id": 70,
                    "item_id": 30,
                    "name": "Массаж",
                    "dept": 4,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  {
                    "id": 71,
                    "item_id": 10007705,
                    "name": "Неврология",
                    "dept": 4,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  {
                    "id": 72,
                    "item_id": 10007937,
                    "name": "Остеопатия",
                    "dept": 4,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  {
                    "id": 73,
                    "item_id": 10004645,
                    "name": "Отоларингология",
                    "dept": 4,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  {
                    "id": 74,
                    "item_id": 10052528,
                    "name": "Офтальмология",
                    "dept": 4,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  {
                    "id": 75,
                    "item_id": 10018260,
                    "name": "Терапия клиническая",
                    "dept": 4,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  {
                    "id": 76,
                    "item_id": 10019706,
                    "name": "Рефлексотерапия",
                    "dept": 4,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  {
                    "id": 77,
                    "item_id": 10008174,
                    "name": "Косметология",
                    "dept": 4,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  {
                    "id": 78,
                    "item_id": 10008332,
                    "name": "Педиатрия",
                    "dept": 4,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  {
                    "id": 79,
                    "item_id": 10018268,
                    "name": "Психология",
                    "dept": 4,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  {
                    "id": 80,
                    "item_id": 10021862,
                    "name": "Логопедия",
                    "dept": 4,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  {
                    "id": 81,
                    "item_id": 10052529,
                    "name": "Урология",
                    "dept": 4,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  {
                    "id": 82,
                    "item_id": 10052530,
                    "name": "Хирургия клиническая",
                    "dept": 4,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  {
                    "id": 83,
                    "item_id": 10007938,
                    "name": "Эндокринология",
                    "dept": 4,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  },
                  {
                    "id": 84,
                    "item_id": 10001806,
                    "name": "Удаленные",
                    "dept": 4,
                    "createdon": "2024-03-09 01:30:45",
                    "updatedon": null
                  }
                ],
                "meta": {
                  "total_time": "0.0657 s",
                  "query_time": "0.0004 s",
                  "php_time": "0.0653 s",
                  "queries": 2,
                  "source": "cache",
                  "memory": "2 048 KB"
                }
              },
              "status": 200,
              "statusText": "OK",
              "headers": {
                "cache-control": "no-store, no-cache, must-revalidate",
                "content-type": "application/json; charset=UTF-8",
                "expires": "Thu, 19 Nov 1981 08:52:00 GMT",
                "pragma": "no-cache"
              },
              "config": {
                "transitional": {
                  "silentJSONParsing": true,
                  "forcedJSONParsing": true,
                  "clarifyTimeoutError": false
                },
                "adapter": [
                  "xhr",
                  "http"
                ],
                "transformRequest": [
                  null
                ],
                "transformResponse": [
                  null
                ],
                "timeout": 0,
                "xsrfCookieName": "XSRF-TOKEN",
                "xsrfHeaderName": "X-XSRF-TOKEN",
                "maxContentLength": -1,
                "maxBodyLength": -1,
                "env": {},
                "headers": {
                  "Accept": "application/json, text/plain, */*",
                  "Content-Type": null
                },
                "method": "get",
                "url": "http://localhost:5173/api/subdepts"
              },
              "request": {}
            },
          ]);
          //reject('Поля формы заполнены неверно');
      }, 1000);
  });
}

export default fetchData;
