import { useMutation } from "@apollo/client";
import React from "react";
import * as schema from "./schema";
import ImageUploader from "../../components/ImageUploader";
import { useAppDispatch,actions } from "../../redux";
import { toast } from "react-toastify";

type Props = {
    isShow: boolean;
    onClose: () => void;
};

function AvatarEditor({ isShow, onClose }: Props) {
    const dispatch =useAppDispatch();
    const [callUpdate,{data}] = useMutation(schema.updateUserAvatar)
    async function onSubmit(file:File) {
        await toast.promise(
            requestUpdate(file),
            {
                pending: "Đang tải",
                error: {
                    render: (res: any) => res?.data?.message,
                },
                success: "Cập nhật thành công, tải lại trang để xem kết quả",
            }
        )
    }
    async function requestUpdate(file:File){
        await callUpdate({
            variables:{
                data:{
                    file
                }
            }
        })
    }
    React.useEffect(() => {
        if(data && data.updateUserAvatar){
            dispatch(actions.myAccount.setUserInfo(data.updateUserAvatar))
        }
    },[data])

    return (
        <ImageUploader
            onSubmit={onSubmit}
            isShow={isShow}
            onClose={onClose}
            aspect={1}
            title="Thay đổi ảnh đại diện"
        />
    );
}

export default AvatarEditor;
