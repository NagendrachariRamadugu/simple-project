import './InputAddContainer.css'
import { MdAdd } from "react-icons/md";
import { useState } from 'react';

const InputAddContainer = ({handleAdd, handleUpdate}) => {

    const [newItem, setNewItem] = useState('');
    const [updateItem, setUpdateItem] = useState('')
    const [id, setId] = useState('')
    const [search, setSearch] = useState('');

    return (
        <div className='form-container'>
            <form 
                className='input-add-container'
                onSubmit={(e) => {
                    e.preventDefault();
                    if(newItem) {
                        handleAdd(newItem);
                        setNewItem('');
                    }
                }}  
            >
            <label htmlFor="input">Add New Item</label>
            <div>
                <input 
                    className='input-tag'
                    type="text" 
                    placeholder='Enter some text'
                    value = {newItem}
                    id = 'input'
                    onChange={(e) => {
                        setNewItem(e.target.value);
                    }}
                />
                <MdAdd 
                    className = 'add-button'
                    onClick={() => {
                        if(newItem) {
                            handleAdd(newItem);
                            setNewItem('');
                        }
                    }}
                />
            </div>
        </form>
        <form 
            className='update-item-container'
            onSubmit={(e) => {
                e.preventDefault();
                handleUpdate(id, updateItem);
                setId('');
                setUpdateItem('');
            }}
        >
            <label>Update Item</label>
            <input 
                type="text"
                placeholder='Enter Id'
                value = {id}
                onChange = {(e) => {
                    setId(e.target.value);
                }}
            />
            <input 
                type="text"  
                placeholder='Enter Item name'
                value = {updateItem}
                onChange={(e) => {
                    setUpdateItem(e.target.value)
                }}
            />
            <button type='submit'>Submit</button>
        </form>
        </div>
    )
}

export default InputAddContainer;