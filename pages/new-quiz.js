import Menu from "@/components/dashboard/menu";
import Layout from "@/components/layout";
import React, { useState } from "react";
import NewQuiz from "@/components/new-quiz/new-quiz"
// import { getServerSession } from "next-auth";
// import { NextAuth } from "@/pages/api/[...nextauth]";

function NewQuizPage() {
  return (
    <Layout pageTitle="New Quiz | Dashboard">
      <div className="dashboard bg-[#212121] h-screen bg-center bg-cover bg-no-repeat flex items-center">
        <Menu currentPath={"New Quiz"} />
        <div className="main-container">
          <NewQuiz />
        </div>
      </div>
    </Layout>
  );
}

export default NewQuizPage;
