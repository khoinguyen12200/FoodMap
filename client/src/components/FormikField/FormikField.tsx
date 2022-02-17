import React from "react";
import { ErrorMessage, useField } from "formik";
import { Input, Button, Divider } from "antd";
import {
    LockOutlined,
    ArrowLeftOutlined,
    EditOutlined,
} from "@ant-design/icons";
import { UserOutlined } from "@ant-design/icons";
import "./FormikField.scss";
import { Form } from "react-bootstrap";

interface FormikFieldProps {
    name: string;
    label?: string;
    [x: string]: any;
}
export default function FormikText(
    props: FormikFieldProps
): React.ReactElement {
    const { label, ...fieldProps } = props;
    const [field, meta] = useField(props);
    const error = React.useMemo(() => {
        if (meta.touched && meta.error) {
            return meta.error;
        }
        return "";
    }, [meta]);
    return (
        <Form.Group
            className="formikField"
        >
            {label && <Form.Label >{label}</Form.Label>}
            <Form.Control {...field} {...fieldProps} isInvalid={error !== ""} />
            {error != "" && (
                <>
                    <Form.Control.Feedback type="invalid" >
                        {error}
                    </Form.Control.Feedback>
                </>
            )}
        </Form.Group>
    );
}
