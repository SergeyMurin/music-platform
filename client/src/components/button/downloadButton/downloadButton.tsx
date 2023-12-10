import React from "react";
import downloadIcon from "../../../assets/player/download-icon.svg";
import { downloadTrackAsync } from "../../../helpers/requests/tracksRequests";
import { createBlob, downloadBlob } from "../../../helpers/helpers";

type Props = {
  trackId: string;
  fileName: string;
  url?: string;
};

export const DownloadButton: React.FC<Props> = ({ trackId, fileName, url }) => {
  const handleDownload = async () => {
    try {
      const response = await downloadTrackAsync(trackId);
      const blob = createBlob(response.data, "audio/mpeg");
      downloadBlob(blob, fileName);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button>
      <a href={url} download={fileName}>
        <img
          src={downloadIcon}
          className={"btn_action"}
          // onClick={handleDownload}
          alt={"download"}
        />
      </a>
    </button>
  );
};
