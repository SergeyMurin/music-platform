import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserItem } from "./UserItem";
import { IUser } from "../../types/user";
import { getUserSubscribersAsync } from "../../helpers/requests/subscribeRequests";
import { Simulate } from "react-dom/test-utils";
import error = Simulate.error;

enum DisplayedText {
  HEADER = "Subscribers:",
}

export const ProfileSubscribers: React.FC = () => {
  const { id } = useParams();
  const [users, setUsers] = useState<IUser[]>();

  const profileSubscribersEffect = () => {
    if (!id) return;
    const profileSubscribersEffectAsync = async () => {
      const response = await getUserSubscribersAsync(id);
      setUsers(response.data);
    };

    profileSubscribersEffectAsync().catch((error) => console.error(error));
  };

  useEffect(profileSubscribersEffect, [id]);

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
