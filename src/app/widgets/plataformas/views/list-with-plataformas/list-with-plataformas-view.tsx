import '../list-with-plataformas/list-with-plataformas.css';

export function ListWithPlataformasView(dto: any) {
    if (!dto || !dto.Item || !dto.Img) {
        return null;
    }

    return (
        <a href="" className='text-decoration-none' rel="noopener noreferrer">
            <div className='content-plataformas'>
                <img
                    className="img-plataformas"
                    src={dto.Img}
                    alt={dto.AlternativeText}
                    title={dto.TitleImage}
                />
                <div className='text-start'>
                    <p className='text-plataformas m-0' title={dto.Item.Title}>{dto.Item.Title}</p>
                </div>
            </div>
        </a>
    );
}
