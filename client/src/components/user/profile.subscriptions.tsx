import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IUser } from "../../types/user";
import {
  getUserSubscribersAsyncQ,
  getUserSubscriptionsAsync,
  getUserSubscriptionsAsyncQ,
} from "../../requests/subscribe";
import { UserItem } from "./user.item";

export const ProfileSubscriptions: React.FC = () => {
  const { id } = useParams();
  const [users, setUsers] = useState<IUser[]>();

  useEffect(() => {
    if (id) {
      getUserSubscriptionsAsyncQ(id).then((response) => {
        setUsers(response.data);
      });
    }
  }, [id]);

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
