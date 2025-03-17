import { useState } from "react";

// UI
import Button from "../ui/Button";
import Input from "../ui/Input";
import Icon from "../ui/Icon";
import PurposeCard from "../ui/Cards/PurposeCard";

// Icons
import { closeIcon, username, email } from "../../assets";

// Constants
import { PURPOSES } from "../../lib/constants";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { toggleModal } from "../../store/accountSlice";
import { showToast } from "../../store/toastSlice";

// Services
import { updateUser } from "../../services/userService";

// Form
import ResetPassword from "./ResetPassword";

// Motion
import { AnimatePresence, motion } from "motion/react";
import { modalAnimatioon } from "../../lib/motion";

const AccountForm = () => {
  // Redux
  const dispatch = useDispatch();
  const { account } = useSelector((state) => state.account);

  // Form
  const [form, setForm] = useState({
    firstname: account?.firstname || "",
    lastname: account?.lastname || "",
    username: account?.username || "",
    email: account?.email || "",
    purpose: account?.purpose || "",
  });
  const [loading, setLoading] = useState(false);
  const [isResetPassword, setIsResetPassword] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Update User Account form handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await updateUser(form);
      dispatch(
        showToast({
          message: res?.message || "Account updated successfully",
          type: "success",
        }),
      );
    } catch (error) {
      console.log(error);
      dispatch(
        showToast({
          message: error || "Something went wrong",
          type: "error",
        }),
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="absolute inset-0 z-10 flex h-screen flex-col items-center justify-center bg-black/50">
      <motion.form
        hidden={isResetPassword}
        onSubmit={handleSubmit}
        className="dark:bg-dark min-w-sm rounded-lg bg-white p-4 md:min-w-md"
        variants={modalAnimatioon}
        {...modalAnimatioon}
      >
        <header className="flex items-center justify-between">
          <h2 className="font-primary text-xl font-bold md:text-2xl">
            Account
          </h2>
          <button type="button" onClick={() => dispatch(toggleModal())}>
            <Icon src={closeIcon} alt={"Close"} size={24} invert />
          </button>
        </header>

        <main className="mt-4 flex flex-col gap-6">
          {/* First Name and Last Name */}
          <div className="flex gap-4">
            <Input
              name={"firstname"}
              type={"text"}
              placeholder={"John"}
              value={form.firstname}
              onChange={handleChange}
            />
            <Input
              name={"lastname"}
              type={"text"}
              placeholder={"Doe"}
              value={form.lastname}
              onChange={handleChange}
            />
          </div>

          {/* Username  */}
          <Input
            name={"username"}
            type={"text"}
            placeholder={"Username"}
            startAdornment={username}
            value={form.username}
            onChange={handleChange}
          />

          {/* Email */}
          <Input
            name={"email"}
            type={"email"}
            placeholder={"Email"}
            startAdornment={email}
            value={form.email}
            onChange={handleChange}
          />

          {/* Purpose */}
          <div className="grid grid-cols-3 place-items-center gap-4">
            {PURPOSES.map((purpose) => (
              <PurposeCard
                key={purpose.title}
                value={form.purpose}
                onClick={() =>
                  setForm((prev) => ({ ...prev, purpose: purpose.title }))
                }
                {...purpose}
              />
            ))}
          </div>
        </main>

        <footer className="mt-8 flex items-center gap-4 border-t border-gray-300 py-4">
          <Button
            text={"Reset Password"}
            className={"whitespace-nowrap"}
            onClick={() => setIsResetPassword(true)}
          />
          <div className="flex w-full justify-end gap-4">
            <Button
              text={"Cancel"}
              className={"border border-red-500 bg-transparent text-red-500"}
              onClick={() => dispatch(toggleModal())}
            />
            <Button type="submit" text={"Save Changes"} loading={loading} />
          </div>
        </footer>
      </motion.form>
      <AnimatePresence>
        {isResetPassword && (
          <ResetPassword
            onCancel={() => dispatch(toggleModal())}
            email={account.email}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default AccountForm;
