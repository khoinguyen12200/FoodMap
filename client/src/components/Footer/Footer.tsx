import { motion } from "framer-motion";
import React from "react";
import { useAppSelector } from "../../redux";
import "./Footer.scss";
type Props = {};

const Footer = (props: Props) => {
    const isEmpty = useAppSelector((state) => state.pageSetting.isEmpty);
    return (
        <motion.div
            animate={{ height: isEmpty ? 0 : "auto" }}
            transition={{ duration: 0.3 }}
            className="Footer"
        >
            <div className="content">
              
            </div>
        </motion.div>
    );
};

export default Footer;
