import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "./userPage";
import UsersList from "./usersList";

const usersLayout = () => {
    const params = useParams();
    const { userId } = params;

    return <>{userId ? <UserPage userId={userId} /> : <UsersList />}</>;
};

export default usersLayout;
