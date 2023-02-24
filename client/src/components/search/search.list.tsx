import React, { useState } from "react";
import { TrackItem } from "../track/track.item";
import { isTrackTypeGuard, ITrack } from "../../types/track";
import { isUserTypeGuard, IUser } from "../../types/user";
import { UserItem } from "../user/user.item";

type Types = ITrack | IUser;

type Props = {
  list: [] | any;
  displayedCount: number;
};

export const SearchList: React.FC<Props> = ({ list, displayedCount }) => {
  const [showAll, setShowAll] = useState(false);

  const handleShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <>
      {!list?.length && <h2>No matches</h2>}
      {!showAll && list && list.length > displayedCount && (
        <button onClick={handleShowAll}>Show All</button>
      )}
      {showAll && list && list.length > displayedCount && (
        <button onClick={handleShowAll}>Hide</button>
      )}
      {list &&
        list
          .slice(0, showAll ? list.length : displayedCount)
          .map((i: Types) => {
            if (isTrackTypeGuard(i)) {
              return <TrackItem track={i} key={i.id} tracks={list} />;
            }
            if (isUserTypeGuard(i)) {
              return <UserItem user={i} key={i.id} />;
            }
            return <></>;
          })}
    </>
  );
};
