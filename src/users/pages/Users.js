import React from "react";
import UsersList from "../components/UsersList";

const Users = () => {
    const USERS = [
        { id: 'u1', image: 'https://44.media.tumblr.com/861e92925735e9f700eb2f236ae6c435/tumblr_ol3bsnt8rg1vni15go1_400.gif', name: 'Steve', placeCount: 3 },
        { id: 'u2', image: 'https://44.media.tumblr.com/861e92925735e9f700eb2f236ae6c435/tumblr_ol3bsnt8rg1vni15go1_400.gif', name: 'Greg', placeCount: 2 }
    ];
    return <UsersList items={USERS} />
};

export default Users;