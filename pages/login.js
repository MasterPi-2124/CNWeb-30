import LogInForm from "@/components/auth/log-in";
import Layout from "@/components/layout";
import React, { useEffect } from "react";

function StakingPage() {
  return (
    <Layout pageTitle="Sign In | CNWeb">
      <div className="log-in bg-background-1 h-screen bg-center bg-cover bg-no-repeat">
        <LogInForm />
      </div>
    </Layout>
  );
}

export default StakingPage;
