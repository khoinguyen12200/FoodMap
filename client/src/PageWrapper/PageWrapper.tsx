import { motion } from "framer-motion";
import React from "react";
import { actions, useAppDispatch } from "../redux";

type Props = {
    children: React.ReactNode;
    isEmpty?: boolean;
};

function PageWrapper({ children, isEmpty }: Props): React.ReactElement {
    const dispatch = useAppDispatch();
    React.useEffect(() => {
        if (isEmpty !== undefined) {
            dispatch(actions.pageSetting.setEmpty(isEmpty));
        } else {
            dispatch(actions.pageSetting.setEmpty(false));
        }
    }, [isEmpty]);
    return (
        <motion.div
            initial={{ y:-50 }}
            animate={{ y:0 }}
            exit={{y:50 }}
        >
            {children}
        </motion.div>
    );
}

export default PageWrapper;
