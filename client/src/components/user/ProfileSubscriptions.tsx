import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IUser } from "../../types/user";
import { getUserSubscriptionsAsync } from "../../helpers/requests/subscribeRequests";
import { UserItem } from "./UserItem";
import { Simulate } from "react-dom/test-utils";
import error = Simulate.error;

export const ProfileSubscriptions: React.FC = () => {
  const { id } = useParams();
  const [users, setUsers] = useState<IUser[]>();

  const profileSubscriptionsEffect = () => {
    if (!id) return;
    const profileSubscriptionsEffectAsync = async () => {
      const response = await getUserSubscriptionsAsync(id);
      setUsers(response.data);
    };
    profileSubscriptionsEffectAsync().catch((error) => console.error(error));
  };

  useEffect(profileSubscriptionsEffect, [id]);

  return (
    <div className={"subscriptions"}>
      <h2>Subscriptions:</h2>
      <hr />
      {users &&
        users?.length &&
        users.map((u: IUser) => {
          return <UserItem key={u.id} user={u} />;
        })}
    </div>
  );
};
