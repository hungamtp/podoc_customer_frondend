import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Image from "next/image";
export interface ILoadingPromptProps {}

export default function LoadingPrompt(props: ILoadingPromptProps) {
  return (
    <div>
      <div id="preloader">
        <div id="status">
          <div className="spinner">
            <div className="double-bounce1"></div>
            <div className="double-bounce2"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
