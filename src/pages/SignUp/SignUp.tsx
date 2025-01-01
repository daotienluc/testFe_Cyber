import { useContext } from "react";
import Icons from "../../components/Icons";
import { Link, useNavigate } from "react-router-dom";
import { pathDefault } from "../../common/path";
import { LeftOutlined } from "@ant-design/icons";
import { Input } from "antd";
import Lottie from "react-lottie";
import * as animationData from "./../../assets/animation/loginAnimation.json";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ButtonOutline } from "../../components/Button/ButtonCustom";
import { NotificationContext } from "../../App";
import { authService } from "../../services/auth.service";

const SignUp = () => {
  const handleNotification = useContext(NotificationContext);

  const navigate = useNavigate();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: JSON.parse(JSON.stringify(animationData)),
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const { handleBlur, handleChange, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        passWord: "",
      },
      onSubmit: (values) => {
        console.log(values);
        authService
          .signUp(values)
          .then((res) => {
            handleNotification("success", "Đăng ký thành công", 3000);
            navigate(pathDefault.signin);
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
            handleNotification("error", err.response.data.message);
          });
      },
      validationSchema: Yup.object({
        name: Yup.string().required("Vui lòng không bỏ trống"),
        email: Yup.string()
          .email("Vui lòng nhập đúng định dạng Email")
          .required("Vui lòng không bỏ trống"),
        passWord: Yup.string().required("Vui lòng không bỏ trống"),
      }),
    });

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
          <h1 className="text-4xl font-semibold">Trang đăng ký</h1>
          <p className="text-sm font-semibold text-gray-400 pb-6 pt-2">
            Nhập Email để bắt đầu đăng ký
          </p>
          <form className="space-y-3" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="">Tên</label>
              <Input
                name="name"
                value={values.name}
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="Vui lòng nhập tên"
              />
              {errors.name && touched.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

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
                name="passWord"
                value={values.passWord}
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="Vui lòng nhập mật khẩu"
              />
              {errors.passWord && touched.passWord && (
                <p className="text-red-500 text-sm mt-1">{errors.passWord}</p>
              )}
            </div>

            <div>
              <ButtonOutline
                type="submit"
                content="Đăng ký"
                className="w-full py-2"
              />
            </div>
          </form>
        </div>

        {/* đăng ký */}
        <div className="text-center">
          <span>
            Bạn đã có tài khoản?{" "}
            <Link
              to={pathDefault.signin}
              className="font-semibold hover:underline duration-200"
            >
              Đăng nhập tại đây
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
