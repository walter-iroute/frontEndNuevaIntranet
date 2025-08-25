import '../list-with-procesos/list-with-procesos.css';

export function ListWithProcesosView(dto: any) {
    if (!dto || !dto.Item || !dto.Img) {
        return null;
    }

    return (
        <a href={`/detalle-noticia?id=${dto.Item.Id}`} className='text-decoration-none procesos' rel="noopener noreferrer" >
            <div className="procesos">
                <img
                    className="img-procesos"
                    src={dto.Img}
                    alt={dto.AlternativeText}
                    title={dto.TitleImage}
                />
                < div className="card-body text-center">
                    < p className="card-title text-procesos" title={dto.Item.Title}> {dto.Item.Title} </p>
                    < p className="card-title content-procesos" title={dto.Item.Content}> {dto.Item.Content} </p>
                </div>
            </div>
        </a>
    );
}