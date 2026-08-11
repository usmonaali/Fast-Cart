import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { getToken } from "../../api/account";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const user = getToken();
  const {t} = useTranslation()

  return (
    <footer className="bg-[#000000] text-white mt-[80px] ">
      <div className="max-w-[1170px] mx-auto grid grid-cols-5 gap-8 px-4 py-[60px]">
        <div>
          <h3 className="font-[700] text-[20px] mb-4">{t('footer.brand')}</h3>
          <p className="text-[16px] font-[600] mb-2">{t('footer.subscribe')}</p>
          <p className="text-[13px] text-slate-300 mb-3">{t('footer.discount')}</p>
          <div className="flex items-center border border-slate-500 rounded px-3 py-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-transparent text-[13px] w-full outline-none placeholder:text-slate-400"
            />
            <span className="text-white">➤</span>
          </div>
        </div>

        <div>
          <h4 className="font-[600] mb-4">{t('footer.support')}</h4>
          <p className="text-[13px] text-slate-300 mb-3 leading-5">
            111 Bijoy sarani, Dhaka,
            <br />
            DH 1515, Bangladesh.
          </p>
          <p className="text-[13px] text-slate-300 mb-3">exclusive@gmail.com</p>
          <p className="text-[13px] text-slate-300">+88015-88888-9999</p>
        </div>

        <div>
          <h4 className="font-[600] mb-4">{t('footer.account')}</h4>
          <Link
            to={user ? "/account" : "/NewLoginPage"}
            className="block text-[13px] text-slate-300 mb-2 hover:text-white"
          >
            {t('footer.myAccount')}
          </Link>
          <Link to="/cart" className="block text-[13px] text-slate-300 mb-2 hover:text-white">
            {t('footer.cart')}
          </Link>
          <Link to="/wishlist" className="block text-[13px] text-slate-300 mb-2 hover:text-white">
            {t('footer.wishlist')}
          </Link>
          <Link to="/products" className="block text-[13px] text-slate-300 hover:text-white">
            {t('footer.shop')}
          </Link>
        </div>

        <div>
          <h4 className="font-[600] mb-4">{t('footer.quickLink')}</h4>
          <p className="text-[13px] text-slate-300 mb-2">{t('footer.privacyPolicy')}</p>
          <p className="text-[13px] text-slate-300 mb-2">{t('footer.termsOfUse')}</p>
          <p className="text-[13px] text-slate-300 mb-2">{t('footer.faq')}</p>
          <Link to="/contact" className="block text-[13px] text-slate-300 hover:text-white">
            {t('footer.contact')}
          </Link>
        </div>

        <div>
          <h4 className="font-[600] mb-4">{t('footer.social')}</h4>
          <div className="flex gap-3">
            <Facebook className="w-4 h-4" />
            <Twitter className="w-4 h-4" />
            <Instagram className="w-4 h-4" />
            <Linkedin className="w-4 h-4" />
          </div>
        </div>
      </div>
      <div className="text-center text-[13px] text-slate-500 py-4 border-t border-slate-800">
        {t('footer.copyright')}
      </div>
    </footer>
  );
};

export default Footer;