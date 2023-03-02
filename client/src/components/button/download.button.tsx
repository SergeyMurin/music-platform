import React from "react";
import downloadIcon from "../../assets/player/download-icon.svg";
import { downloadTrackAsync } from "../../helpers/requests/tracksRequests";
import { createBlob, downloadBlob } from "../../helpers/helpers";

type Props = {
  trackId: string;
  fileName: string;
};

export const DownloadButton: React.FC<Props> = ({ trackId, fileName }) => {
  const handleDownload = async () => {
    try {
      const data = await downloadTrackAsync(trackId);
      const blob = createBlob(data.data, "audio/mpeg");
      downloadBlob(blob, fileName);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <img
      src={downloadIcon}
      className={"btn_action"}
      onClick={handleDownload}
      alt={"download"}
    />
  );
};
