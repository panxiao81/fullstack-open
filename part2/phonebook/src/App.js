import { useEffect, useState } from "react";
import personService from "./services/persons";

const Numbers = ({ person, deletePerson }) => {
  const handleDeleteClick = () => {
    deletePerson(person.id);
  };

  return (
    <div>
      <p>
        {person.name}&nbsp;
        {person.number}&nbsp;
        <button onClick={handleDeleteClick}>delete</button>
      </p>
    </div>
  );
};

const Filter = ({ filter, handleFilterChange }) => {
  return (
    <p>
      filter shown with <input value={filter} onChange={handleFilterChange} />
    </p>
  );
};

const PersonForm = ({
  addPerson,
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange,
}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        <label htmlFor="name">Name: </label>
        <input name="name" value={newName} onChange={handleNameChange} />
        <br />
        <label htmlFor="number">Number: </label>
        <input name="number" value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Persons = ({ persons, deletePerson }) => {
  return (
    <div>
      {persons.map((person) => (
        <Numbers key={person.id} person={person} deletePerson={deletePerson} />
      ))}
    </div>
  );
};

const Notification = ({ type, message }) => {
  if (message === null) {
    return null;
  }

  if (type === "error") {
    const errorStyle = {
      color: "red",
    };
    return (
      <div style={errorStyle} className="error">
        {message}
      </div>
    );
  }

  const successStyle = {
    color: "green",
  };
  return (
    <div style={successStyle} className="notification">
      {message}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [messageType, setMessageType] = useState(null);
  const [message, setMessage] = useState(null);

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .deletePerson(person.id)
        .then((response) => {
          setMessageType("success");
          setMessage(`Deleted ${person.name}`);
          setTimeout(() => {
            setMessageType(null);
            setMessage(null);
          }, 10000);
        })
        .catch((error) => {
          console.log(error);
          setMessageType("error");
          setMessage(`Information of ${person.name} has already been removed`);
          setTimeout(() => {
            setMessageType(null);
            setMessage(null);
          }, 10000);
        });
    }
  };

  const addPerson = (event) => {
    event.preventDefault();

    // if person is exists, alert user.
    if (persons.some((element) => element.name === newName)) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const person = persons.find((element) => element.name === newName);
        const changedPerson = { ...person, number: newNumber };

        personService
          .update(person.id, changedPerson)
          .then((response) => {
            setMessageType("success");
            setMessage(`Updated ${response.name}`);
            setTimeout(() => {
              setMessageType(null);
              setMessage(null);
            }, 10000);
            setPersons(
              persons.map((person) =>
                person.id !== changedPerson.id ? person : response
              )
            );
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }

    personService
      .create({
        name: newName,
        number: newNumber,
      })
      .then((response) => {
        setPersons(persons.concat(response));
        setNewName("");
        setNewNumber("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const numberToShow = persons.filter((person) => {
    let re = new RegExp(filter, "i");
    return re.test(person.name);
  });

  useEffect(() => {
    personService
      .getAll()
      .then((response) => {
        setPersons(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification type={messageType} message={message} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={numberToShow} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
