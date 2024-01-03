import './Body.css';
import { MdDelete } from "react-icons/md";

const Body = (
    {   items,
        handleChange,
        handleDelete, 
        search, 
        setSearch,
        loaded,
        setLoaded
    }
) => {
    return (
        <ul>
        {  
            (loaded)?
            ((items.length)?
          (items.map(item => (
              <li key = {item.id}>
                  <label  className = 'label' htmlFor="checkbox">{item.value}</label>
                  <input 
                      type="checkbox"
                      checked = {item.checked} 
                      id = 'checkbox' 
                      className='checkbox'
                      onChange={() => {
                          handleChange(item.id);
                      }}
                  />
                  <MdDelete 
                      className = 'delete-button' 
                      onClick={() => {
                          handleDelete(item.id);
                      }}
                  />
              </li>
          ))):
          (<li>
            There are no items in the list
          </li>)):
          (<li>...Loading items</li>)
        }            
    </ul>
       
    )
}

export default Body;



