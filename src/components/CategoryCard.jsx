import { Card, Typography } from "antd";
import { VARIANT } from "./mainContent/content/ContentBody";
// import Title from "antd/es/skeleton/Title";

const { Title, Paragraph, Text } = Typography;
const { Meta } = Card;

const defaultImage = `https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.explicit.bing.net%2Fth%3Fid%3DOIP.JghoYNfLDAu_AH6xfpBYpQHaHa%26pid%3DApi&f=1&ipt=6bcb753956e563a3a67e9669fdea96a05a12edfb077f7faa6c0ac7f31992396f&ipo=images`;

export const CategoryCard = ({
    id,
    imageUrl,
    name,
    handleSelectedItem = () => { },
    type,
    customClass = [''],
    subText,
    callBack = () => { },
    drawerOpen,
    item,
    variants = {},
    grossPrice, saleDescription, bpCatalogNumber
}) => {

    return (
        <Card
            key={id}
            className={`${type === VARIANT || 'card'} ${[...customClass]}`}
            onClick={() => {
                if (type !== VARIANT) {
                    handleSelectedItem({ id, type, item });
                    !drawerOpen && callBack();
                }
            }}
            cover={<img alt={name || variants?.itemDescription} src={imageUrl || defaultImage} />}
            hoverable
            type="inner"
        >
            {(type !== VARIANT) ? (<>
                <Title
                    className={`card-name`}
                    level={5}
                    ellipsis={{
                        tooltip: name,
                    }}
                >
                    {name}
                </Title>
                {subText && <Paragraph ellipsis={{
                    tooltip: subText,
                    rows: 2,
                }} className={`card-sub-text`}>
                    {subText}
                </Paragraph>
                }
            </>) : <Meta title={<div className="meta-title-wrap">
                <span className="variant-catalog-number">{`#${bpCatalogNumber}`}</span>
                <div className="variant-item-discription">
                    {variants.itemDescription}
                    <span>
                        {variants?.currency?.symbol}{grossPrice}
                    </span>
                </div>
            </div>} description={<Paragraph ellipsis={{
                tooltip: saleDescription,
                rows: 2,
            }} className={`variant-sale-description`}>
                {saleDescription}
            </Paragraph>} />}
        </Card>
    );
};
