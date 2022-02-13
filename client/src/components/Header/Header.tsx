import React from "react";
import { Link } from "react-router-dom";
import { Switch } from "antd";
import { BsFillSunFill } from "react-icons/bs";
import { BsFillMoonStarsFill } from "react-icons/bs";

import LogoBlack from "../../assets/logos/logo_black.png";
import LogoWhite from "../../assets/logos/logo_white.png";
import "./Header.scss";
import { actions, useAppDispatch, useAppSelector } from "../../redux";
import UnderLine from "../Underline";
import { motion } from "framer-motion";

type Props = {};

const Header = (props: Props) => {
    const theme = useAppSelector((state) => state.theme);
    const isEmpty = useAppSelector((state) => state.pageSetting.isEmpty);
    const dispatch = useAppDispatch();
    function toggleTheme() {
        dispatch(actions.theme.toggleTheme());
    }
    return (
        <div className="header">
            <motion.div
                animate={{height:isEmpty ? 0 : "auto"}}
                transition={{duration:0.3}}
                className="content"
            >
                {!isEmpty && <UnderLine listenClassName="navItem" />}

                <div className="main">
                    <div className="logo">
                        <img
                            src={
                                LogoWhite
                            }
                            alt="logo"
                        />
                    </div>
                    <Link className="navItem" to="/">
                        Trang chủ
                    </Link>
                    <Link className="navItem" to="/map">
                        Bản đồ
                    </Link>
                    <Link className="navItem" to="/information">
                        Thông tin
                    </Link>
                </div>
                <div className="extra">
                    <Link className="navItem" to="/login">
                        Đăng nhập
                    </Link>
                    <div className="themeBtn">
                        <Switch
                            checkedChildren={<BsFillSunFill className="icon" />}
                            unCheckedChildren={
                                <BsFillMoonStarsFill className="icon" />
                            }
                            onClick={() => toggleTheme()}
                            checked={theme.color === "light"}
                        />
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Header;
