const formatTime = (timeStr: string) => {
  const date = new Date(timeStr);
  return date.toLocaleString('zh-CN', { hour12: false }).replace(/\//g, '-');
};

const commonStyle = `
  color: #f5f7f9;
  font-family: "Times New Roman", "楷体"; 
  font-size: 15px;
  letter-spacing: 1px;
`;

export const getGitInfo = () => {
  const version = __GIT_VERSION__;
  const branch = __GIT_BRANCH__;
  const buildTime = formatTime(__BUILD_TIME__);
  console.info(
    `%c构建信息%c\n\n版本号: ${version}\n分支: ${branch}\n时间: ${buildTime}\n`,
    commonStyle + 'background: #186489; padding: 4px 8px; border-radius: 3px; font-weight: bold;`',
    commonStyle + 'line-height: 1.5;'
  );
};
