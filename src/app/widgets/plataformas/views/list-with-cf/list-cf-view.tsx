import '../list-with-cf/list-with-cf.css';

export function ListWithCFView(dto: any) {
    if (!dto || !dto.Item || !dto.Img) {
        return null;
    }

    function limitText(text: string, limit: number) {
        return text.length > limit ? text.substring(0, limit) + "..." : text;
    };

    return (
        <div className="text-center card content-cf">
            <img className="img-cf"
                src={dto.Img}
                alt={dto.AlternativeText}
                title={dto.TitleImage}
            />
            <hr className="hr-cf" />
            <div className="card-body text-justify">
                <p className="card-title text-cf">{limitText(dto.Item.Content, 280)}</p>
            </div>
        </div>
    );
}