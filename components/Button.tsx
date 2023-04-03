"use client";

import FileSaver from "file-saver";

const Button = ({ imageUrl }: { imageUrl: string }) => {
  return (
    <button
      className="btn mt-2"
      onClick={() => FileSaver.saveAs(imageUrl, imageUrl)}
    >
      Download
    </button>
  );
};
export default Button;

// interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
//   children: React.ReactNode;
// }

// const ButtonExample = ({ children, ...props }: Props) => {
//   return <button {...props}>{children}</button>;
// };
