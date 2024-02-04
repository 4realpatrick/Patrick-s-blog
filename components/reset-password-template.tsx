import React from "react";

interface IResetPasswordTemplateProps {
  username: string;
  confirmLink: string;
}

const ResetPasswordTemplate: React.FC<
  Readonly<IResetPasswordTemplateProps>
> = ({ username, confirmLink }) => {
  return (
    <div>
      <h1 style={{ fontSize: "30px" }}>你好{`,${username}`}</h1>
      点击{" "}
      <a style={{ color: "#00AEEC" }} href={confirmLink}>
        这里
      </a>{" "}
      重制账户密码
    </div>
  );
};

export default ResetPasswordTemplate;
