import React from "react";
import PageLayout from "../pageComponent/layout";
import TeachersList from "../pageComponent/teacherList";

function TeacherListPage() {
  return (
    <>
      <PageLayout>
        <TeachersList/>
      </PageLayout>
    </>
  );
}

export default TeacherListPage;
