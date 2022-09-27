import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BASE_URL } from "../../data/baseURL";
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
    fetch(`${BASE_URL}`)
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          setTodosData(result.data);
        }
      });
  }, [number]);

  const onSubmit = (data, e) => {
    fetch(`${BASE_URL}`, {
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
    <section className="vh-100 vw-100 d-flex justify-content-center align-items-center bg-dark">
      <div className="list-width list-shadow">
        <h1 className="text-center pt-3 pb-5">Todo List</h1>
        <div className="">
          <div className="">
            <div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-group">
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
                  <span className="text-danger" style={{ fontSize: "16px" }}>
                    Title required
                  </span>
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
