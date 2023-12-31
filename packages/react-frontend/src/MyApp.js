
import React, {useState, useEffect} from 'react';
import Table from './Table';
import Form from "./Form";

function MyApp() {
    const [characters, setCharacters] = useState([

    ]);
    
    function fetchUsers() {
        const promise = fetch("http://localhost:8000/users");
        return promise;
    }

    
    function postUser(person) {
      const promise = fetch("Http://localhost:8000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(person),
      });

      return promise;
    }

    function removeOneCharacter (characterName, job) {
        // Updating to remove the character at the given index from the backend too
        /* old code
        const updated = characters.filter((character, i) => {
            return i !== index
        });
        setCharacters(updated);
        */
        const promise = fetch(`http://localhost:8000/users/?name=${characterName}&job=${job}`,{
            method: 'DELETE'
        });
        promise.then(() => {
            // get the updated list of users
            fetchUsers()
                .then((res) => res.json())
                .then((json) => setCharacters(json["users_list"]))
        });
        }

    function updateList(person) {
        postUser(person)
          .then((res) => res.json()).then((json) => {
            setCharacters(characters.concat(json));
        })
          .catch((error) => {
            console.log(error);
          })
    }
    
    useEffect(() => {
      fetchUsers()
          .then((res) => res.json())
          .then((json) => setCharacters(json["users_list"]))
          .catch((error) => { console.log(error); });
    }, [] );
    return (
        <div className="container">
            <Table characterData={characters}
                   removeCharacter={removeOneCharacter} />
            <Form handleSubmit={updateList} />
        </div>
    )
}
export default MyApp;
