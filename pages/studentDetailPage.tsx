import React from "react";
import PageLayout from "../pageComponent/layout";
import StudentDetail from "../pageComponent/studentDetail";

function StudentDetailPage() {
  return (
    <>
      <PageLayout type="StudentDetail">
        <StudentDetail/>
      </PageLayout>
    </>
  );
}

export default StudentDetailPage;
