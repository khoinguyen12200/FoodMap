import React from "react";
import { Input, Button, Divider } from "antd";
import {
    LockOutlined,
    ArrowLeftOutlined,
    EditOutlined,
} from "@ant-design/icons";
import { UserOutlined } from "@ant-design/icons";

import { Link, useNavigate } from "react-router-dom";

import "./Login.scss";

type Props = {};

function Login({}: Props) {
    const navigate = useNavigate();
    return (
        <div className="Login">
            <div className="form">
                <h1 className="title">Đăng nhập</h1>
                <div className="content">
                    <Input
                        size="large"
                        placeholder="Account"
                        prefix={<UserOutlined />}
                    />
                    <Input.Password
                        size="large"
                        placeholder="Password"
                        prefix={<LockOutlined />}
                    />
                    <Button shape="round" size="large">
                        Xác nhận
                    </Button>
                </div>
                <Divider />
                <div className="btnSpace">
                    <Button
                        onClick={() => navigate(-1)}
                        shape="round"
                        icon={<ArrowLeftOutlined />}
                    >
                        Quay lại
                    </Button>
                    <Link to="/register">
                        <Button shape="round" icon={<EditOutlined />}>
                            Đăng ký
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
