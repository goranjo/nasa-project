import {useLocation} from 'react-router-dom';
import * as Styled from "@/modules/BreadcrumbsModule/BreadCrumbsModule.styled.ts";
import React from "react";
import {MenuItem} from "primereact/menuitem";
import {BreadCrumb} from "primereact/breadcrumb";
// import {StyleSheetManager} from 'styled-components';
// import isPropValid from '@emotion/is-prop-valid';
interface BreadcrumbItem {
    label: string | null;
    url: string;
}

interface BreadcrumbsProps {
    custom_path?: BreadcrumbItem;
}

const transformToMenuItem = (breadcrumbItems: BreadcrumbItem[]): MenuItem[] => {
    return breadcrumbItems.map(({label, url}) => ({
        label: label !== null ? label : undefined,
        url,
    }));
};

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({custom_path}) => {
    const location = useLocation();
    const pathnames = location.pathname.split("/");
    const titles = pathnames
        .filter((pathname) => pathname)
        .map((pathname) =>
            pathname
                .split("-")
                .map((name) => name.charAt(0).toUpperCase() + name.slice(1))
                .join(" ")
        );

    const breadcrumbItems: BreadcrumbItem[] = [
        ...(custom_path ? [custom_path] : []),
        ...titles.map((pathname, index) => ({
            label: pathname,
            url: `/${pathnames.slice(1, index + 2).join("/")}`,
        })),
    ];

    const menuItems = transformToMenuItem(breadcrumbItems);

    return (
        <Styled.CustomBreadCrumbs>
            <BreadCrumb
                separatorIcon="/"
                model={menuItems}
                home={{label: "Home", url: "/", icon: ""}}
            />
        </Styled.CustomBreadCrumbs>
    );
};
export default Breadcrumbs;
