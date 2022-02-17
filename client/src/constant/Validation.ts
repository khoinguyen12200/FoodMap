import * as Yup from "yup";
import jsHash from 'js-sha512';

const dev = process.env.NODE_ENV != "production";


export function hashPassword(password: string){
    return jsHash.sha512(password)
}

export const email = Yup.string()
.email("Email không hợp lệ")
.required("Bắt buộc")

export const name = Yup.string().required().min(5,"Tên không ít hơn 5 ký tự");
export const account = Yup.string()
    .required("Không được bỏ trống")
    .min(5, "Không được ít hơn 5 ký tự")
    .max(30, "Không được nhiều hơn 30 ký tự")
    .matches(
        /[a-zA-Z0-9._]/,
        "Các ký tự được phép là chữ, số, chấm, gạch dưới"
    );
export const password = Yup.string()
    .required("Không được bỏ trống")
    .min(5, "Không được ít hơn 5 ký tự")
    .max(30, "Không được nhiều hơn 30 ký tự");
export const confirmPassword = Yup.string()
    .required("Không được bỏ trống")
    .oneOf([Yup.ref("password"), null], "Mật khẩu không trùng khớp");