import React from "react";
import { useAuth } from "../../features/auth/AuthProvider";
import {
    useGetCurrentUserQuery,
    useUpdateCurrentUserMutation
} from "../../features/users/usersApi";

interface Props {
    // Define your props here
}

const GreetingCard = (props: Props) => {
    const { user, signOut } = useAuth();
    const { data: profileData, refetch } = useGetCurrentUserQuery(undefined, {
        skip: !user
    });
    const username = profileData?.displayName;
    return (
        <div>
            <h1>
                Hello <span>{username}</span>
            </h1>
        </div>
    );
};

export default GreetingCard;
