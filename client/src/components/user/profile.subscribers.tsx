import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserItem } from "./user.item";
import { IUser } from "../../types/user";
import { getUserSubscribersAsync } from "../../helpers/requests/requests.subscribe";

enum DisplayedText {
  HEADER = "Subscribers:",
}

export const ProfileSubscribers: React.FC = () => {
  const { id } = useParams();
  const [users, setUsers] = useState<IUser[]>();

  useEffect(() => {
    if (id) {
      getUserSubscribersAsync(id).then((response) => {
        setUsers(response.data);
      });
    }
  }, [id]);

  return (
    <div className={"subscribers"}>
      <h2>{DisplayedText.HEADER}</h2>
      <hr />
      {users &&
        users?.length &&
        users.map((u: IUser) => {
          return <UserItem key={u.id} user={u} />;
        })}
    </div>
  );
};
