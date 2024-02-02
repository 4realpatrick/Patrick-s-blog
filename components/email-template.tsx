import React from "react";

interface IEmailTemplateProps {
  username: string;
  confirmLink: string;
}

const EmailTemplate: React.FC<Readonly<IEmailTemplateProps>> = ({
  username,
  confirmLink,
}) => {
  return (
    <div>
      <h1 style={{ fontSize: "30px" }}>
        你好{`,${username}`},欢迎来到patrick的个人博客
      </h1>
      点击{" "}
      <a style={{ color: "#00AEEC" }} href={confirmLink}>
        这里
      </a>{" "}
      激活你的邮箱
    </div>
  );
};

export default EmailTemplate;
