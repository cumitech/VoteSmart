import { Layout } from "antd";
const { Footer } = Layout;

const AppFooter = () => {
  return (
    <>
      <Footer style={{ textAlign: "center" }}>
        © {new Date().getFullYear()} VoterSmart — University of Bamenda. All
        rights reserved.
      </Footer>
    </>
  );
};

export default AppFooter;
