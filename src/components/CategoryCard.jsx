import { Card, Typography } from "antd";
import { PRODUCT, VARIANT, defaultImage } from "../constants";

const { Title, Paragraph } = Typography;
const { Meta } = Card;

const CategoryCard = ({
    id,
    imageUrl,
    name,
    handleCardSelect = () => { },
    type,
    customClass = [''],
    subText,
    variants = {},
    grossPrice,
    discription,
    bpCatalogNumber,
}) => {

    return (
        <Card
            key={id}
            className={`${type === VARIANT || type === PRODUCT || 'card'} ${[...customClass]}`}
            onClick={() => {
                if (type !== VARIANT) {
                    handleCardSelect(id);
                }
            }}
            cover={<img alt={name || variants?.itemDescription} src={imageUrl || defaultImage} />}
            hoverable
            type="inner"
        >
            {(type !== VARIANT && type !== PRODUCT) ? (<>
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
                {(type === VARIANT) ? <>
                    <span className="variant-catalog-number">{`#${bpCatalogNumber}`}</span>
                    <div className="variant-item-discription">
                        {variants.itemDescription}
                        <span>
                            {variants?.currency?.symbol}{grossPrice}
                        </span>
                    </div>
                </> : <Paragraph ellipsis={{
                    tooltip: name,
                    rows: 1,
                }} className={`variant-sale-description`}>
                    {name}
                </Paragraph>}
            </div>} description={<Paragraph ellipsis={{
                tooltip: discription,
                rows: 2,
            }} className={`variant-sale-description`}>
                {discription}
            </Paragraph>} />}
        </Card>
    );
};

export { CategoryCard };
