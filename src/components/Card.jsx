import { use, useState, useEffect, useRef } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Alert from ".//Alert";

const Card = () => {
  const [hasInitialized, setHasInitialized] = useState(false);
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [showFinished, setShowFinished] = useState(false);
  const [editTodo, setEditTodo] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const pop = useRef(null);
  const alert = useRef(null);
  const [alertMessage, setAlertMessage] = useState("");
  const [alerDisplay, setAlertDisplay] = useState(false);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    setTodos(storedTodos);
    setHasInitialized(true);
  }, []);

  useEffect(() => {
    if (!hasInitialized) return;
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = () => {
    if (newTodo.trim() === "") return;
    const updatedTodos = [...todos, { text: newTodo, completed: false }];
    setTodos(updatedTodos);
    setNewTodo("");
    setAlertMessage("Todo added successfully!");
    setAlertDisplay(true);
    setTimeout(() => {
      setAlertDisplay(false);
    }, 2000);
  };

  const handleToggleTodo = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const handleDeleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
    setAlertMessage("Todo deleted successfully!");
    setAlertDisplay(true);
    setTimeout(() => {
      setAlertDisplay(false);
    }, 2000);
  };

  const handleEditTodo = (index, newText) => {
    if (newText.trim() === "") return;
    if (newText === todos[index].text) return;
    if (newText === null) return;
    if (newText === undefined) return;
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, text: newText } : todo
    );
    setTodos(updatedTodos);
    setAlertMessage("Todo updated successfully!");
    setAlertDisplay(true);
    setTimeout(() => {
      setAlertDisplay(false);
    }, 2000);
  };

  const handleShowFinished = () => {
    setShowFinished(!showFinished);
  };

  const handlePop = (index) => {
    setEditIndex(index);
    setEditTodo(todos[index].text);
    setIsEditing(true);
  };
  const handleClosePop = () => {
    setEditIndex(null);
    setEditTodo("");
    setIsEditing(false);
  };
  const handleSave = () => {
    handleEditTodo(editIndex, editTodo);
    handleClosePop();
    setAlertMessage("Todo updated successfully!");
    setAlertDisplay(true);
    setTimeout(() => {
      setAlertDisplay(false);
    }, 2000);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (isEditing) {
        handleSave();
      } else {
        handleAddTodo();
      }
    }
  };

  useEffect(() => {
    if (isEditing) {
      const handleClickOutside = (event) => {
        if (pop.current && !pop.current.contains(event.target)) {
          handleClosePop();
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isEditing]);

  return (
    <>
      <Alert ref={alert} message={alertMessage} display={alerDisplay}/>
      <div className="w-[35%] h-[80%] bg-purple-100 mx-auto mt-3 rounded-2xl flex flex-col justify-aroud  ">
        <div
          ref={pop}
          className={`w-[35%] h-[30%] bg-violet-400  mx-auto mt-3 rounded-xl flex flex-col justify-aroud gap-15 items-center fixed  left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-5 border-violet-700 transition-all duration-400 ease-in-out ${
            isEditing ? "top-[30%]  z-100" : "top-[-30%] "
          }`}
        >
          <div className="top flex flex-col justify-center items-center gap-2 w-full h-[40%]">
            <div className="title font-bold text-2xl pt-3 text-center ">
              Edit your todo
            </div>
            <input
              type="text"
              value={editTodo}
              className="bg-white w-[80%] rounded-2xl h-[40%] px-5 text-lg focus:outline-2 outline-violet-700"
              placeholder="Todo"
              onChange={(e) => setEditTodo(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className="buttons w-[40%] h-[20%]  ml-[50%] flex justify-around items-center rounded-2xl">
            <button
              className="cancel bg-white w-[40%] h-full border-2 border-violet-700 rounded-3xl text-violet-700 font-medium text-lg hover:bg-violet-400 hover:text-white cursor-pointer"
              onClick={handleClosePop}
            >
              Cancel
            </button>
            <button
              className="cancel bg-violet-700 w-[40%] h-full border-2 border-white rounded-3xl text-white font-medium text-lg hover:bg-violet-400 cursor-pointer"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
        <div className="title font-bold text-2xl pt-3 text-center">
          iTask - Manage your todo at one place
        </div>
        <div className="add font-bold text-xl p-3 pl-4">Add a Todo</div>
        <div className="input flex justify-center items-center gap-4 h-[10%]">
          <input
            type="text"
            className="bg-white w-[70%] rounded-2xl h-[50%] focus:outline-violet-700 px-5 "
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new todo"
            onKeyDown={handleKeyDown}
          />
          <button
            className="w-[15%] bg-violet-500 text-white font-medium rounded-2xl h-[50%] cursor-pointer hover:bg-violet-700"
            onClick={handleAddTodo}
          >
            Save
          </button>
        </div>
        <label className="show flex ml-5 items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            name=""
            id=""
            className="w-2 h-2 rounded-full appearance-none bg-violet-500 checked:bg-violet-700 checked:ring-2 checked:ring-offset-2 checked:ring-violet-700 cursor-pointer"
            onClick={handleShowFinished}
          />
          <span className={`${showFinished? "text-black":
            "text-gray-500"
          }`}>Show Finished</span>
        </label>
        <div className="separation bg-gray-300 w-[80%] h-0.5 mx-auto mt-4"></div>
        <div className="todo mt-2 ml-7 font-bold text-2xl">Your Todos</div>
        <div className="list ">
          <ul className="flex flex-col gap-2 mt-3">
            {!showFinished &&
              todos.map((todo, index) =>
                !todo.completed ? (
                  <li
                    className="flex justify-between items-center  w-[90%] h-[10%] rounded-2xl mx-auto p-2"
                    key={index}
                  >
                    <label className="items flex gap-2 items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name=""
                        id=""
                        checked={todo.completed}
                        onChange={() => handleToggleTodo(index)}
                        key={index}
                        className="w-2 h-2 rounded-full appearance-none bg-violet-500 checked:bg-violet-700 checked:ring-2 checked:ring-offset-2 checked:ring-violet-700 cursor-pointer"
                      />
                      <span>{todo.text}</span>
                    </label>
                    <div className="icons flex justify-end items-center gap-2 w-[20%]">
                      <button
                        className="bg-violet-600 px-3 rounded-lg p-1 flex justify-center items-center w-[50%] cursor-pointer hover:bg-violet-700"
                        onClick={() => handleEditTodo(index, handlePop(index))}
                      >
                        <FaEdit className="text-white" />
                      </button>
                      <button
                        className="bg-violet-600 px-3 rounded-lg p-1 flex justify-center items-center w-[50%] cursor-pointer hover:bg-violet-700"
                        onClick={() => handleDeleteTodo(index)}
                      >
                        <FaTrash className="text-white" />
                      </button>
                    </div>
                  </li>
                ) : (
                  ""
                )
              )}

            {showFinished &&
              todos.map((todo, index) =>
                todo.completed ? (
                  <li
                    className="flex justify-between items-center  w-[90%] h-[10%] rounded-2xl mx-auto p-2"
                    key={index}
                  >
                    <label className="items flex gap-2 items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name=""
                        id=""
                        checked={todo.completed}
                        onChange={() => handleToggleTodo(index)}
                        key={index}
                        className="w-2 h-2 rounded-full appearance-none bg-violet-500 checked:bg-violet-700 checked:ring-2 checked:ring-offset-2 checked:ring-violet-700 cursor-pointer"
                      />
                      <span className="line-through">{todo.text}</span>
                    </label>
                    <div className="icons flex justify-end items-center gap-2 w-[20%]">
                      <button
                        className="bg-violet-600 px-3 rounded-lg p-1 flex justify-center items-center w-[50%] cursor-pointer hover:bg-violet-700"
                        onClick={() => handleEditTodo(index, handlePop(index))}
                      >
                        <FaEdit className="text-white" />
                      </button>
                      <button
                        className="bg-violet-600 px-3 rounded-lg p-1 flex justify-center items-center w-[50%] cursor-pointer hover:bg-violet-700"
                        onClick={() => handleDeleteTodo(index)}
                      >
                        <FaTrash className="text-white" />
                      </button>
                    </div>
                  </li>
                ) : (
                  ""
                )
              )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Card;
