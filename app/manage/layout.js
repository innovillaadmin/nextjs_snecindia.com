import { SITENAME, SITE_DESCRIPTION } from "../config";
import AuthContainer from "../component/containers/AuthContainer";

const ManageLayout = ({ children }) => {
  return (
    <AuthContainer>
      {/* <Suspense fallback={<Loading />}>{children}</Suspense> */}
      {children}
    </AuthContainer>
  );
};
export default ManageLayout;
