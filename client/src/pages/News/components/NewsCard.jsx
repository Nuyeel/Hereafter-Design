function NewsCard(props) {
    // const handleClick = () => {};
    return (
        <>
            <div className="ab-card-tag-wrap d-flex">
                <div className="ab-news-card">
                    <div className="ab-news-title">{props.card.topic}</div>
                    <div className="ab-news-img-wrap">
                        <img src={'images/news/' + props.card.img} alt="" />
                    </div>
                    <p className="ab-news-content">{props.card.content}</p>
                    <div className="ab-news-type">
                        <p>{props.card.type}</p>
                    </div>
                </div>
                <div className="ab-tag-wrap flex-wrap">
                    {props.card.tag.map((v, i) => {
                        return (
                            <>
                                <div
                                    className={'ab-news-tag ab-color' + (i % 3)}
                                >
                                    <p key={i}>#{v}</p>
                                </div>
                            </>
                        );
                    })}
                </div>
            </div>
        </>
    );
}
export default NewsCard;
