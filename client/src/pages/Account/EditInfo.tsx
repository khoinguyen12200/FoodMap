import React from "react";
import { Modal, Button } from "react-bootstrap";
import { actions, useAppDispatch, useAppSelector } from "../../redux";

import FormikField from "../../components/FormikField";
import { Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import * as Validation from "../../constant/Validation";
import { useMutation } from "@apollo/client";
import * as schema from './schema'
import { toast } from "react-toastify";

type Props = {
    isShow: boolean;
    toggle: () => void;
    user: User;
};

function EditInfo({ isShow, user, toggle }: Props) {
    const [callUpdate,{data}] = useMutation(schema.UpdateUserInfo);

    const dispatch = useAppDispatch();

    React.useEffect(() => {
        if(data && data.updateUserInfo){
            dispatch(actions.myAccount.setUserInfo(data.updateUserInfo))
        }
    },[data])


    const initialValues = {
        name: user.name,
        email: user.email,
        address: user.address,
        phone: user.phone,
    };

    const validationSchema = Yup.object().shape({
        name: Validation.name,
    });

    async function onSubmit(
        values: typeof initialValues
    ) {
        await toast.promise(requestUpdate(values),{
            pending: "Đang tải",
            error: {
                render: (res: any) => res?.data?.message,
            },
            success: "Cập nhật thành công",
        })
    }
    async function requestUpdate(values: typeof initialValues){
        await callUpdate({
            variables: {
                data:{
                    ...values
                }
            }
        })
        toggle();
    }
    return (
        <Modal show={isShow} onHide={toggle}>
            <Modal.Header closeButton>
                <Modal.Title>Thông tin</Modal.Title>
            </Modal.Header>
            <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                <Form>
                    <Modal.Body>
                        <FormikField name="name" label="Tên người dùng" />
                        <FormikField name="email" label="Email" />
                        <FormikField name="address" label="Địa chỉ" />
                        <FormikField name="phone" label="Số điện thoại" />
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={toggle} type="button" variant="secondary">Đóng</Button>
                        <Button type="submit" variant="primary">Lưu lại</Button>
                    </Modal.Footer>
                </Form>
            </Formik>
        </Modal>
    );
}

export default EditInfo;
