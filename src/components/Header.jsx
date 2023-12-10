import React from "react";

const Header = ({ toggleModal, nbOfStudents }) => {
  return (
    <header className="header">
      <div className="container">
        <h3>Student List ({nbOfStudents})</h3>
        <button onClick={() => toggleModal(true)} className="btn">
          <i className="bi bi-plus-square"></i> Add New Student
        </button>
      </div>
    </header>
  );
};

export default Header;
