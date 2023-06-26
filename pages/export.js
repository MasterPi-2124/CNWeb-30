import Menu from "@/components/dashboard/menu";
import Layout from "@/components/layout";
import React, { useState } from "react";
import Export from "@/components/export"

function ExportPage() {
  return (
    <Layout pageTitle="Export | Dashboard">
      <div className="dashboard bg-[#212121] h-screen bg-center bg-cover bg-no-repeat flex items-center">
        <Menu currentPath={"Export"} />
        <div className="main-container">
          <div className="content">
            <Export />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ExportPage;
