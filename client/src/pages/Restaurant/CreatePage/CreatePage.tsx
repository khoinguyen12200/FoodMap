import { Button } from "react-bootstrap";
import { Form, Formik, FormikHelpers } from "formik";
import React from "react";
import FormikField from "../../../components/FormikField";
import * as Yup from "yup";
import "./CreatePage.scss";
import { ImagePicker } from "../../../components/ImageUploader";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Modal } from "react-bootstrap";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { toast } from "react-toastify";

import * as schema from "./schema";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

type Props = {};

function CreatePage({}: Props) {
    return (
        <div className="CreateRestaurant">
            <div className="PageTitle">Tạo doanh nghiệp</div>
            <FormCreateRestaurant />
        </div>
    );
}

function FormCreateRestaurant() {
    const navigate = useNavigate();
    const [callCreate, { data, loading, error }] = useMutation(
        schema.createRestaurant
    );

    const [location, setLocation] = React.useState<LocationValue | undefined>();

    const [file, setFile] = React.useState<File | null>(null);

    function onSubmitAvatar(file: File) {
        setFile(file);
    }

    const initialValues = {
        name: "",
        describe: "",
        address: "",
        phone: "",
        email: "",
    };
    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Tên doanh nghiệp không được để trống"),
        describe: Yup.string().required("Mô tả không được để trống"),
        address: Yup.string().required("Địa chỉ không được để trống"),
        phone: Yup.string().required("Số điện thoại không được để trống"),
        email: Yup.string()
            .email("Yêu cầu định dạng email")
            .required("Email không được để trống"),
    });

    async function onFormikSubmit(values: typeof initialValues) {
        await toast.promise(sendForm(values), {
            pending: "Đang tải",
            error: {
                render: (res: any) => res?.data?.message,
            },
            success: "Đăng ký thành công",
        });
    }

    async function sendForm(values: typeof initialValues) {
        if (!file) {
            throw new Error("Yêu cầu phải có ảnh đại diện cửa hàng");
        }
        if (!location) {
            throw new Error("Yêu cầu phải có vị trí cửa hàng");
        }

        await callCreate({
            variables: {
                data: {
                    ...values,
                    longitude: location.lng,
                    latitude: location.lat,
                    avatar: file,
                },
            },
        });
        navigate("/my-restaurant");
    }

    return (
        <div className="FormCreateRestaurant">
            <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onFormikSubmit}
            >
                <Form>
                    <FormikField name="name" label="Tên doanh nghiệp" />
                    <FormikField name="describe" label="Mô tả" />
                    <FormikField name="address" label="Địa chỉ" />
                    <FormikField name="phone" label="Số điện thoại" />
                    <FormikField name="email" label="Email" />

                    <LocationPicker value={location} setValue={setLocation} />

                    <div className="imgInput">
                        <ImagePicker
                            onSubmit={onSubmitAvatar}
                            label="Ảnh cửa hàng"
                            width={200}
                            height={200}
                        />
                    </div>

                    <Button
                        variant="primary"
                        type="submit"
                        className="submitBtn"
                    >
                        Xác nhận
                    </Button>
                </Form>
            </Formik>
        </div>
    );
}

interface LocationValue {
    lat: number;
    lng: number;
}

interface LocationPicker {
    value?: LocationValue;
    setValue: (location: LocationValue) => void;
}

const containerStyle = {
    width: "100%",
    height: "100%",
};

const center = {
    lat: 10.0341851,
    lng: 105.7225507,
};

function LocationPicker({ value, setValue }: LocationPicker) {
    const [show, setShow] = React.useState(false);
    function toggle() {
        setShow(!show);
    }

    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_TOKEN || "",
    });

    const [map, setMap] = React.useState(null);

    // const onLoad = React.useCallback(function callback(map) {
    function onMapClick(e: google.maps.MapMouseEvent) {
        if (!e.latLng) return;

        const lat = e.latLng.lat();
        const lng = e.latLng.lng();

        setValue({ lat, lng });
    }

    React.useEffect(() => {
        if (value) {
            toast.success("Đã đổi vị trí", { autoClose: 500 });
        }
    }, [value]);

    return (
        <div className="LocationPicker">
            <div className="label" onClick={toggle}>
                Chọn vị trí
                <div className="action">
                    <FaMapMarkerAlt />
                </div>
            </div>
            <div className="value" onClick={toggle}>
                {value ? (
                    <>
                        {value.lat}, {value.lng}
                    </>
                ) : (
                    <>Chưa chọn vị trí</>
                )}
            </div>
            <Modal fullscreen={true} show={show} onHide={toggle}>
                <Modal.Header closeButton>
                    <Modal.Title>Chọn vị trí</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={15}
                        onClick={onMapClick}
                    >
                        <>{value && <Marker position={value}></Marker>}</>
                    </GoogleMap>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={toggle}>
                        Đồng ý
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default CreatePage;
