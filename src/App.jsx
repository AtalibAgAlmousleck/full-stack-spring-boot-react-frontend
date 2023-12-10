import React, { useEffect, useRef, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
// Imported components
import Header from "./components/Header";
import StudentList from "./components/StudentList";
import { getStudents, saveStudent, updatePhoto } from "./api/StudentService";
import StudentDetails from "./components/StudentDetails";

function App() {
  const modelRef = useRef();
  const fileRef = useRef();
  const [data, setData] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [file, setFile] = useState(undefined);
  const [values, setValues] = useState({
    name: "",
    email: "",
    title: "",
    phone: "",
    address: "",
    status: "",
  });

  const getAllStudents = async (page = 0, size = 8) => {
    try {
      setCurrentPage(page);
      const { data } = await getStudents(page, size);
      setData(data);
      // console.log(data);
    } catch (error) {
      console.log(error);
      // fileRef.current.value = null;
    }
  };

  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSaveNewStudent = async (event) => {
    event.preventDefault();
    try {
      const { data } = await saveStudent(values);
      const formData = new FormData();
      formData.append("file", file, file.name);
      formData.append("id", data.id);
      const { data: photoUrl } = await updatePhoto(formData);
      toggleModal(false);
      console.log(photoUrl);
      setFile(undefined);
      fileRef.current.value = null;
      setValues({
        name: "",
        email: "",
        title: "",
        phone: "",
        address: "",
        status: "",
      });
      getAllStudents();
    } catch (error) {
      console.log(error);
    }
  };

  const updateStudent = async (student) => {
    try {
      const { data } = await saveStudent(student);
    } catch (error) {
      console.log(error);
    }
  };

  const updateImage = async (formData) => {
    try {
      const { data: photoUrl } = await updatePhoto(formData);
    } catch (error) {
      console.log(error);
    }
  };

  //toggle modal function
  const toggleModal = (show) =>
    show ? modelRef.current.showModal() : modelRef.current.close();

  useEffect(() => {
    getAllStudents();
  }, []);
  return (
    <>
      <Header toggleModal={toggleModal} nbOfStudents={data.totalElements} />
      <main className="main">
        <div className="container">
          <Routes>
            <Route path="/" element={<Navigate to={"/api/v1/students"} />} />
            <Route
              path="/api/v1/students"
              element={
                <StudentList
                  data={data}
                  currentPage={currentPage}
                  getAllStudents={getAllStudents}
                />
              }
            />
            <Route
              path="/api/v1/students/:id"
              element={
                <StudentDetails
                  updateStudent={updateStudent}
                  updateImage={updateImage}
                />
              }
            />
          </Routes>
        </div>
      </main>

      {/* Modal code */}
      <dialog ref={modelRef} className="modal" id="modal">
        <div className="modal__header">
          <h3>New Student</h3>
          <i onClick={() => toggleModal(false)} className="bi bi-x-lg"></i>
        </div>
        <div className="divider"></div>
        <div className="modal__body">
          <form onSubmit={handleSaveNewStudent}>
            <div className="user-details">
              <div className="input-box">
                <span className="details">Name</span>
                <input
                  type="text"
                  value={values.name}
                  onChange={onChange}
                  name="name"
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Email</span>
                <input
                  type="email"
                  value={values.email}
                  onChange={onChange}
                  name="email"
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Title</span>
                <input
                  type="text"
                  value={values.title}
                  onChange={onChange}
                  name="title"
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Phone Number</span>
                <input
                  type="text"
                  value={values.phone}
                  onChange={onChange}
                  name="phone"
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Address</span>
                <input
                  type="text"
                  value={values.address}
                  onChange={onChange}
                  name="address"
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Account Status</span>
                <input
                  type="text"
                  value={values.status}
                  onChange={onChange}
                  name="status"
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Profile image</span>
                <input
                  type="file"
                  onChange={(event) => setFile(event.target.files[0])}
                  ref={fileRef}
                  name="photo"
                  required
                />
              </div>
            </div>
            <div className="form_footer">
              <button
                onClick={() => toggleModal(false)}
                type="button"
                className="btn btn-danger"
              >
                Cancel
              </button>
              <button type="submit" className="btn">
                Save
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
}

export default App;
