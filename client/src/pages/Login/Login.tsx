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
import * as GSchema from "./schema";

import FormikField from "../../components/FormikField";
import { Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import * as Validation from "../../constant/Validation";
import hashPassword from "../../constant/hashPassword";
import { toast } from "react-toastify";
import {useAppDispatch,actions} from '../../redux'

type Props = {};

function Login({}: Props) {
    const [callLogin, { loading, error, data }] = useLazyQuery(GSchema.Login);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        if(data && data.login){
            const account = data.login as MyAccount;
            dispatch(actions.myAccount.setMyAccount(account))
            navigate("/account")
        }
    }, [data]);


    const initialValues = {
        account: "",
        password: "",
    };
    const validationSchema = Yup.object().shape({
        account: Validation.account,
        password: Validation.password,
    });

    async function onSubmit(values: typeof initialValues) {
        await toast.promise(handleLogin(values), {
            pending: "Đang tải",
            error: {
                render: (res: any) => res?.data?.message,
            },
            success: "Đăng nhập thành công",
        });
    }

    async function handleLogin(values: typeof initialValues) {
        const { account, password } = values;
        const hashedPassword = hashPassword(password);

        const variables = {
            data: {
                account,
                password: hashedPassword,
            },
        }
        await callLogin({
            variables
        });
    }

    return (
        <div className="Login">
            <img src={SnowMountain} alt="snow mountain" className="bg" />
            <div className="form">
                <h1 className="title">Đăng nhập</h1>
                <div className="content">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        <Form className="formContent">
                            <FormikField
                                name="account"
                                label="Tài khoản"
                                icon={<UserOutlined />}
                            />
                            <FormikField
                                name="password"
                                type="password"
                                label="Mật khẩu"
                                icon={<LockOutlined />}
                            />
                            <Button
                                htmlType="submit"
                                disabled={loading}
                                shape="round"
                                size="large"
                            >
                                Xác nhận
                            </Button>
                        </Form>
                    </Formik>
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
