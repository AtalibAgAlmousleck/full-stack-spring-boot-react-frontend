import React from "react";
import Student from "./Student";

const StudentList = ({ data, currentPage, getAllStudents }) => {
  return (
    <main className="main">
      {data?.content?.length === 0 && <div>No data found.</div>}
      <ul className="contact__list">
        {data?.content?.length > 0 &&
          data.content.map((student) => 
            <Student student={student} key={student.id} />
          )}
      </ul>

      {/* handle the pagination */}
      {data?.content?.length > 0 && data?.totalPages > 1 && (
        <div className="pagination">
          <a
            onClick={() => getAllStudents(currentPage - 1)}
            className={0 === currentPage ? "disabled" : ""}
          >
            &laquo;
          </a>
          { data && [...Array(data.totalPages).keys()].map((page, index) => <a onClick={() => getAllStudents(page)} className={currentPage === page ? 'active' : ''} key={page}>{page + 1}</a>)}
          <a
            onClick={() => getAllStudents(currentPage + 1)}
            className={data.totalPages === currentPage + 1 ? "disabled" : ""}
          >
            &raquo;
          </a>
        </div>
      )}
    </main>
  );
};

export default StudentList;
