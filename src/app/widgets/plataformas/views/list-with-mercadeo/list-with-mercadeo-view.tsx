import '../list-with-mercadeo/list-with-mercadeo.css';

export function ListWithMercadeoView(dto: any) {
    if (!dto || !dto.Item || !dto.Img) {
        return null;
    }

    return (
        <a href="" className='text-decoration-none' rel="noopener noreferrer">
            <div className='content-mercadeo'>
                <img
                    className="img-mercadeo"
                    src={dto.Img}
                    alt={dto.AlternativeText}
                    title={dto.TitleImage}
                />
                <div className='text-start'>
                    <p className='text-mercadeo m-0' title={dto.Item.Title}>{dto.Item.Title}</p>
                </div>
            </div>
        </a>
    );
}