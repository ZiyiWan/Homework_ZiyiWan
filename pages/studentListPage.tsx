import React from "react";
import PageLayout from "../pageComponent/layout";
import StudentList from "../pageComponent/studentList";

function StudentListPage() {
  return (
    <>
      <PageLayout>
        <StudentList />
      </PageLayout>
    </>
  );
}

export default StudentListPage;
