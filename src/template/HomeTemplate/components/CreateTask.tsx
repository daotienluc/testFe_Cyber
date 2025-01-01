import { useState, useEffect, useContext } from "react";
import { Button, Dropdown, Input, Menu, Modal, Table } from "antd";
import { projectService } from "../../../services/project.service";
import { UserOutlined } from "@ant-design/icons";
import { useFormik } from "formik";
import { NotificationContext } from "../../../App";
import * as Yup from "yup";

const CreateTask = () => {
  const handleNotification = useContext(NotificationContext);
  const [listTask, setListTask] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleGetProject = () => {
    projectService
      .getAllProject()
      .then((res) => {
        setListTask(res.data.content);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    handleGetProject();
  }, []);

  const columnMember = [
    { title: "Id", dataIndex: "userId", key: "userId" },
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (avatar: string) => (
        <img src={avatar} alt="Avatar" className="rounded-full w-10 h-10" />
      ),
    },
    { title: "Name", dataIndex: "name", key: "name" },
    {
      title: "Action",
      key: "action",
      render: () => <Button>Xóa</Button>,
    },
  ];

  // Render dropdown menu với Table
  const getDropdownItems = (members: string[]) => (
    <Menu>
      <Menu.Item key="1">
        <Table columns={columnMember} dataSource={members} pagination={false} />
      </Menu.Item>
    </Menu>
  );

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Project Name",
      dataIndex: "projectName",
      key: "projectName",
    },
    {
      title: "Category Name",
      dataIndex: "categoryName",
      key: "categoryName",
    },
    {
      title: "Creator",
      dataIndex: "creator",
      key: "creator",
      render: (creator: any) => creator.name,
    },
    {
      title: "Members",
      dataIndex: "members",
      key: "members",
      render: (members: any[]) => (
        <Dropdown overlay={getDropdownItems(members)}>
          <div className="border border-gray-500 cursor-pointer flex justify-center gap-1 rounded-full">
            <UserOutlined />
            {members.length}
          </div>
        </Dropdown>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <div className="flex gap-3">
          <Button>Sửa</Button>
          <Button>Xóa</Button>
        </div>
      ),
    },
  ];

  const validationSchema = Yup.object({
    projectName: Yup.string().required("Project Name is required"),
    description: Yup.string().required("Description is required"),
  });

  const { handleChange, handleBlur, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues: {
        projectName: "",
        description: "",
      },
      validationSchema,
      onSubmit: (values: any, { resetForm }) => {
        setIsModalOpen(false);
        projectService
          .createProject(values)
          .then((res) => {
            console.log(res);
            resetForm();
            handleGetProject();
            handleNotification("success", "Create successful projects", 3000);
          })
          .catch((err) => {
            console.log(err);
          });
      },
    });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <h2 className="font-medium text-2xl my-5">Project Management</h2>
      <Button type="primary" onClick={showModal} className="mb-5">
        Craete Project
      </Button>
      <Modal
        title="Create Task"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={() => handleSubmit()}>
            OK
          </Button>,
        ]}
      >
        <form className="space-y-3">
          <div>
            <label className="font-medium">Project Name</label>
            <Input
              type="text"
              name="projectName"
              value={values.projectName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.projectName && typeof errors.projectName === "string" && (
              <div className="text-red-500">{errors.projectName}</div>
            )}
          </div>
          <div>
            <label className="font-medium">Description</label>
            <Input
              type="text"
              name="description"
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.description && typeof errors.description === "string" && (
              <div className="text-red-500">{errors.description}</div>
            )}
          </div>
        </form>
      </Modal>

      <Table columns={columns} dataSource={listTask} rowKey="id" />
    </div>
  );
};

export default CreateTask;
