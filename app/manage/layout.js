import React from "react";
import AuthContainer from "../component/containers/AuthContainer";

const ManageLayout = ({ children }) => {
  return (
    <AuthContainer>
      {/* <Suspense fallback={<Loading />}>{children}</Suspense> */}
      <div className="mh-90">{children}</div>
    </AuthContainer>
  );
};
export default ManageLayout;
