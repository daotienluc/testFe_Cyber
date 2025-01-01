import { useContext } from "react";
import Icons from "../../components/Icons";
import { Link, useNavigate } from "react-router-dom";
import { pathDefault } from "../../common/path";
import { LeftOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { ButtonOutline } from "../../components/Button/ButtonCustom";
import Lottie from "react-lottie";
import * as animationData from "./../../assets/animation/loginAnimation.json";
import { useFormik } from "formik";
import { authService } from "../../services/auth.service";
import { NotificationContext } from "../../App";
import { useDispatch } from "react-redux";
import { handleUpdateUser } from "../../redux/Slice/User.Slice";
import * as yup from "yup";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleNotification = useContext(NotificationContext);
  const { handleChange, handleBlur, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      onSubmit: (values) => {
        authService
          .signIn(values)
          .then((res) => {
            handleNotification("success", "Đăng nhập thành công", 3000);
            // thay đổi dữ liệu cho redux
            dispatch(handleUpdateUser(res.data.content.user));
            localStorage.setItem("userInfo", JSON.stringify(res.data.content));
            navigate(pathDefault.homepage);
          })
          .catch((err) => {
            console.log(err);
            handleNotification("error", err.response.data.content);
          });
      },
      // validationSchema
      validationSchema: yup.object({
        email: yup
          .string()
          .email("Vui lòng nhập đúng định dạng Email")
          .required("Vui lòng không bỏ trống"),
        password: yup.string().required("Vui lòng không bỏ trống"),
      }),
    });

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: JSON.parse(JSON.stringify(animationData)),
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="grid lg:grid-cols-3 grid-cols-1 lg:h-screen py-10">
      <div className="hidden lg:block col-span-2 h-full">
        {/* Animation */}
        <Lottie options={defaultOptions} height={600} width={990} />
      </div>
      <div className="signIn_form h-full px-10 flex flex-col justify-between mx-auto lg:mx-0 w-full lg:w-auto">
        {/* Logo and back to homePage */}
        <div className="flex justify-between items-center">
          <Icons.logo />
          <Link to={pathDefault.homepage}>
            <LeftOutlined /> Go back
          </Link>
        </div>

        {/* Form */}
        <div className="mt-10 lg:mt-0">
          <h1 className="text-4xl font-semibold">Trang đăng nhập</h1>
          <p className="text-sm font-semibold text-gray-400 pb-6 pt-2">
            Nhập Email để bắt đầu truy cập
          </p>
          <form className="space-y-3" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="">Email</label>
              <Input
                name="email"
                value={values.email}
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="Vui lòng nhập Email"
              />
              {errors.email && touched.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="">Mật khẩu</label>
              <Input
                type="password"
                name="password"
                value={values.password}
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="Vui lòng nhập Mật khẩu"
              />
              {errors.password && touched.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <div>
              <ButtonOutline
                type="submit"
                content="Đăng nhập"
                className="w-full py-2"
              />
            </div>
          </form>
        </div>

        {/* đăng ký */}
        <div className="text-center">
          <span>
            Chưa có tài khoản?{" "}
            <Link
              to={pathDefault.signup}
              className="font-semibold hover:underline duration-200"
            >
              Đăng ký tại đây
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
