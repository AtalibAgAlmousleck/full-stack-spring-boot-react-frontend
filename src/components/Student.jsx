import React from "react";
import { Link } from "react-router-dom";

const Student = ({ student }) => {
  return (
    <Link to={`/api/v1/students/${student.id}`} className="contact__item">
      <div className="contact__header">
        <div className="contact__image">
          <img src={student.photoUrl} alt={student.name} />
        </div>
        <div className="contact__details">
          <p className="contact_name">{student.name.substring(0, 15)} </p>
          <p className="contact_title">{student.title}</p>
        </div>
      </div>
      <div className="contact__body">
        <p>
          <i className="bi bi-envelope"></i>
          {student.email.substring(0, 15)}
        </p>
        <p>
          <i className="bi bi-geo"></i>
          {student.address}
        </p>
        <p>
          <i className="bi bi-telephone"></i>
          {student.phone}
        </p>
        <p>
          {student.status === "Active" ? (
            <i className="bi bi-check-circle"></i>
          ) : (
            <i className="bi bi-x-circle"></i>
          )}
          {student.status}
        </p>
      </div>
    </Link>
  );
};

export default Student;
