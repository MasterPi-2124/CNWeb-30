import LogInForm from "@/components/auth/log-in";
import Layout from "@/components/layout";
import React, { useEffect } from "react";

function LoginPage() {
  return (
    <Layout pageTitle="Log In | CNWeb">
      <div className="log-in bg-background-1 h-screen bg-center bg-cover bg-no-repeat flex items-center justify-center">
        <LogInForm />
      </div>
    </Layout>
  );
}

export default LoginPage;
