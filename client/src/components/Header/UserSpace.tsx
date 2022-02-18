import React from "react";
import { Link } from "react-router-dom";

type Props = {
    user: User;
};

function UserSpace({ user }: Props) {
    return (
        <Link to="/account" className="userSpace navItem">
            <div className="userName">{user.name}</div>
            <div className="avatarContainer">
                <img
                    src={(process.env.REACT_APP_SERVER_ENDPOINT + user.avatar)}
                    alt="avatar"
                    className="avatar"
                />
            </div>
        </Link>
    );
}

export default UserSpace;
