import React, { ReactElement } from "react";
import { GrChapterAdd } from "react-icons/gr";
import ReactCrop, { Crop } from "react-image-crop";
import { RiZoomInFill, RiZoomOutFill } from "react-icons/ri";
import { MdModeEditOutline } from "react-icons/md";
import { AiFillPicture, AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import "./ImageUploader.scss";
import { motion } from "framer-motion";
import "react-image-crop/dist/ReactCrop.css";

interface ImageProps {
    src: string;
    file: File;
    size: number;
}

function onFileUploadChange(
    event: React.ChangeEvent<HTMLInputElement>
): Promise<ImageProps> {
    return new Promise((resolve, reject) => {
        if (event.target.files && event.target.files[0]) {
            var file = event.target.files[0];
            var filesize = file.size / 1024 / 1024;
            let reader = new FileReader();
            reader.onload = (e) => {
                if (e && e.target && typeof e.target.result === "string") {
                    resolve({
                        src: e.target.result,
                        file: file,
                        size: filesize,
                    });
                } else {
                    reject(new Error("Can not read file"));
                }
            };
            reader.readAsDataURL(file);
        } else {
            reject(new Error("Can not read file"));
        }
    });
}

interface Props {
    aspect?: number;
    isShow: boolean;
    onClose: Function;
    title?: string;
    onSubmit: (blob: File) => void;
}

export function ImageUploader({
    aspect,
    isShow,
    onClose,
    title,
    onSubmit,
}: Props): ReactElement {
    const [crop, setCrop] = React.useState<any>({ aspect: aspect });
    const refInput: any = React.useRef(null);
    const [image, setImage] = React.useState<ImageProps | null>(null);

    const valid = React.useMemo(() => {
        if (!image || crop.width === 0) {
            return false;
        }
        return true;
    }, [crop]);

    function inputClick() {
        if (refInput && refInput.current) {
            refInput.current.click();
        }
    }
    React.useEffect(() => {
        setCrop({
            unit: "%",
            width: 50,
            x: 25,
            aspect: aspect,
        });
    }, [image]);

    React.useEffect(() => {
        const body = document.getElementsByTagName("body")[0];
        body.style.overflow = isShow ? "hidden" : "auto";
    }, [isShow]);

    React.useEffect(() => {
        if (refInput && refInput.current && refInput.current.value) {
            refInput.current.value = "";
        }
    }, [image]);
    async function onUpload(event: React.ChangeEvent<HTMLInputElement>) {
        const image = await onFileUploadChange(event);
        setImage(image);
    }

    function onReactCropChange(newCrop: Crop, percentageCrop: Crop) {
        setCrop(newCrop);
    }
    const [imageRef, setImageRef] = React.useState<HTMLImageElement | null>(
        null
    );
    function onImageLoaded(image: HTMLImageElement) {
        setImageRef(image);
    }
    async function submit() {
        if (!imageRef) return;
        const blob = await getCroppedImg(imageRef, crop);

        requestClose();

        const imageName =
            getNameOfFile(image?.file?.name || "") +
            "." +
            getExtensionFormType(blob.type);
        const file = blobToFile(blob, imageName);
        onSubmit(file);
    }

    function getNameOfFile(fileName: string) {
        const arr = fileName.split(".");
        return arr[0];
    }

    function getExtensionFormType(type: string) {
        const index = type.indexOf("/");
        if (index === -1) {
            return "";
        } else {
            return type.substring(index + 1);
        }
    }

    function requestClose() {
        setImage(null);
        onClose();
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={isShow ? { opacity: 1 } : { opacity: 0 }}
            style={{ pointerEvents: isShow ? "all" : "none" }}
            className="image-uploader-wrapper"
        >
            <div className="image-uploader">
                <div className="header">
                    <h3 className="title">{title}</h3>
                    <div>
                        <button
                            type="button"
                            onClick={() => requestClose()}
                            className="close-button"
                        >
                            <AiOutlineClose />
                        </button>
                    </div>
                </div>
                <hr style={{ marginBottom: 15 }} />
                <div id="react-crop-body" className="body">
                    <input
                        name="imageUploader"
                        style={{ display: "none" }}
                        ref={refInput}
                        type="file"
                        accept="image/png, image/jpeg"
                        onChange={onUpload}
                    />
                    {!image && (
                        <div>
                            <p
                                style={{
                                    fontSize: 30,
                                    fontStyle: "bold",
                                    display: "flex",
                                }}
                            >
                                <span>Hãy chọn ảnh</span>
                            </p>
                        </div>
                    )}

                    {image && (
                        <>
                            <ReactCrop
                                style={{
                                    overflow: "scroll",
                                }}
                                // keepSelection={true}
                                onImageLoaded={onImageLoaded}
                                src={image && image.src}
                                crop={crop}
                                onChange={onReactCropChange}
                            />
                            {/* <div className="zoomSpace">
                                <button onClick={zoomOut} className="zoombtn">
                                    <RiZoomOutFill className="icon" />
                                </button>
                                <button onClick={zoomIn} className="zoombtn">
                                    <RiZoomInFill className="icon" />
                                </button>
                            </div> */}
                        </>
                    )}
                </div>
                <div className="footer">
                    <button
                        type="button"
                        onClick={() => inputClick()}
                        className={`pick ${!image && "noImage"}`}
                    >
                        <AiFillPicture />
                        {image ? "Chọn ảnh khác" : "Chọn ảnh"}
                    </button>
                    <button
                        type="button"
                        disabled={!valid}
                        className="confirm"
                        onClick={() => submit()}
                    >
                        <AiOutlineCheck />
                        Xác nhận
                    </button>
                </div>
            </div>
        </motion.div>
    );
}

/**
 * @param {HTMLImageElement} image - Image File Object
 * @param {Object} crop - crop Object
 * @param {String} fileName - Name of the returned file in Promise
 */

function getCroppedImg(image: HTMLImageElement, crop: any) {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;

    const ctx = canvas.getContext("2d");

    if (ctx) {
        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );
    }

    // As Base64 string
    // const base64Image = canvas.toDataURL('image/jpeg');

    // As a blob
    return new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
            (blob) => {
                if (blob) {
                    resolve(blob);
                } else {
                    reject(new Error("Can not read file"));
                }
            },
            "image/jpeg",
            1
        );
    });
}
function blobToFile(theBlob: Blob, fileName: string): File {
    //A Blob() is almost a File() - it's just missing the two properties below which we will add

    const file = new File([theBlob], fileName);
    return file;
}

interface ImagePickerProps {
    width?: string | number;
    height?: string | number;
    label?: string;
    onSubmit(file: File): void;
}

export function ImagePicker(props: ImagePickerProps) {
    const { width, height, label, onSubmit } = props;
    const [img, setImg] = React.useState<Blob | null>(null);
    const [show, setShow] = React.useState(false);
    function toggle() {
        setShow(!show);
    }
    function onChange(file: File) {
        setImg(file);
        onSubmit(file);
    }
    return (
        <div className="ImagePicker">
            <button
                type="button"
                style={{
                    width: props.width || 100,
                    height: props.height || 100,
                }}
                onClick={toggle}
                className="imgBtn"
            >
                {img && (
                    <>
                        <img src={URL.createObjectURL(img)} />
                        <button type="button" className="editBtn">
                            <MdModeEditOutline />
                        </button>
                    </>
                )}
                {!img && <AiFillPicture />}
            </button>
            {label && <label className="imgLabel">{label}</label>}
            <ImageUploader
                aspect={1}
                isShow={show}
                onClose={toggle}
                onSubmit={onChange}
            />
        </div>
    );
}

export default ImageUploader;
