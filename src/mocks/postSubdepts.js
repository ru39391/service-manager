/**
* Имитация API для тестирования
* @returns {Object} - объект данных
*/
const postSubdepts = () => {
  // 42/42
  return new Promise((resolve, reject) => {
      setTimeout(() => {
          resolve({
            "success": true,
            "data": {
              "0": {
                "id": 43,
                "item_id": 10001723,
                "name": "Стоматологические общие манипуляции",
                "dept": 1,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "1": {
                "id": 44,
                "item_id": 12,
                "name": "Стоматологические диагностические исследования",
                "dept": 1,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "2": {
                "id": 45,
                "item_id": 14,
                "name": "Стоматологическое обезболивание",
                "dept": 1,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "3": {
                "id": 46,
                "item_id": 10001720,
                "name": "Стоматология терапевтическая",
                "dept": 1,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "4": {
                "id": 47,
                "item_id": 10018259,
                "name": "Пародонтология стоматологическая",
                "dept": 1,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "5": {
                "id": 48,
                "item_id": 10019720,
                "name": "Стоматология эстетическая и профгигиена",
                "dept": 1,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "6": {
                "id": 49,
                "item_id": 10019703,
                "name": "Стоматология с использованием оптики",
                "dept": 1,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "7": {
                "id": 50,
                "item_id": 10001721,
                "name": "Стоматология хирургическая",
                "dept": 1,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "8": {
                "id": 51,
                "item_id": 10003550,
                "name": "Имплантология стоматологическая",
                "dept": 1,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "9": {
                "id": 52,
                "item_id": 17,
                "name": "Стоматология детская",
                "dept": 1,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "10": {
                "id": 53,
                "item_id": 21,
                "name": "Стоматология ортодонтическая",
                "dept": 1,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "11": {
                "id": 54,
                "item_id": 10001722,
                "name": "Стоматология ортопедическая",
                "dept": 1,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "12": {
                "id": 55,
                "item_id": 10000342,
                "name": "Услуги на литье в зуботехнической лаборатории",
                "dept": 1,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "13": {
                "id": 56,
                "item_id": 10017692,
                "name": "Услуги зуботехнической лаборатории для внешних стоматологий",
                "dept": 1,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "14": {
                "id": 57,
                "item_id": 10019745,
                "name": "Продажа: гигиенические наборы",
                "dept": 1,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "15": {
                "id": 58,
                "item_id": 10006356,
                "name": "УЗИ",
                "dept": 4,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "16": {
                "id": 59,
                "item_id": 10019730,
                "name": "Холтер",
                "dept": 4,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "17": {
                "id": 60,
                "item_id": 10019731,
                "name": "ЭКГ",
                "dept": 4,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "18": {
                "id": 61,
                "item_id": 10008373,
                "name": "Лабораторная диагностика CMD",
                "dept": 4,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "19": {
                "id": 62,
                "item_id": 10008375,
                "name": "Лаборатррная диагностика CMD - программы",
                "dept": 4,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "20": {
                "id": 63,
                "item_id": 10038191,
                "name": "Лабораторная диагностика INVITRO",
                "dept": 4,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "21": {
                "id": 64,
                "item_id": 10013059,
                "name": "Аллергология-иммунология",
                "dept": 4,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "22": {
                "id": 65,
                "item_id": 10019705,
                "name": "Гастроэнтерология",
                "dept": 4,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "23": {
                "id": 66,
                "item_id": 10009840,
                "name": "Гинекология",
                "dept": 4,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "24": {
                "id": 67,
                "item_id": 10019704,
                "name": "Дерматовенерология",
                "dept": 4,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "25": {
                "id": 68,
                "item_id": 10006357,
                "name": "Кардиология",
                "dept": 4,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "26": {
                "id": 69,
                "item_id": 10019707,
                "name": "Детский массаж",
                "dept": 4,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "27": {
                "id": 70,
                "item_id": 30,
                "name": "Массаж",
                "dept": 4,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "28": {
                "id": 71,
                "item_id": 10007705,
                "name": "Неврология",
                "dept": 4,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "29": {
                "id": 72,
                "item_id": 10007937,
                "name": "Остеопатия",
                "dept": 4,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "30": {
                "id": 73,
                "item_id": 10004645,
                "name": "Отоларингология",
                "dept": 4,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "31": {
                "id": 74,
                "item_id": 10052528,
                "name": "Офтальмология",
                "dept": 4,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "32": {
                "id": 75,
                "item_id": 10018260,
                "name": "Терапия клиническая",
                "dept": 4,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "33": {
                "id": 76,
                "item_id": 10019706,
                "name": "Рефлексотерапия",
                "dept": 4,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "34": {
                "id": 77,
                "item_id": 10008174,
                "name": "Косметология",
                "dept": 4,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "35": {
                "id": 78,
                "item_id": 10008332,
                "name": "Педиатрия",
                "dept": 4,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "36": {
                "id": 79,
                "item_id": 10018268,
                "name": "Психология",
                "dept": 4,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "37": {
                "id": 80,
                "item_id": 10021862,
                "name": "Логопедия",
                "dept": 4,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "38": {
                "id": 81,
                "item_id": 10052529,
                "name": "Урология",
                "dept": 4,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "39": {
                "id": 82,
                "item_id": 10052530,
                "name": "Хирургия клиническая",
                "dept": 4,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "40": {
                "id": 83,
                "item_id": 10007938,
                "name": "Эндокринология",
                "dept": 4,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "41": {
                "id": 84,
                "item_id": 10001806,
                "name": "Удаленные",
                "dept": 4,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "success": true
            },
            "meta": {
              "total_time": "0.5146 s",
              "query_time": "0.0164 s",
              "php_time": "0.4983 s",
              "queries": 85,
              "source": "cache",
              "memory": "2 048 KB"
            }
          });
          //reject('Поля формы заполнены неверно');
      }, 1000);
  });
}

export default postSubdepts;
