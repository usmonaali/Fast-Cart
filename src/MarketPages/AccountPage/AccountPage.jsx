import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  getMe,
  updateProfile,
  changePassword,
  logout,
} from "../../api/account";
import { useTranslation } from "react-i18next";

const menuItems = [
  {
    section: "Manage My Account",
    items: [
      { label: "My Profile", active: true },
      { label: "Address Book" },
      { label: "My Payment Options" },
    ],
  },
  {
    section: "My Orders",
    items: [{ label: "My Returns" }, { label: "My Cancellations" }],
  },
  {
    section: "My WishList",
    items: [],
  },
];

const AccountPage = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [streetAddress, setStreetAddress] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { t } = useTranslation();
  useEffect(() => {
    getMe()
      .then((me) => {
        setFirstName(me.firstName || "");
        setLastName(me.lastName || "");
        setEmail(me.email || "");
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, []);

  const handleCancel = () => {
    getMe().then((me) => {
      setFirstName(me.firstName || "");
      setLastName(me.lastName || "");
      setStreetAddress("");
    });
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setError("");
    setSuccess("");
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const wantsPasswordChange =
      currentPassword && newPassword && confirmPassword;

    if (wantsPasswordChange && newPassword !== confirmPassword) {
      setError(`${t("account.passwordMismatch")}`);
      return;
    }

    setIsSaving(true);
    try {
      await updateProfile({ firstName, lastName });

      if (wantsPasswordChange) {
        await changePassword(currentPassword, newPassword);
        setSuccess(`${t("account.profileUpdatedPasswordChanged")}`);
        setTimeout(() => {
          logout();
          navigate("/NewLoginPage");
        }, 1500);
        return;
      }

      setSuccess(`${"account.profileUpdated"}`);
    } catch (err) {
      console.error(err.response?.data);
      setError(`${t("account.saveError")}`);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-[1170px] mx-auto px-4 py-10">
        {t("account.loading")}
      </div>
    );
  }

  return (
    <div className="max-w-[1170px] mx-auto px-4 py-10">
      <p className="text-[13px] text-[#6C737F] dark:text-white mb-8">
        {t("account.home")} /{" "}
        <span className="text-[#111927] dark:text-white">
          {t("account.myAccount")}
        </span>
      </p>

      <div className="flex gap-[60px]">
        {/* --- Сайдбар меню --- */}
        <aside className="w-[240px] shrink-0">
          {menuItems.map((section) => (
            <div key={section.section} className="mb-6">
              <h3 className="font-[600] dark:text-white text-[16px] text-[#111927] mb-2">
                {section.section}
              </h3>
              {section.items.map((item) => (
                <p
                  key={item.label}
                  className={`text-[14px] dark:text-white py-1 cursor-pointer ${
                    item.active ? "text-[#F04438]" : "text-[#6C737F]"
                  }`}
                >
                  {item.label}
                </p>
              ))}
            </div>
          ))}
        </aside>

        {/* --- Форма профиля --- */}
        <form onSubmit={handleSave} className="flex-1">
          <div className="border border-[#E5E7EB] rounded-md p-8">
            <h2 className="text-[#F04438] font-[600] text-[20px] mb-6">
              {t("account.profile")}
            </h2>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <TextField
                label={t("account.firstName")}
                fullWidth
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <TextField
                label={t("account.lastName")}
                fullWidth
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <TextField
                label={t("account.emailAddress")}
                fullWidth
                value={email}
                disabled
                helperText={t("account.emailCannotChange")}
              />
              <TextField
                label={t("account.streetAddress")}
                fullWidth
                value={streetAddress}
                onChange={(e) => setStreetAddress(e.target.value)}
                helperText={t("account.addressBookSeparate")}
              />
            </div>

            <h3 className="text-[16px] font-[500] dark:text-white text-[#111927] mb-4">
              {t("account.passwordChanges")}
            </h3>

            <TextField
              label={t("account.currentPassword")}
              type={showCurrent ? "text" : "password"}
              fullWidth
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              sx={{ mb: 3 }}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowCurrent((v) => !v)}
                        edge="end"
                        size="small"
                      >
                        {showCurrent ? (
                          <VisibilityOff fontSize="small" />
                        ) : (
                          <Visibility fontSize="small" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            <div className="grid grid-cols-2 gap-6 mb-6">
              <TextField
                label={t("account.newPassword")}
                type={showNew ? "text" : "password"}
                fullWidth
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowNew((v) => !v)}
                          edge="end"
                          size="small"
                        >
                          {showNew ? (
                            <VisibilityOff fontSize="small" />
                          ) : (
                            <Visibility fontSize="small" />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
              <TextField
                label={t("account.confirmNewPassword")}
                type={showConfirm ? "text" : "password"}
                fullWidth
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowConfirm((v) => !v)}
                          edge="end"
                          size="small"
                        >
                          {showConfirm ? (
                            <VisibilityOff fontSize="small" />
                          ) : (
                            <Visibility fontSize="small" />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </div>

            {error && <p className="text-[14px] text-red-500 mb-4">{error}</p>}
            {success && (
              <p className="text-[14px] text-green-600 mb-4">{success}</p>
            )}

            <div className="flex justify-end gap-6">
              <button
                type="button"
                onClick={handleCancel}
                className="text-[14px] text-[#111927]"
              >
                {t("account.cancel")}
              </button>
              <Button
                type="submit"
                variant="contained"
                disabled={isSaving}
                sx={{
                  bgcolor: "#DB4444",
                  "&:hover": { bgcolor: "#c93a3a" },
                  textTransform: "none",
                  px: 4,
                }}
              >
                {isSaving
                  ? `${t("account.saving")}`
                  : `${t("account.saveChanges")}`}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountPage;
