import Menu from "@/components/dashboard/menu";
import Layout from "@/components/layout";
import React, { useState } from "react";
import Export from "@/components/export"
import Cookies from "universal-cookie";
import Link from "next/link";

const cookies = new Cookies();
const token = cookies.get("TOKEN");

function ExportPage() {
  return (
    <Layout pageTitle="Export | Dashboard">
      <div className="dashboard bg-[#212121] h-screen bg-center bg-cover bg-no-repeat flex items-center">
        {token ? (
          <>
            <Menu currentPath={"Export"} />
            <div className="main-container">
              <div className="content">
                <Export />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="main-container">
              <div className="content">
                <p>You are not logged in. Please log in to continue.</p>
                <Link href="/login">Log In</Link>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}

export default ExportPage;
