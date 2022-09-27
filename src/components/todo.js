import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";

const Todo = ({ todoData, setNumber }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [mark, setMark] = useState(false);

  const handleUpdate = (data) => {
    console.log(data);
    const { id, title } = data;
    fetch("https://todo-app-list-borhanshuvo.vercel.app/api/todoCreate", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ id, title }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          setNumber((prevState) => prevState + 1);
        }
      });
  };

  const handleDelete = (id) => {
    fetch("https://todo-app-list-borhanshuvo.vercel.app/api/todoCreate", {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ id }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          setNumber((prevState) => prevState + 1);
        }
      });
  };
  return (
    <div className="d-flex">
      <div className="p-2 flex-grow-1">
        <input
          type="checkbox"
          className="cursor-pointer"
          onClick={() => setMark(!mark)}
        />
        <span className={`ms-2 ${mark ? "line-through" : ""}`}>
          {todoData?.title}
        </span>
      </div>
      <div className="p-2">
        <FiEdit
          className="text-primary cursor-pointer"
          size={24}
          data-bs-toggle="modal"
          data-bs-target={`#editModal${todoData?._id}`}
        />
      </div>
      <div
        className="p-2"
        data-bs-toggle="modal"
        data-bs-target={`#deleteModal${todoData?._id}`}
      >
        <AiFillDelete className="text-danger cursor-pointer" size={24} />
      </div>
      {/* edit modal */}
      <div
        className="modal fade"
        id={`editModal${todoData?._id}`}
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Are you want to Edit?
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={handleSubmit(handleUpdate)}>
              <div className="modal-body">
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={todoData?.title}
                    {...register("title", { required: true })}
                  />
                  <input
                    type="hidden"
                    defaultValue={todoData?._id}
                    {...register("id")}
                  />
                </div>
                {errors.title && (
                  <span className="text-danger">Title required</span>
                )}
              </div>
              <div className="modal-footer">
                <p className="btn btn-secondary" data-bs-dismiss="modal">
                  Close
                </p>
                <input
                  type="submit"
                  className="btn btn-primary"
                  value="Save Changes"
                  data-bs-dismiss="modal"
                />
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* detete modal */}
      <div
        className="modal fade"
        id={`deleteModal${todoData?._id}`}
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <h5 className="modal-title" id="exampleModalLabel">
                Are you want to delete {todoData?.title}?
              </h5>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
              >
                No
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={() => handleDelete(todoData?._id)}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
