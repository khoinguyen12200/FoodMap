import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../redux";
import "./ReviewPage.scss";
import RichTextEditor from "react-rte";
import { useMutation } from "@apollo/client";
import schema from "./schema";
import { toast } from "react-toastify";

type Props = {};

function ReviewPage({}: Props) {
    const user = useAppSelector((state) => state.myAccount.user);
    const [callCreate, { loading, data }] = useMutation(schema.createReview);

    const [title, setTitle] = React.useState("");

    const [value, setValue] = React.useState(RichTextEditor.createEmptyValue());

    function onChange(value: any) {
        setValue(value);
    }
    if (!user) {
        return (
            <div className="NoUser">
                Yêu cầu đăng nhập để viết bài
                <Link to="/login">Đăng nhập</Link>
            </div>
        );
    }

    function onSubmit() {
        toast.promise(handleCreate(), {
            pending: "Đang tải",
            error: {
                render: (res: any) => res?.data?.message,
            },
            success: "Tải lên thành công",
        });
    }

    async function handleCreate() {
        if (title.trim() == "") {
            throw new Error("Tiêu đề không được để trống");
        }
        await callCreate({
            variables: {
                data: {
                    text: value.toString("html"),
                    title: title,
                },
            },
        });
        setValue(RichTextEditor.createEmptyValue());
        setTitle("");
    }
    return (
        <div className="ReviewPage">
            <h1 className="PageTitle">Viết bài giới thiệu</h1>
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="inputTitle"
                type="text"
                placeholder="Tiêu đề bài viết"
            />
            <RichTextEditor
                className="textEditor"
                value={value}
                onChange={onChange}
            />
            <button
                onClick={onSubmit}
                disabled={loading}
                className="btn m-1 btn-primary px-5"
            >
                Gửi
            </button>
        </div>
    );
}

export default ReviewPage;
