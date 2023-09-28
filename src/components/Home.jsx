import React from "react";
import { useReducer } from "react";
import Bin from "../assets/bin.svg"
import Nav from "./Nav";

const initialState = {
  tasks: [],
  newTask: {
    title: "",
    description: "",
    dueDate: "",
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TASK":
      if (
        action.payload.title &&
        action.payload.description &&
        action.payload.dueDate
      ) {
        return {
          ...state,
          tasks: [...state.tasks, action.payload],
          newTask: { title: "", description: "", dueDate: "" },
        };
      }
      return state;
    case "DELETE_TASK":
      const updatedTasks = [...state.tasks];
      updatedTasks.splice(action.payload, 1);
      return { ...state, tasks: updatedTasks };
    case "UPDATE_NEW_TASK":
      return { ...state, newTask: { ...state.newTask, ...action.payload } };
    default:
      return state;
  }
};

const Home = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleNewTask = () => {
    dispatch({ type: "ADD_TASK", payload: state.newTask });
  };

  const del = (index) => {
    dispatch({ type: "DELETE_TASK", payload: index });
  };

  return (
    <section className="flex justify-center items-center h-screen">
      <div className="w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%]">
        <Nav />

        <div className="bg-white max-h-44 overflow-scroll rounded-b-lg mb-8 md:mb-3">
          {state.tasks.length === 0 ? (
            <div className="no-task flex justify-center items-center py-4">
              <p className="text-sm">No Task Available</p>
            </div>
          ) : (
            <div>
              {state.tasks.map((task, index) => (
                <div className="py-3 px-4 flex items-center border-b-gray-100 font-light" key={index}>
                  <div className="task w-full">
                    <div className="task-header flex items-center">
                      <h1 className="mr-auto font-medium">{task.title}</h1>
                      <p className="text-xs font-medium">{task.dueDate}</p>
                    </div>
                    <div className="details mt-1 flex items-center">
                      <p className="mr-auto text-sm">{task.description}</p>
                      <img
                        src={Bin}
                        className="h-6 cursor-pointer"
                        alt="bucket icon"
                        onClick={() => del(index)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="input-form">
          <div className="w-full md:flex md:gap-3">
            <input
              className="w-full rounded-lg py-2 px-3 mb-3 border-none outline-none text-sm md:w-3/6"
              type="text"
              placeholder="Title"
              value={state.newTask.title}
              onChange={(e) =>
                dispatch({
                  type: "UPDATE_NEW_TASK",
                  payload: { title: e.target.value },
                })
              }
            />

            <input
              className="w-full rounded-lg py-2 px-3 mb-3 border-none outline-none text-sm md:w-3/6"
              type="text"
              name="description"
              placeholder="Description"
              value={state.newTask.description}
              onChange={(e) =>
                dispatch({
                  type: "UPDATE_NEW_TASK",
                  payload: { description: e.target.value },
                })
              }
            />

            <div className="due-date md:w-2/4">
              <input
                className="w-full rounded-lg py-3 px-3 mb-3 border-none outline-none text-xs text-[#a0a7b2]"
                type="date"
                id="due-date"
                name="due date"
                value={state.newTask.dueDate}
                onChange={(e) =>
                  dispatch({
                    type: "UPDATE_NEW_TASK",
                    payload: { dueDate: e.target.value },
                  })
                }
              />
            </div>
          </div>
          <div className="w-full flex justify-center items-center">
            <button className="btn bg-[#32d1ff] hover:bg-[#14e3ff] transition ease-in-out delay-140 w-full py-2 rounded-lg text-sm font-medium" type="submit" onClick={handleNewTask}>
              Create
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;