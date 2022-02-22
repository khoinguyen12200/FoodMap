import React from "react";
import { Modal, Button } from "react-bootstrap";
import { actions, useAppDispatch, useAppSelector } from "../../redux";

import FormikField from "../../components/FormikField";
import { Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import * as Validation from "../../constant/Validation";
import { useMutation } from "@apollo/client";
import * as schema from "./schema";
import { toast } from "react-toastify";
import hashPassword from "../../constant/hashPassword";

type Props = {
    isShow: boolean;
    toggle: () => void;
};

function PasswordEditor({ isShow, toggle }: Props) {
    const [callUpdate, { data }] = useMutation(schema.updateUserPassword);

    const initialValues = {
        password: "",
        newPassword: "",
        confirmPassword: "",
    };

    const validationSchema = Yup.object().shape({
        password: Validation.password,
        newPassword: Validation.password,
        confirmPassword: Yup.string().oneOf(
            [Yup.ref("newPassword"), null],
            "Mật khẩu không khớp"
        ),
    });

    async function onSubmit(values: typeof initialValues) {
        await toast.promise(requestUpdate(values), {
            pending: "Đang tải",
            error: {
                render: (res: any) => res?.data?.message,
            },
            success: "Cập nhật thành công",
        });
    }
    async function requestUpdate(values: typeof initialValues) {
        await callUpdate({
            variables: {
                data: {
                    old: hashPassword(values.password),
                    new: hashPassword(values.newPassword),
                },
            },
        });
        toggle();
    }

    return (
        <Modal show={isShow} onHide={toggle}>
            <Modal.Header closeButton>
                <Modal.Title>Đổi mật khẩu</Modal.Title>
            </Modal.Header>
            <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                <Form>
                    <Modal.Body>
                        <FormikField name="password" label="Mật khẩu cũ" />
                        <FormikField name="newPassword" label="Mật khẩu mới" />
                        <FormikField
                            name="confirmPassword"
                            label="Xác nhận mật khẩu mới"
                        />
                    </Modal.Body>

                    <Modal.Footer>
                        <Button
                            onClick={toggle}
                            type="button"
                            variant="secondary"
                        >
                            Đóng
                        </Button>
                        <Button type="submit" variant="primary">
                            Lưu lại
                        </Button>
                    </Modal.Footer>
                </Form>
            </Formik>
        </Modal>
    );
}

export default PasswordEditor;
