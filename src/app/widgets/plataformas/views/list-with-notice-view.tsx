
export function ListWithNoticeView(dto: any) {
    if (!dto || !dto.Item || !dto.Img) {
        return null; 
    }

    function limitText(text: string, limit: number) {
        return text.length > limit ? text.substring(0, limit) + "..." : text;
    };

    return (
        <a href={`/detalle-noticia?id=${dto.Item.Id}`} className='text-decoration-none' rel="noopener noreferrer">
            <div className={dto.CardMode ? 'card mb-5' : ''} style={{ height: "300px" }}>
                <img
                    src={dto.Img}
                    alt={dto.AlternativeText}
                    title={dto.TitleImage}
                    style={{ backgroundColor: "#EDEDEE", objectFit: "fill", height: "200px", borderTopRightRadius: "5px", borderTopLeftRadius: "5px" }}
                />
                <div className={dto.CardMode ? 'card-body text-start' : 'text-start'}>
                    <span className="badge badge-danger mb-2" style={{ backgroundColor: dto.Item.TagColor, fontWeight: 500 }}>{dto.Item.Tag}</span>
                    <p className={dto.CardMode ? 'card-title' : ''} title={dto.Item.Title} style={{ color: "#474747", fontWeight: 500 }}>{limitText(dto.Item.Title, 70)}</p>
                </div>
            </div>
        </a>
    );
}