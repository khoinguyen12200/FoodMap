import React, { useMemo, useState } from "react";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as schema from "./schema";
import { Modal, Button } from "react-bootstrap";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import FormikField from "../../../components/FormikField";
import { ImagePicker } from "../../../components/ImageUploader";
import { toast } from "react-toastify";

export default function Victuals({ restaurantId }: { restaurantId: number }) {
    const [callGetVictual, { data }] = useLazyQuery(schema.findVictuals, {
        variables: {
            restaurantId: restaurantId,
        },
        fetchPolicy: "no-cache",
    });
    React.useEffect(() => {
        callGetVictual();
    }, []);
    const victuals = useMemo<Victual[]>(() => {
        if (data) {
            return data.findVictuals;
        }
        return [];
    }, [data]);

    const [showModalAdd, setShowModalAdd] = useState(false);
    function toggleModalAdd() {
        setShowModalAdd(!showModalAdd);
    }
    return (
        <div className="victuals">
            <h2 className="title">Thực đơn</h2>
            <div className="content">
                {victuals.map((victual: Victual) => (
                    <VictualItem
                        onUpdate={callGetVictual}
                        victual={victual}
                        key={victual.id}
                    />
                ))}
                <div onClick={toggleModalAdd} className="addBtn">
                    Thêm món
                </div>
                <ModalAddVictual
                    onSuccess={callGetVictual}
                    restaurantId={restaurantId}
                    show={showModalAdd}
                    onHide={toggleModalAdd}
                />
            </div>
        </div>
    );
}

interface ModalAddVictualProps {
    show: boolean;
    onHide: () => void;
    restaurantId: number;
    onSuccess: () => void;
}

function ModalAddVictual({
    show,
    onHide,
    restaurantId,
    onSuccess,
}: ModalAddVictualProps) {
    const [callCreate, { data, loading, error }] = useMutation(
        schema.createVictual
    );

    const [avatar, setAvatar] = useState<File | null>(null);
    const initialValues = {
        name: "",
        describe: "",
        price: 0,
    };
    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Tên món không được để trống"),
        describe: Yup.string().required("Mô tả không được để trống"),
        price: Yup.number().required("Giá không được để trống"),
    });
    async function onFormikSubmit(values: typeof initialValues) {
        toast.promise(handleCallCreate(values), {
            pending: "Đang tải",
            error: {
                render: (res: any) => res?.data?.message,
            },
            success: "Tạo thành công",
        });
    }
    async function onSubmitAvatar(file: File) {
        setAvatar(file);
    }

    async function handleCallCreate(values: typeof initialValues) {
        if (!avatar) {
            throw new Error("Chưa chọn ảnh");
        }
        const data = {
            ...values,
            restaurantId: restaurantId,
            avatar: avatar,
        };
        await callCreate({
            variables: {
                data: data,
            },
        });
        onSuccess();
        onHide();
    }
    return (
        <Modal centered show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Thêm món</Modal.Title>
            </Modal.Header>
            <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onFormikSubmit}
            >
                <Form>
                    <Modal.Body>
                        <FormikField name="name" label="Tên món" />
                        <FormikField name="describe" label="Mô tả" />
                        <FormikField name="price" type="number" label="Giá" />
                        <div className="imgInput">
                            <ImagePicker
                                onSubmit={onSubmitAvatar}
                                label="Ảnh món ăn"
                                width={200}
                                height={200}
                            />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            type="button"
                            onClick={onHide}
                        >
                            Đóng
                        </Button>
                        <Button variant="primary" type="submit">
                            Xác nhận
                        </Button>
                    </Modal.Footer>
                </Form>
            </Formik>
        </Modal>
    );
}

interface VictualItemProps {
    victual: Victual;
    onUpdate: () => void;
}

function VictualItem({ onUpdate, victual }: VictualItemProps) {
    const [show, setShow] = useState(false);
    function toggle() {
        setShow(!show);
    }
    return (
        <div>
            <div onClick={toggle} className="victualItem" key={victual.id}>
                <div className="vAvatar">
                    <img
                        src={
                            process.env.REACT_APP_SERVER_ENDPOINT +
                            victual.avatar
                        }
                        alt=""
                    />
                </div>
                <div className="info">
                    <div className="name">{victual.name}</div>
                    <div className="price">{victual.price}</div>
                </div>
            </div>
            <ModalItem
                onUpdate={onUpdate}
                victual={victual}
                show={show}
                onHide={toggle}
                onSuccess={() => {}}
            />
        </div>
    );
}

interface ModalItemProps {
    show: boolean;
    onHide: () => void;
    onSuccess: () => void;
    victual: Victual;
    onUpdate: () => void;
}

function ModalItem({
    show,
    onHide,
    onSuccess,
    victual,
    onUpdate,
}: ModalItemProps) {
    const [callUpdate, { data, loading, error }] = useMutation(
        schema.updateVictual
    );
    const [avatar, setAvatar] = useState<File | null>(null);
    const [editable, setEditable] = useState(false);
    function toggleEditable() {
        setEditable(!editable);
    }

    const initialValues = {
        name: victual.name,
        describe: victual.describe,
        price: victual.price,
    };
    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Tên món không được để trống"),
        describe: Yup.string().required("Mô tả không được để trống"),
        price: Yup.number().required("Giá không được để trống"),
    });
    async function onFormikSubmit(values: typeof initialValues) {
        await toast.promise(handleCallUpdate(values), {
            pending: "Đang tải",
            error: {
                render: (res: any) => res?.data?.message,
            },
            success: "Đã lưu chỉnh sửa",
        });
    }

    function onSubmitAvatar(file: File) {
        setAvatar(file);
    }
    async function handleCallUpdate(values: typeof initialValues) {
        const data = {
            ...values,
            id: victual.id,
            avatar: avatar,
        };
        await callUpdate({
            variables: {
                data,
            },
        });
        onUpdate();
        onHide();
        setEditable(false);
    }

    const [callDelete,resDelete] = useMutation(schema.deleteVictual);

    async function btnCallDelete() {
        const agree = window.confirm("Bạn có muốn xóa món này không ?");
        if(agree){
            toast.promise(handleCallDelete(),{
                pending: "Đang xóa",
                error: {
                    render: (res: any) => res?.data?.message,
                },
                success: "Đã xóa thành công",
            })
        }
    }
    async function handleCallDelete(){
        await callDelete({
            variables:{
                deleteVictualId:victual.id
            }
        })
        onUpdate();

    }
    return (
        <Modal
            className="ModalVictualItem"
            centered
            show={show}
            onHide={onHide}
        >
            <Modal.Header closeButton>
                <Modal.Title>Thông tin chi tiết</Modal.Title>
            </Modal.Header>
            <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onFormikSubmit}
            >
                <Form>
                    <Modal.Body>
                        {editable ? (
                            <div className="imgInput">
                                <ImagePicker
                                    onSubmit={onSubmitAvatar}
                                    label="Ảnh món ăn"
                                    width={200}
                                    height={200}
                                />
                            </div>
                        ) : (
                            <div className="avatarDefault">
                                <img
                                    src={
                                        process.env.REACT_APP_SERVER_ENDPOINT +
                                        victual.avatar
                                    }
                                    alt="avatar"
                                />
                            </div>
                        )}

                        <FormikField
                            readOnly={!editable}
                            name="name"
                            label="Tên món"
                        />
                        <FormikField
                            readOnly={!editable}
                            name="describe"
                            label="Mô tả"
                        />
                        <FormikField
                            readOnly={!editable}
                            name="price"
                            type="number"
                            label="Giá"
                        />
                    </Modal.Body>
                    <Modal.Footer className="btnSpace">
                        <Button
                            onClick={btnCallDelete}
                            variant="danger"
                            type="button"
                        >
                            Xoá
                        </Button>
                        <div>
                            <Button
                                variant="secondary"
                                type="button"
                                onClick={onHide}
                            >
                                Đóng
                            </Button>

                            {!editable ? (
                                <Button
                                    variant="warning"
                                    type="button"
                                    onClick={toggleEditable}
                                >
                                    Chỉnh sửa
                                </Button>
                            ) : (
                                <>
                                    <Button
                                        onClick={toggleEditable}
                                        variant="warning"
                                        type="submit"
                                    >
                                        Hủy chỉnh sửa
                                    </Button>
                                    <Button variant="primary" type="submit">
                                        Lưu lại
                                    </Button>
                                </>
                            )}
                        </div>
                    </Modal.Footer>
                </Form>
            </Formik>
        </Modal>
    );
}
