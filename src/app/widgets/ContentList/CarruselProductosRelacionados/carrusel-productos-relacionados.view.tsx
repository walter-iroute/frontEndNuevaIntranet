import { CardItemModel, CardsListViewProps, ContentListEntity } from '@progress/sitefinity-nextjs-sdk/widgets'
import React from 'react'

export function CarruselProductoRelacionadosView(props: CardsListViewProps<ContentListEntity>) {
    const items = [...props.items].reverse(); 

    const contentListAttributes = props.attributes;
    const classAttributeName = contentListAttributes['class'] ? 'class' : 'className';
    contentListAttributes[classAttributeName] += ' row row-cols-1 row-cols-md-3';
    contentListAttributes[classAttributeName] = contentListAttributes[classAttributeName].trim();

    (items)
    return (
        <div {...contentListAttributes} className='flex justify-center'>
            <div className='flex w-full justify-center'>
                {items.map((item, index) => (
                    <Card key={index} item={item} />
                ))}
            </div>
        </div>
    )
}

// Exportar el componente para su uso
interface CardProps {
    item: CardItemModel;
    isActive?: boolean;
}

const Card = ({ 
    item, 
    isActive = false, 
}: CardProps) => {
    const Orig = item.Original;
    const titulo = Orig.Title; 
    let imageUrl = item.Original.image[0].Url;

    return (
        <div 
            className={`
                flex p-2 flex-col items-center justify-center h-[96px] 2xl:px-6! 2xl:py-[15px]! 2xl:flex-row 2xl:gap-4 cursor-pointer border-b-2 border-white hover:!border-[#CB801B] 2xl:h-[74px]
                ${isActive ? '!border-[#CB801B]' : ''}
            `}
        >
            <div 
                className="w-9 h-9 min-w-9 flex items-center justify-center backenground_class_icon"
                style={{
                    background: `linear-gradient(0deg, #538F61, #538F61)`,
                    maskImage: imageUrl ? `url(${imageUrl})` : 'none',
                    WebkitMaskImage: imageUrl ? `url(${imageUrl})` : 'none',
                    maskSize: '100% 100%',
                    maskPosition: 'center',
                    maskRepeat: 'no-repeat',
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}                     
            >
                {/* Fallback si no hay imagen */}
            </div>
            
            <div className='!w-[100px]'>
                <p 
                    className={`text-[14px] 2xl:text-base text-center lg:text-start text-[#474747] m-0 ${isActive ? 'font-bold' : 'font-normal'}`} 
                    style={{fontFamily: 'Duplet'}}
                >
                    {titulo || 'Sin título'}
                </p>
            </div>
        </div>
    );
};