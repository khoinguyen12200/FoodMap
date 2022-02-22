import React from "react";
import { AiOutlineMail, AiOutlinePhone, AiOutlineUser } from "react-icons/ai";
import { VscSymbolNamespace } from "react-icons/vsc";
import { FaRegAddressCard } from "react-icons/fa";
import { actions, useAppDispatch, useAppSelector } from "../../redux";
import "./Account.scss";
import { Link } from "react-router-dom";
import EditInfo from "./EditInfo";
import ImageUploader from "../../components/ImageUploader";
import AvatarEditor from "./AvatarEditor";
import PasswordEditor from "./PasswordEditor";

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

    const [showInfo, setInfo] = React.useState(false);
    function toggleInfo() {
        setInfo(!showInfo);
    }

    const [showAvatar, setShowAvater] = React.useState(false);
    function toggleAvatar() {
        setShowAvater(!showAvatar);
    }

    const [showPassword, setShowPassword] = React.useState(false);
    function togglePassword() {
        setShowPassword(!showPassword);
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
                                <td className="content">{user.email || ""}</td>
                            </tr>
                            <tr className="infoRow">
                                <td className="icon">
                                    <AiOutlinePhone />
                                </td>
                                <td className="content">{user.phone || ""}</td>
                            </tr>
                            <tr className="infoRow">
                                <td className="icon">
                                    <FaRegAddressCard />
                                </td>
                                <td className="content">
                                    {user.address || ""}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="actions">
                    <Link to="/my-restaurant" className="action">
                        Doanh nghiệp
                    </Link>
                    <button onClick={toggleInfo} className="action">
                        Sửa thông tin
                    </button>
                    <EditInfo
                        user={user}
                        isShow={showInfo}
                        toggle={toggleInfo}
                    />

                    <button onClick={toggleAvatar} className="action">
                        Đổi ảnh đại diện
                    </button>
                    <AvatarEditor isShow={showAvatar} onClose={toggleAvatar} />

                    <button onClick={togglePassword} className="action">
                        Đổi mật khẩu
                    </button>
                    <PasswordEditor
                        isShow={showPassword}
                        toggle={togglePassword}
                    />

                    <button onClick={logout} className="action">
                        Đăng xuất
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Account;
