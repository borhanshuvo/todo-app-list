import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Todo from "./todo";

const TodoList = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [todosData, setTodosData] = useState([]);
  const [number, setNumber] = useState(0);

  useEffect(() => {
    fetch("http://localhost:3000/api/todoCreate")
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          setTodosData(result.data);
        }
      });
  }, [number]);

  const onSubmit = (data, e) => {
    fetch("http://localhost:3000/api/todoCreate", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          e.target.reset();
          setNumber(number + 1);
        }
      });
  };

  return (
    <section className="vh-100 vw-100 d-flex justify-content-center align-items-center">
      <div className="w-50">
        <h1 className="text-center">Todo List App</h1>
        <div className="">
          <div className="">
            <div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Write here..."
                    {...register("title", { required: true })}
                  />
                  <input
                    type="submit"
                    className="btn btn-primary"
                    id="button-addon2"
                    value="Add"
                  />
                </div>
                {errors.title && (
                  <span className="text-danger">Title required</span>
                )}
              </form>
            </div>

            {todosData?.map((data, index) => (
              <Todo key={index} setNumber={setNumber} todoData={data} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TodoList;
