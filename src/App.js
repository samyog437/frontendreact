// import { useState } from 'react';
import { useState , useEffect} from 'react';
// import axios from 'axios';
import './App.css';
import './Input.css';

function App(props) {

  const [newNote, setNewNote] = useState('')
  const[notes, setNotes] = useState(props.notes)
  const[showAll, setShowAll] = useState(true)

  const notesToShow = showAll 
  ? notes
  : notes.filter(n => n.important == true)

  // useEffect(() => {
  //   axios.get('http://localhost:3001/notes')
  //     .then((response) => {
  //       console.log(response)
  //       setNotes(response.data)
  //     })
  // },[])

  const handleInputChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const handleAdd = (event) => {
    event.preventDefault()
    // console.log(event.target)
    // alert('Testing...')
    const note = {
      id: notes.length + 1,
      content: newNote,
      date: new Date().toString(),
      important: Math.random() < 0.5
    }
    if(newNote != '') setNotes(notes.concat(note))
    setNewNote('')
  }

  const handleDelete = (id) => {
    // alert(id)
    var confirm = window.confirm(`Are you sure you want to delete note ${id}`) 
    if (confirm) setNotes(notes.filter(note => note.id !== id))
  }

  return (
    <>
    <div className='list'>
      <div className='inp'>
        <form>
          <input value={newNote} onChange={handleInputChange} />
          <button onClick={handleAdd}>Add</button>
        </form>
        <button onClick={()=> setShowAll(!showAll)}> {showAll ? 'Show Important' :'Show All'}</button>
      </div>
        
      <h2>Notes</h2>
      <ul>
        {notesToShow.map(note => 
        <li key={note.id}>
          {note.content}
          <p>{note.date}</p>
          <button className='btn' onClick={() => handleDelete(note.id)}>Delete</button>
        </li>)}
      </ul>
    </div>
    </>
  );
}

export default App;