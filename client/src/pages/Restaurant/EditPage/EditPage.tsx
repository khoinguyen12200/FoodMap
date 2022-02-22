import { Button } from "react-bootstrap";
import { Form, Formik, FormikHelpers } from "formik";
import React from "react";
import FormikField from "../../../components/FormikField";
import * as Yup from "yup";
import "./EditPage.scss";
import { ImagePicker } from "../../../components/ImageUploader";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Modal } from "react-bootstrap";
import {
    GoogleMap,
    Marker,
    useJsApiLoader,
    LoadScript,
} from "@react-google-maps/api";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

import * as schema from "./schema";
import * as ManageSchema from "../Manage/schema";
import { useMutation, useQuery } from "@apollo/client";

type Props = {};

function CreatePage({}: Props) {
    return (
        <div className="CreateRestaurant">
            <div className="PageTitle">Chỉnh sửa thông tin</div>
            <FormCreateRestaurant />
        </div>
    );
}

function FormCreateRestaurant() {
    const navigate = useNavigate();
    let { id } = useParams<"id">();
    const restaurantId = React.useMemo(() => {
        try {
            return parseInt(id || "");
        } catch (e: any) {
            return -1;
        }
    }, [id]);

    const queryResult = useQuery(ManageSchema.findRestaurants, {
        variables: {
            data: {
                id: restaurantId,
            },
        },
        fetchPolicy: "no-cache",
    });
    const restaurant: Restaurant | null = React.useMemo(() => {
        if (
            queryResult &&
            queryResult.data &&
            queryResult.data.findRestaurants &&
            queryResult.data.findRestaurants.length > 0
        ) {
            return queryResult.data.findRestaurants[0];
        }
        return null;
    }, [queryResult]);

    const [callUpdate, { data, loading, error }] = useMutation(
        schema.updateInfoRestaurant
    );

    const [location, setLocation] = React.useState<LocationValue | undefined>();

    React.useEffect(() => {
        if (restaurant) {
            setLocation({
                lat: restaurant.latitude,
                lng: restaurant.longitude,
            });
        }
    }, [restaurant]);

    const [file, setFile] = React.useState<File | null>(null);

    function onSubmitAvatar(file: File) {
        setFile(file);
    }

    const initialValues =
        restaurant != null
            ? {
                  name: restaurant.name,
                  describe: restaurant.describe,
                  address: restaurant.address,
                  phone: restaurant.phone,
                  email: restaurant.email,
              }
            : {
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

    async function onFormikSubmit(values: typeof initialValues,formik:FormikHelpers<typeof initialValues>) {
    
        await toast.promise(sendForm(values,formik), {
            pending: "Đang tải thay đổi",
            error: {
                render: (res: any) => res?.data?.message,
            },
            success: "Chỉnh sửa thành công",
        });
    }

    async function sendForm(values: typeof initialValues,formik:FormikHelpers<typeof initialValues>) {

        if (!location) {
            throw new Error("Yêu cầu phải có vị trí cửa hàng");
        }

        var data = {
            ...values,
            longitude: location.lng,
            latitude: location.lat,
            avatar: file || undefined,
            id:restaurantId,
        }

        await callUpdate({
            variables: {
                data: data,
            },
        });
        navigate(-1)
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
                            label="Thay đổi ảnh"
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

    function onMapClick(e: google.maps.MapMouseEvent) {
        if (!e.latLng) return;

        const lat = e.latLng.lat();
        const lng = e.latLng.lng();

        setValue({ lat, lng });
    }

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
                    <LoadScript
                        googleMapsApiKey={
                            process.env.REACT_APP_GOOGLE_TOKEN || ""
                        }
                    >
                        <GoogleMap
                            mapContainerStyle={containerStyle}
                            center={center}
                            zoom={15}
                            onClick={onMapClick}
                        >
                            <>{value && <Marker position={value}></Marker>}</>
                        </GoogleMap>
                    </LoadScript>
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
