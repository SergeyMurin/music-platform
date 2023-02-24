import React from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import axios from "axios";
import downloadIcon from "../../assets/player/download-icon.svg";
import { ClientConfig } from "../../client.config";

type Props = {
  track_id: string;
  fileName: string;
};

export const DownloadButton: React.FC<Props> = ({ track_id, fileName }) => {
  const { token } = useTypedSelector((state) => state.user);
  const handleDownload = async () => {
    const response = await axios.get(
      `${ClientConfig.server_uri}/track/download`,
      {
        params: { id: track_id },
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const byteArray = new Uint8Array(response.data.data);
    const blob = new Blob([byteArray], { type: "audio/mpeg" });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
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
