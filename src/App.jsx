import './App.css';
import { useState, useEffect } from 'react';
import InputAddContainer from './App/InputAddContainer';
import Body from './App/Body';
import SearchItems from './App/SearchItems';
import api from '../Data/api.js';
import apiRequest from '../Data/api.js';

const App = () => {
  const [search, setSearch] = useState('')
  const [items, setItems] = useState([]);
  const [loaded, setLoaded] = useState('')

  const API_URL = 'http://localhost:3500/info';

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        const listItems = await response.json();
        setItems(listItems);
        setLoaded('Items have been loaded')
      }
      catch (err) {
        console.log(err.message)
      }
    }

   setTimeout(() => {
    fetchItems();
   }, 5000)
  }, [])

  const handleAdd = async (value) => {
    const id = 
        (items.length)?
        (items[items.length - 1].id + 1):
        (1)
    const newItem = {
        id,
        checked: true,
        value
    }
    const listItems = [...items, newItem];
    setItems(listItems);

   const  postOptions = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newItem)
    }

    const result = await apiRequest(API_URL, postOptions);
    console.log(result)
  }

  const handleUpdate = async (strId, value) => {
      const id = Number(strId);
      const listItems = items.map(item => (
        (item.id !== id)?
        (item):
        ({...item, value})
      ));
      setItems(listItems);

      const updateOptions = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({value: listItems[id-1].value})
      }
      const reqUrl = `${API_URL}/${id}`
      const result = await apiRequest(reqUrl, updateOptions);
      if (result) console.log(result)
  }

  const handleDelete = async (id) => {
    const filteredItems = items.filter(item => (item.id !== id))
    const listItems = filteredItems.map((item, index) => (
      {...item, id: index+1}
    ))
    setItems(listItems);

    const deleteOptions = {
      method: "DELETE"
    }

    const requrl = `${API_URL}/${id}`;
    const result = await apiRequest(requrl, deleteOptions);

    /* for(i = 0, id = 1; i< listItems.length; i++, id++) {
      const updateOptions = {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: id})
      }

      const requrl = `${application}/${id}`;
      const result = await apiRequest(requrl, updateOptions);

    } */

  }

  const handleChange = (id) => {
    const listItems = items.map(item => (
      (item.id !== id)?
      (item):
      ({...item, checked: (!item.checked)})
    ))
    setItems(listItems);
  }
  return (
    <div className='center-div'>
        <SearchItems
          search={search}
          setSearch={setSearch}
        />
        <InputAddContainer
          handleAdd = {handleAdd}
          handleUpdate={handleUpdate}
        />
        <Body 
          search = {search}
          setSearch = {setSearch}
          handleChange = {handleChange} 
          loaded = {loaded}
          setLoaded = {setLoaded}
          items = {
            (items.length)? 
                (items.filter(item => ((item.value.toLowerCase())).includes(search.toLowerCase()))):
                (items)  
            }
          handleDelete={handleDelete}
        />
    </div>
  )
}

export default  App;