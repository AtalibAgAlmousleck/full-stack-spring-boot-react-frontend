import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getStudent } from "../api/StudentService";

const StudentDetails = ({ updateStudent, updateImage }) => {
  const inputRef = useRef();
  const [student, setStudent] = useState({
    id: "",
    name: "",
    email: "",
    title: "",
    phone: "",
    address: "",
    status: "",
    photoUrl: "",
  });

  const { id } = useParams();

  const fetchStudent = async (id) => {
    try {
      const { data } = await getStudent(id);
      setStudent(data);
    } catch (error) {
      console.log(error);
    }
  };

  const selectIage = () => {
    inputRef.current.click();
  };

  const updatePhoto = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file, file.name);
      formData.append("id", id);
      await updateImage(formData);
      setStudent((prev) => ({
        ...prev,
        photoUrl: `${prev.photoUrl}?updated_at=${new Date().getTime()}`,
      }));
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (event) => {
    setStudent({ ...student, [event.target.name]: event.target.value });
  };

  const onUpdate = async (event) => {
    event.preventDefault();
    await updateStudent(student);
    fetchStudent(id);
  };

  useEffect(() => {
    fetchStudent(id);
  }, []);
  return (
    <>
      <Link to={"/"} className="link">
        <i className="bi bi-arrow-left"></i> Back to home
      </Link>
      <div className="profile">
        <div className="profile__details">
          <img
            src={student.photoUrl}
            alt={`Profile image of ${student.name}`}
          />
          <div className="profile__metadata">
            <p className="profile__name">{student.name}</p>
            <p className="profile__muted">JPG, GIF, or PNG. Max size of 10MG</p>
            <button onClick={selectIage} className="btn">
              <i className="bi bi-cloud-upload"></i> Change profile
            </button>
          </div>
        </div>
        {/* Profile details */}
        <div className="profile__settings">
          <div>
            <form onSubmit={onUpdate} className="form">
              <div className="user-details">
                <input
                  type="hidden"
                  defaultValue={student.id}
                  name="id"
                  required
                />
                <div className="input-box">
                  <span className="details">Name</span>
                  <input
                    type="text"
                    value={student.name}
                    name="name"
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="input-box">
                  <span className="details">Email</span>
                  <input
                    type="email"
                    value={student.email}
                    name="email"
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="input-box">
                  <span className="details">Tile</span>
                  <input
                    type="text"
                    value={student.title}
                    name="tile"
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="input-box">
                  <span className="details">Phone</span>
                  <input
                    type="text"
                    value={student.phone}
                    name="phone"
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="input-box">
                  <span className="details">Address</span>
                  <input
                    type="text"
                    value={student.address}
                    name="address"
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="input-box">
                  <span className="details">Status</span>
                  <input
                    type="text"
                    value={student.status}
                    name="status"
                    onChange={onChange}
                    required
                  />
                </div>
              </div>
              <div className="form_footer">
                <button type="submit" className="btn">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <form style={{ display: "none" }}>
        <input
          type="file"
          ref={inputRef}
          onChange={(event) => updatePhoto(event.target.files[0])}
          name="file"
          accept="image/*"
        />
      </form>
    </>
  );
};

export default StudentDetails;
