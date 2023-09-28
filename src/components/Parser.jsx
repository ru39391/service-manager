import {
  useState,
  useEffect
} from "react";
import { read, utils } from "xlsx";

function Parser() {
  const [data, setData] = useState([]);
  const [depts, setDepts] = useState([]);
  const [subdepts, setSubdepts] = useState([]);
  const [groups, setGroups] = useState([]);

  const handleArr = (arr, param) => {
    return arr.reduce((acc, item) => {
      if(acc.find(data => data[param] === item[param])) {
        return acc;
      } else {
        return [...acc, item];
      }
    }, []);
  };

  const handleDepts = (arr) => handleArr(arr.map(({ RAZDID, RAZDNAME }) => ({
    item_id: RAZDID,
    name: RAZDNAME
  })), 'item_id');

  const handleSubdepts = (arr) => handleArr(arr.map(({ SPECID, SPECNAME, RAZDID }) => ({
    item_id: SPECID,
    name: SPECNAME,
    dept: RAZDID
  })), 'item_id');

  const handleGroups = (arr) => {
    const filtredArr = arr.filter(({ ZAGOLOVOK_ID, ISCAPTION_1 }) => ZAGOLOVOK_ID === '' && Number(ISCAPTION_1) === 1);
    console.log(arr.map(({ ZAGOLOVOK_ID, ISCAPTION_1 }) => ({ ZAGOLOVOK_ID, ISCAPTION_1: Number(ISCAPTION_1) })));
    return handleArr(filtredArr.map(({ RAZDID, SPECID, SCHID, SCHNAME }) => ({
      item_id: SCHID,
      name: SCHNAME,
      dept: RAZDID,
      subdept: SPECID
    })), 'item_id');
  }

  const handleFileUpload = (e) => {
    const reader = new FileReader();
    reader.readAsBinaryString(e.target.files[0]);
    reader.onload = (e) => {
      const { result } = e.target;

      const wb = read(result, { type: 'binary' }); // parse the array buffer
      const ws = wb.Sheets[wb.SheetNames[0]]; // get the first worksheet
      const parsedData = utils.sheet_to_json((ws), { defval: '' }); // generate objects

      setData(parsedData);
      setDepts(handleDepts(parsedData));
      setSubdepts(handleSubdepts(parsedData));
      setGroups(handleGroups(parsedData));
    };
  };

  const getPriceList = async (arr) => {
    try {
      const res = await fetch('http://stomistok.local/api/depts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(arr)
      })
      return await res.json();
    } catch(err) {
      return err;
    }
  };

  useEffect(() => {
    /*
    getPriceList()
    .then(({ success, data, errors }) => {
      const res = success ? data : errors.message;
      console.log(res);
    })
    .catch((err) => console.error(err));
    */
  }, []);

  return (
    <>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />

      <ol>{depts.length && depts.map(({ item_id, name }) => (
        <li key={item_id}>{name} - {item_id}</li>
      ))}</ol>
      <hr />

      <ol>{subdepts.length && subdepts.map(({ item_id, name, dept }) => (
        <li key={item_id}>{name} - {item_id} - {dept}</li>
      ))}</ol>
      <hr />

      <ol>{groups.length && groups.map(({ item_id, name, dept, subdept }) => (
        <li key={item_id}>{name} - {item_id} - {dept} - {subdept}</li>
      ))}</ol>
      <hr />

      <ol>{data.length && Object.values(data[0]).map((item, index, arr) => (
        <li key={index}>{`${Object.keys(data[0])[index]}: ${item}`}</li>
      ))}</ol>
      <hr />
    </>
  );
}

export default Parser;
