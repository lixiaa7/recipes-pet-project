import {Helmet} from "react-helmet-async";

type PageTitleProps = {
    title?: string;
};

export const PageTitle = ({title}: PageTitleProps) => {
    return (
        <Helmet>
            <title>{title}</title>
        </Helmet>
    );
}
