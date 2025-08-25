import '../list-with-recursos/list-with-recursos.css';

export function ListWithRecursosView(dto: any) {
    if (!dto || !dto.Item || !dto.Img) {
        return null;
    }

    return (
        <a href="" className='text-decoration-none' rel="noopener noreferrer">
            <div className='content-recursos'>
                <img
                    className="img-recursos"
                    src={dto.Img}
                    alt={dto.AlternativeText}
                    title={dto.TitleImage}
                />
                <div className='text-start'>
                    <p className='text-recursos m-0' title={dto.Item.Title}>{dto.Item.Title}</p>
                </div>
            </div>
        </a>
    );
}