import '../list-with-noticias/list-with-noticias.css';

export function ListWithNoticiasView(dto: any) {
    if (!dto || !dto.Item || !dto.Img) {
        return null;
    }

    function limitText(text: string, limit: number) {
        return text.length > limit ? text.substring(0, limit) + "..." : text;
    };

    return (
        <a href={`/detalle-noticia?id=${dto.Item.Id}`
        } className='text-decoration-none' rel="noopener noreferrer" >
            <div className="card noticias">
                <img
                    className="img-noticias"
                    src={dto.Img}
                    alt={dto.AlternativeText}
                    title={dto.TitleImage}                    
                />
                < div className="card-body text-start">
                    <span className="badge badge-noticias mb-2"> {dto.Item.Tag} </span>
                    < p className="card-title text-noticias" title={dto.Item.Title}> {limitText(dto.Item.Title, 70)} </p>
                </div>
            </div>
        </a>
    );
}