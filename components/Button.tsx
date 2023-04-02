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
