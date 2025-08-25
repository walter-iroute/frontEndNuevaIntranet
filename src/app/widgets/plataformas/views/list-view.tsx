
export function ListView(dto: any) {
    if (!dto || !dto.Item || !dto.Img) {
        return null;
    }

    return (
        <a href="" className='text-decoration-none' rel="noopener noreferrer">
            <div className='mb-3' style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <img
                    className="card-img-top"
                    src={dto.Img}
                    alt={dto.AlternativeText}
                    title={dto.TitleImage}
                    style={{ objectFit: "fill", width: "2rem", height: "2rem", marginRight: "10px" }}
                />
                <div className='text-start'>
                    <p className='card-title' title={dto.Item.Title} style={{ color: "#474747", fontWeight: 400, fontSize: "1.5rem" }}>{dto.Item.Title}</p>
                </div>
            </div>
        </a>
    );
}