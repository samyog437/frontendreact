// import { useState } from 'react';
import { useState , useEffect} from 'react';
// import axios from 'axios';
import './App.css';
import './Input.css';

function App(props) {

  const [newPhoneBook, setNewPhoneBook] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const[phonebook, setphonebook] = useState(props.phonebook)
  const[showAll, setShowAll] = useState(true)
  const[searchInput, setSearchInput] = useState('')

  const phonebookToShow = showAll 
  ? phonebook
  : phonebook.filter(n => n.important == true)

  // useEffect(() => {
  //   axios.get('http://localhost:3001/phonebook')
  //     .then((response) => {
  //       console.log(response)
  //       setphonebook(response.data)
  //     })
  // },[])

  const handleInputChange = (event) => {
    console.log(event.target.value)
    setNewPhoneBook(event.target.value)
  }

  const handleNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleAdd = (event) => {
    event.preventDefault()
    // console.log(event.target)
    // alert('Testing...')
    const booknum = {
      id: phonebook.length + 1,
      name: newPhoneBook,
      number: newNumber,
      date: new Date().toString(),
    }
    if(newPhoneBook != '' && newNumber != '') setphonebook(phonebook.concat(booknum))
    setNewPhoneBook('')
    setNewNumber('')
  }

  const handleDelete = (id) => {
    // alert(id)
    var confirm = window.confirm(`Are you sure you want to delete Number ${id}`) 
    if (confirm) setphonebook(phonebook.filter(booknum => booknum.id !== id))
  }

  const handleSearch = (event) => {
    console.log(event.target.value)
    setSearchInput(event.target.value);
  }

  const handleSearchBtn = (event) => {
    event.preventDefault();
    if (searchInput.length>0) {
      setphonebook(phonebook.filter((booknum) => {
        return booknum.name.match(searchInput);
      }))
      }
      
  }

  return (
    <>
    <div className='list'>
      <div className='inp'>
        <h2>Phone Book</h2>
        
      </div>
      <h2>Add an entry</h2>
      <form>
          Search: <input value={searchInput} onChange={handleSearch}/>
          <button className='btn' onClick={handleSearchBtn}>Search</button>
          Name: <input value={newPhoneBook} onChange={handleInputChange}/>
          Number: <input value={newNumber} onChange={handleNumber} type='number'/>
          <button onClick={handleAdd}>Add</button>
      </form>
      <h2>Entries</h2>
      <ul>
        {phonebookToShow.filter(booknum => booknum.name.toLowerCase().includes(searchInput)).map(booknum => 
        <li key={booknum.id}>
          <p>{booknum.name}</p>
          <p>{booknum.number}</p>
          <button className='btn del' onClick={() => handleDelete(booknum.id)}>Delete</button>
        </li>)}
      </ul>
    </div>
    </>
  );
}

export default App;