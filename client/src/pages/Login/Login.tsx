import React from "react";
import { Input, Button, Divider } from "antd";
import {
    LockOutlined,
    ArrowLeftOutlined,
    EditOutlined,
} from "@ant-design/icons";
import { UserOutlined } from "@ant-design/icons";
import SnowMountain from "../../assets/pictures/snowmountain.png";

import { Link, useNavigate } from "react-router-dom";

import "./Login.scss";
import { useLazyQuery } from "@apollo/client";
import * as GSchema from './schema'

type Props = {};

function Login({}: Props) {
    const [login, { loading, error, data }] = useLazyQuery(GSchema.Login);
    const navigate = useNavigate();

    React.useEffect(() => {
        login({
            variables: {
                data:{
                    account: "admin",
                    password: "admin",
                }
            }
        })
    },[])
    console.log("test login",data,loading,error)

    return (
        <div className="Login">
            <img src={SnowMountain} alt="snow mountain" className="bg" />
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
                        type="dashed"
                        onClick={() => navigate(-1)}
                        shape="round"
                        icon={<ArrowLeftOutlined />}
                    >
                        Quay lại
                    </Button>
                    <Link to="/register">
                        <Button
                            type="dashed"
                            shape="round"
                            icon={<EditOutlined />}
                        >
                            Đăng ký
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
