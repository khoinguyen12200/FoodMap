import React from "react";
import { AiOutlineMail, AiOutlinePhone, AiOutlineUser } from "react-icons/ai";
import { VscSymbolNamespace } from "react-icons/vsc";
import { FaRegAddressCard } from "react-icons/fa";
import { actions, useAppDispatch, useAppSelector } from "../../redux";
import "./Account.scss";
import { Link } from "react-router-dom";

type Props = {};

function Account({}: Props) {
    const user = useAppSelector((state) => state.myAccount.user);

    const dispatch = useAppDispatch();
    function logout() {
        const confirm = window.confirm("Bạn có muốn đăng xuất không ?");
        if (confirm) {
            dispatch(actions.myAccount.logout());
        }
    }

    if (!user) {
        return null;
    }
    return (
        <div className="Account">
            <div className="InfoSpace">
                <div className="avatarContainer">
                    <img
                        src={
                            process.env.REACT_APP_SERVER_ENDPOINT + user.avatar
                        }
                    />
                </div>
                <div className="userInfo">
                    <table>
                        <tbody>
                            <tr className="infoRow">
                                <td className="icon">
                                    <AiOutlineUser />
                                </td>
                                <td className="content">{user.account}</td>
                            </tr>
                            <tr className="infoRow">
                                <td className="icon">
                                    <VscSymbolNamespace />
                                </td>
                                <td className="content">{user.name}</td>
                            </tr>

                            <tr className="infoRow">
                                <td className="icon">
                                    <AiOutlineMail />
                                </td>
                                <td className="content">{user.email || "?"}</td>
                            </tr>
                            <tr className="infoRow">
                                <td className="icon">
                                    <AiOutlinePhone />
                                </td>
                                <td className="content">{user.phone || "?"}</td>
                            </tr>
                            <tr className="infoRow">
                                <td className="icon">
                                    <FaRegAddressCard />
                                </td>
                                <td className="content">
                                    {user.address || "?"}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="actions">
                    <Link className="action" to="/account/edit">
                        Sửa thông tin
                    </Link>
                    <Link className="action" to="/account/edit">
                        Đổi ảnh đại diện
                    </Link>
                    <Link className="action" to="/account/edit">
                        Đổi mật khẩu
                    </Link>
                    <button onClick={logout} className="action">
                        Đăng xuất
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Account;
