/**
* Имитация API для тестирования
* @returns {Object} - объект данных
*/
const postGroups = () => {
  // 480/483
  return new Promise((resolve, reject) => {
      setTimeout(() => {
          resolve({
            "success": true,
            "data": {
              "0": {
                "id": 682,
                "item_id": 11045,
                "name": "Программы и комплексы",
                "dept": 4,
                "subdept": 10006357,
                "group": 0,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "1": {
                "id": 683,
                "item_id": 716,
                "name": "Детский массаж",
                "dept": 4,
                "subdept": 10019707,
                "group": 0,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "2": {
                "id": 684,
                "item_id": 19518,
                "name": "Скрытые услуги (части комплексных или программы обслуживания)",
                "dept": 4,
                "subdept": 10006357,
                "group": 0,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "3": {
                "id": 685,
                "item_id": 5754,
                "name": "Консультации",
                "dept": 4,
                "subdept": 10007705,
                "group": 0,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "4": {
                "id": 686,
                "item_id": 5755,
                "name": "Медицинские услуги",
                "dept": 4,
                "subdept": 10007705,
                "group": 0,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "5": {
                "id": 687,
                "item_id": 723,
                "name": "Мануальная терапия",
                "dept": 4,
                "subdept": 10007705,
                "group": 0,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "6": {
                "id": 688,
                "item_id": 19521,
                "name": "Скрытые услуги (части комплексных или программы обслуживания)",
                "dept": 4,
                "subdept": 10007705,
                "group": 0,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "7": {
                "id": 689,
                "item_id": 10640,
                "name": "Процедуры",
                "dept": 4,
                "subdept": 10007937,
                "group": 0,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "8": {
                "id": 690,
                "item_id": 5380,
                "name": "ЛОР обследование",
                "dept": 4,
                "subdept": 10004645,
                "group": 0,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "9": {
                "id": 691,
                "item_id": 5389,
                "name": "Общие ЛОР манипуляции",
                "dept": 4,
                "subdept": 10004645,
                "group": 0,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "10": {
                "id": 692,
                "item_id": 5396,
                "name": "Местные ЛОР манипуляции и процедуры: полость носа, околоносовые пазухи, слуховая труба",
                "dept": 4,
                "subdept": 10004645,
                "group": 0,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "11": {
                "id": 693,
                "item_id": 5420,
                "name": "Местные ЛОР манипуляции и процедуры: глотка",
                "dept": 4,
                "subdept": 10004645,
                "group": 0,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "12": {
                "id": 694,
                "item_id": 5431,
                "name": "Местные ЛОР манипуляции и процедуры:гортань",
                "dept": 4,
                "subdept": 10004645,
                "group": 0,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "13": {
                "id": 695,
                "item_id": 5436,
                "name": "Местные ЛОР манипуляции и процедуры: ухо",
                "dept": 4,
                "subdept": 10004645,
                "group": 0,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "14": {
                "id": 696,
                "item_id": 19519,
                "name": "Скрытые услуги (части комплексных или программы обслуживания)",
                "dept": 4,
                "subdept": 10004645,
                "group": 0,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "15": {
                "id": 697,
                "item_id": 19659,
                "name": "Консультация в отфальмологии",
                "dept": 4,
                "subdept": 10052528,
                "group": 0,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "16": {
                "id": 698,
                "item_id": 19676,
                "name": "Диагностика в офтальмологии",
                "dept": 4,
                "subdept": 10052528,
                "group": 0,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "17": {
                "id": 699,
                "item_id": 19704,
                "name": "Манипуляции в офтальмологии",
                "dept": 4,
                "subdept": 10052528,
                "group": 0,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "18": {
                "id": 700,
                "item_id": 19820,
                "name": "Скрытые услуги (части комплексных или программы обслуживания)",
                "dept": 4,
                "subdept": 10052528,
                "group": 0,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "19": {
                "id": 701,
                "item_id": 19823,
                "name": "Комплексные услуги и программы",
                "dept": 4,
                "subdept": 10052528,
                "group": 0,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "20": {
                "id": 702,
                "item_id": 10745,
                "name": "Гирудотерапия",
                "dept": 4,
                "subdept": 10019706,
                "group": 0,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "21": {
                "id": 703,
                "item_id": 12418,
                "name": "Гомеопатия",
                "dept": 4,
                "subdept": 10018260,
                "group": 0,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "22": {
                "id": 704,
                "item_id": 12485,
                "name": "Комплексные услуги и программы",
                "dept": 4,
                "subdept": 10018260,
                "group": 0,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "23": {
                "id": 705,
                "item_id": 7787,
                "name": "Косметология",
                "dept": 4,
                "subdept": 10008174,
                "group": 0,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "24": {
                "id": 706,
                "item_id": 5823,
                "name": "Профессиональное глубокое очищение кожи",
                "dept": 4,
                "subdept": 10008174,
                "group": 0,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "25": {
                "id": 707,
                "item_id": 7789,
                "name": "Профессиональные терапевтические программы.",
                "dept": 4,
                "subdept": 10008174,
                "group": 0,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "26": {
                "id": 708,
                "item_id": 7793,
                "name": "Химические пилинги",
                "dept": 4,
                "subdept": 10008174,
                "group": 0,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "27": {
                "id": 709,
                "item_id": 7794,
                "name": "АППАРАТНАЯ КОСМЕТОЛОГИЯ",
                "dept": 4,
                "subdept": 10008174,
                "group": 0,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "28": {
                "id": 710,
                "item_id": 11051,
                "name": "MAGIC ONE Лазерная диодная эпиляция на аппарате",
                "dept": 4,
                "subdept": 10008174,
                "group": 7794,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "29": {
                "id": 711,
                "item_id": 19322,
                "name": "SECRET RF",
                "dept": 4,
                "subdept": 10008174,
                "group": 7794,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "30": {
                "id": 712,
                "item_id": 7798,
                "name": "RF - лифтинг терапевтический на аппарате SECRET RF",
                "dept": 4,
                "subdept": 10008174,
                "group": 19322,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "31": {
                "id": 713,
                "item_id": 19331,
                "name": "Леонардо HYPER PULSE",
                "dept": 4,
                "subdept": 10008174,
                "group": 7794,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "32": {
                "id": 714,
                "item_id": 19349,
                "name": "Фотолечение на аппарате Леонардо HYPER PULSE",
                "dept": 4,
                "subdept": 10008174,
                "group": 19331,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "33": {
                "id": 715,
                "item_id": 19348,
                "name": "Фотоэпиляция на аппарате Леонардо HYPER PULSE",
                "dept": 4,
                "subdept": 10008174,
                "group": 19331,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "34": {
                "id": 716,
                "item_id": 19345,
                "name": "GMF II",
                "dept": 4,
                "subdept": 10008174,
                "group": 7794,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "35": {
                "id": 717,
                "item_id": 7820,
                "name": "Фотоэпиляциия на аппарате GMF II по технологии ЭЛОС",
                "dept": 4,
                "subdept": 10008174,
                "group": 19345,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "36": {
                "id": 718,
                "item_id": 7816,
                "name": "Фотолечение АКНЕ на аппарате GMF II по технологии ЭЛОС",
                "dept": 4,
                "subdept": 10008174,
                "group": 19345,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "37": {
                "id": 719,
                "item_id": 7804,
                "name": "Фотоомоложение на аппарате GMF II по технологии ЭЛОС (рекомендовано курсовое лечение. Выполняется 1 процедура в 14 дней)",
                "dept": 4,
                "subdept": 10008174,
                "group": 19345,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "38": {
                "id": 720,
                "item_id": 7993,
                "name": "Фотолечение сосудистого рисунка на лице",
                "dept": 4,
                "subdept": 10008174,
                "group": 19345,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "39": {
                "id": 721,
                "item_id": 7812,
                "name": "Фотолечение гиперпигментации на аппарате GMF II по технологии ЭЛОС",
                "dept": 4,
                "subdept": 10008174,
                "group": 19345,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "40": {
                "id": 722,
                "item_id": 19352,
                "name": "Фракционный лазер CO2",
                "dept": 4,
                "subdept": 10008174,
                "group": 7794,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "41": {
                "id": 723,
                "item_id": 7902,
                "name": "Лазерная шлифовка растяжек",
                "dept": 4,
                "subdept": 10008174,
                "group": 19352,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "42": {
                "id": 724,
                "item_id": 7890,
                "name": "Лазерная фракционная шлифовка рубцов постакне",
                "dept": 4,
                "subdept": 10008174,
                "group": 19352,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "43": {
                "id": 725,
                "item_id": 7888,
                "name": "Лазерная фракционная шлифовка рубцов(шрамов)",
                "dept": 4,
                "subdept": 10008174,
                "group": 19352,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "44": {
                "id": 726,
                "item_id": 7877,
                "name": "Лазерный фракционный пилинг",
                "dept": 4,
                "subdept": 10008174,
                "group": 19352,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "45": {
                "id": 727,
                "item_id": 7884,
                "name": "Лазерная фракционная шлифовка",
                "dept": 4,
                "subdept": 10008174,
                "group": 19352,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "46": {
                "id": 728,
                "item_id": 7845,
                "name": "ИНЪЕКЦИОННАЯ КОСМЕТОЛОГИЯ",
                "dept": 4,
                "subdept": 10008174,
                "group": 0,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "47": {
                "id": 729,
                "item_id": 9772,
                "name": "Мезотерапия",
                "dept": 4,
                "subdept": 10008174,
                "group": 0,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "48": {
                "id": 730,
                "item_id": 7846,
                "name": "Мезотерапия лицо",
                "dept": 4,
                "subdept": 10008174,
                "group": 0,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "49": {
                "id": 731,
                "item_id": 7850,
                "name": "Мезотерапия волосистой части головы",
                "dept": 4,
                "subdept": 10008174,
                "group": 0,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "50": {
                "id": 732,
                "item_id": 9107,
                "name": "Липолитические коктейли",
                "dept": 4,
                "subdept": 10008174,
                "group": 0,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "51": {
                "id": 733,
                "item_id": 7997,
                "name": "Плазмотерапия (Плазмолифтинг)",
                "dept": 4,
                "subdept": 10008174,
                "group": 0,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "52": {
                "id": 734,
                "item_id": 12526,
                "name": "Regen Lab",
                "dept": 4,
                "subdept": 10008174,
                "group": 7997,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "53": {
                "id": 735,
                "item_id": 7853,
                "name": "Биоревитализация",
                "dept": 4,
                "subdept": 10008174,
                "group": 0,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "54": {
                "id": 736,
                "item_id": 7863,
                "name": "Ботулинотерапия",
                "dept": 4,
                "subdept": 10008174,
                "group": 0,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "55": {
                "id": 737,
                "item_id": 7868,
                "name": "Контурная пластика (импланты интрадермальные)",
                "dept": 4,
                "subdept": 10008174,
                "group": 0,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "56": {
                "id": 738,
                "item_id": 9122,
                "name": "МЕЗОНИТИ",
                "dept": 4,
                "subdept": 10008174,
                "group": 0,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "57": {
                "id": 739,
                "item_id": 8021,
                "name": "АППАРАТНАЯ КОСМЕТОЛОГИЯ С ПРИМЕНЕНИЕМ ЛАЗЕРА",
                "dept": 4,
                "subdept": 10008174,
                "group": 0,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "58": {
                "id": 740,
                "item_id": 7876,
                "name": "Фракционное лазерное омоложение кожи лица",
                "dept": 4,
                "subdept": 10008174,
                "group": 8021,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "59": {
                "id": 741,
                "item_id": 8020,
                "name": "Фракционная лазерная шлифовка",
                "dept": 4,
                "subdept": 10008174,
                "group": 0,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "60": {
                "id": 742,
                "item_id": 10332,
                "name": "Уход за лицом и областью декольте на косметике Janssen",
                "dept": 4,
                "subdept": 10008174,
                "group": 0,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "61": {
                "id": 743,
                "item_id": 10350,
                "name": "Аппаратная косметология с применением косметики Janssen",
                "dept": 4,
                "subdept": 10008174,
                "group": 0,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "62": {
                "id": 744,
                "item_id": 10356,
                "name": "Уход за телом на косметике Thalac/Janssen",
                "dept": 4,
                "subdept": 10008174,
                "group": 0,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "63": {
                "id": 745,
                "item_id": 10362,
                "name": "Поверхностные и срединные химические пилинги",
                "dept": 4,
                "subdept": 10008174,
                "group": 0,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "64": {
                "id": 746,
                "item_id": 10469,
                "name": "Депиляция воском (Ваксинг)",
                "dept": 4,
                "subdept": 10008174,
                "group": 0,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "65": {
                "id": 747,
                "item_id": 10411,
                "name": "Домашний уход",
                "dept": 4,
                "subdept": 10008174,
                "group": 0,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "66": {
                "id": 748,
                "item_id": 5849,
                "name": "Основные услуги",
                "dept": 4,
                "subdept": 10008332,
                "group": 0,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "67": {
                "id": 749,
                "item_id": 5860,
                "name": "Вакцинация",
                "dept": 4,
                "subdept": 10008332,
                "group": 0,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "68": {
                "id": 750,
                "item_id": 12489,
                "name": "Комплексные услуги и программы",
                "dept": 4,
                "subdept": 10008332,
                "group": 0,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "69": {
                "id": 751,
                "item_id": 19505,
                "name": "Скрытые услуги (части комплексных или программы обслуживания)",
                "dept": 4,
                "subdept": 10008332,
                "group": 0,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "70": {
                "id": 752,
                "item_id": 19783,
                "name": "Консультации",
                "dept": 4,
                "subdept": 10052529,
                "group": 0,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "71": {
                "id": 753,
                "item_id": 19784,
                "name": "Диагностика",
                "dept": 4,
                "subdept": 10052529,
                "group": 0,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "72": {
                "id": 754,
                "item_id": 19785,
                "name": "Манипуляции",
                "dept": 4,
                "subdept": 10052529,
                "group": 0,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "73": {
                "id": 755,
                "item_id": 19738,
                "name": "Комплексы и программы",
                "dept": 4,
                "subdept": 10052529,
                "group": 0,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "74": {
                "id": 756,
                "item_id": 19750,
                "name": "Консультации в хирургии",
                "dept": 4,
                "subdept": 10052530,
                "group": 0,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "75": {
                "id": 757,
                "item_id": 19755,
                "name": "Диагностика в хирургии",
                "dept": 4,
                "subdept": 10052530,
                "group": 0,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "76": {
                "id": 758,
                "item_id": 19760,
                "name": "Манипуляции в хирургии",
                "dept": 4,
                "subdept": 10052530,
                "group": 0,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "77": {
                "id": 759,
                "item_id": 11086,
                "name": "Программы и комплексы",
                "dept": 4,
                "subdept": 10007938,
                "group": 0,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "78": {
                "id": 760,
                "item_id": 19522,
                "name": "Скрытые услуги (части комплексных или программы обслуживания)",
                "dept": 4,
                "subdept": 10007938,
                "group": 0,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "79": {
                "id": 761,
                "item_id": 10448,
                "name": "Диагностический блок (индивидуальный)",
                "dept": 4,
                "subdept": 10001806,
                "group": 0,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "80": {
                "id": 762,
                "item_id": 10463,
                "name": "Коррекционно-развивающий блок (индивидуальный и групповой)",
                "dept": 4,
                "subdept": 10001806,
                "group": 0,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "81": {
                "id": 763,
                "item_id": 10454,
                "name": "Коррекционный блок (индивидуальный)",
                "dept": 4,
                "subdept": 10001806,
                "group": 0,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "82": {
                "id": 764,
                "item_id": 10444,
                "name": "Консультативная программа",
                "dept": 4,
                "subdept": 10001806,
                "group": 0,
                "createdon": "2024-03-09 01:30:45",
                "updatedon": null
              },
              "success": true
            },
            "meta": {
              "total_time": "4.8074 s",
              "query_time": "0.1936 s",
              "php_time": "4.6137 s",
              "queries": 961,
              "source": "cache",
              "memory": "2 048 KB"
            }
          });
          //reject('Поля формы заполнены неверно');
      }, 1000);
  });
}

export default postGroups;
