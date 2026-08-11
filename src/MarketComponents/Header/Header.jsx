import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  Heart,
  ShoppingCart,
  User,
  ShoppingBag,
  LogOut,
} from "lucide-react";
import { getToken, logout } from "../../api/account";
import Group11166065952 from "../../assets/Group11166065952.png";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ThemeToggle from "../../components/ThemeToggle/ThemeToggle";
import LanguageToggle from "../../components/LanguageToggle/LanguageToggle";
import { useTranslation } from "react-i18next";

const Header = () => {
  const user = getToken();

  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    navigate("/create-account");
    logout();
    handleClose();
  };
  const { t } = useTranslation();
  return (
    <header className="border-b border-[#E5E7EB] sticky top-0 z-20 dark:border-white bg-white dark:bg-[#0F1729] text-[#111927] dark:text-white transition-colors">
      <div className="max-w-[1170px] mx-auto flex items-center justify-between h-[80px] px-4">
        <Link
          to="/"
          className="font-[700] text-[24px] text-[#111927] dark:text-white"
        >
          <img src={Group11166065952} alt="" />
        </Link>

        <nav className="flex items-center gap-8 text-[14px] text-[#111927] dark:text-white">
          <Link to="/">{t("header.home")}</Link>
          <Link to="/contact">{t("header.contact")}</Link>
          <Link to="/about">{t("header.about")}</Link>
          <Link to="/create-account">{t("header.signUp")}</Link>
        </nav>

        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder={t('header.searchPlaceholder')}
              className="bg-[#F5F5F5] dark:bg-[#1F2937] text-[#111927] dark:text-white placeholder:text-[#6C737F] dark:placeholder:text-slate-400 rounded-md h-[38px] pl-3 pr-9 text-[13px] w-[220px] outline-none"
            />

            <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-[#111927] dark:text-white" />
          </div>
          <LanguageToggle />
          <ThemeToggle />

          <Link to="/wishlist">
            <Heart className="w-5 h-5 text-[#111927] dark:text-white" />
          </Link>

          <Link to="/cart">
            <ShoppingCart className="w-5 h-5 text-[#111927] dark:text-white" />
          </Link>

          <Button
            id="account-button"
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            sx={{
              minWidth: "36px",
              width: "36px",
              height: "36px",
              padding: 0,
              borderRadius: "50%",
              backgroundColor: "#DB4444",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#c93737",
              },
            }}
          >
            <User className="w-[18px] h-[18px]" />
          </Button>

          <Menu
            id="account-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            slotProps={{
              paper: {
                sx: {
                  marginTop: "10px",
                  width: "170px",
                  background:
                    "linear-gradient(180deg, #3b3b3b 0%, #151515 100%)",
                  borderRadius: "0px",
                  boxShadow: "0px 5px 15px rgba(0,0,0,0.5)",
                  padding: "8px 0",
                  overflow: "visible",
                  borderRadius: "4px",
                },
              },
            }}
          >
            <MenuItem
              onClick={handleClose}
              sx={{
                height: "40px",
                padding: "0 14px",
                color: "#fff",
                gap: "12px",
                fontSize: "14px",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.12)",
                },
              }}
            >
              <User className="w-[18px] h-[18px]" />

              <Link
                to={user ? "/account" : "/create-account"}
                className="text-white no-underline w-full"
              >
                {t('header.account')}
              </Link>
            </MenuItem>

            <MenuItem
              onClick={handleClose}
              sx={{
                height: "40px",
                padding: "0 14px",
                color: "#fff",
                gap: "12px",
                fontSize: "14px",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.12)",
                },
              }}
            >
              <ShoppingBag className="w-[18px] h-[18px]" />

              <Link to="/orders" className="text-white no-underline w-full">
                {t('header.myOrder')}
              </Link>
            </MenuItem>

            <MenuItem
              onClick={handleLogout}
              sx={{
                height: "40px",
                padding: "0 14px",
                color: "#fff",
                gap: "12px",
                fontSize: "14px",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.12)",
                },
              }}
            >
              <LogOut className="w-[18px] h-[18px]" />

              <span>{t('header.logout')}</span>
            </MenuItem>
          </Menu>
        </div>
      </div>
    </header>
  );
};

export default Header;
