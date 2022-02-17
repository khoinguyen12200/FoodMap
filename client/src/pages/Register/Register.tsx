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
import FormikField from "../../components/FormikField";
import { Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import * as Validation from "../../constant/Validation";
import { ImagePicker } from "../../components/ImageUploader";

import "./Register.scss";
import Toast, { toast } from "react-toastify";
import { useLazyQuery, useMutation } from "@apollo/client";
import * as GSchema from "./schema";

type Props = {};

function Register({}: Props) {
    const navigate = useNavigate();

    const [callRegister, { data, loading, error }] = useMutation(
        GSchema.REGISTER
    );

    const [avatar, setAvatar] = React.useState<File | null>(null);
    function onSubmitAvatar(file: File) {
        setAvatar(file);
    }

    const initialValues = {
        name: "",
        account: "",
        password: "",
        confirmPassword: "",
    };

    const schema = Yup.object().shape({
        name: Validation.name,
        account: Validation.account,
        password: Validation.password,
        confirmPassword: Yup.string()
            .required("Confirm password is required")
            .oneOf([Yup.ref("password"), null], "Passwords must match"),
    });

    async function onFormikSubmit(
        values: typeof initialValues,
        actions: FormikHelpers<typeof initialValues>
    ) {
        actions.setSubmitting(true);
        await toast.promise(sendForm(values), {
            pending: "Đang tải",
            error: {
                render: (res: any) => res?.data?.message,
            },
            success: "Đăng ký thành công",
        });

        actions.setSubmitting(false);
    }

    async function sendForm(values: typeof initialValues): Promise<void> {
        if (!avatar) {
            throw new Error("Hãy chọn ảnh đại diện");
        }

        const { confirmPassword,password, ...data } = values;
        const hashedPassword = Validation.hashPassword(password);
        const variables = {
            data: {
                ...data,
                password:hashedPassword,
                file: avatar,
            },
        };
        await callRegister({
            variables: variables,
        });
    }

    return (
        <div className="Register">
            <img src={SnowMountain} alt="snow mountain" className="bg" />
            <div className="form">
                <h1 className="title">Đăng ký</h1>
                <div className="content">
                    <Formik
                        enableReinitialize={true}
                        initialValues={initialValues}
                        validationSchema={schema}
                        onSubmit={onFormikSubmit}
                    >
                        <Form>
                            <FormikField name="name" label="Tên người dùng" />
                            <FormikField name="account" label="Tên đăng nhập" />
                            <FormikField
                                name="password"
                                label="Mật khẩu"
                                type="password"
                            />
                            <FormikField
                                name="confirmPassword"
                                label="Nhập lại mật khẩu"
                                type="password"
                            />
                            <div className="imgInput">
                                <ImagePicker
                                    onSubmit={onSubmitAvatar}
                                    label="Ảnh đại diện"
                                    width={200}
                                    height={200}
                                />
                            </div>

                            <Button
                                type="default"
                                className="submitBtn"
                                shape="round"
                                size="large"
                                htmlType="submit"
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
                    <Link to="/login">
                        <Button
                            type="dashed"
                            shape="round"
                            icon={<EditOutlined />}
                        >
                            Đăng nhập
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Register;
