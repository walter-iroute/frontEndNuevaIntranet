'use client';
import React, { useEffect, useState } from 'react';
import { WidgetContext, htmlAttributes } from '@progress/sitefinity-nextjs-sdk';
import { VideoWidgetEntity } from './video.entity';

export function VideoWidget(props: WidgetContext<VideoWidgetEntity>) {
    const dataAttributes = htmlAttributes(props);
    const [videos, setVideos] = useState<any[]>([]);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const videoIds = props.model?.Properties?.FullDecoratorSelectedMedia?.ItemIdsOrdered || [];
                const videoRequests = videoIds.map((id: string) =>
                    fetch(`/api/default/videos(${id})/Default.GetItemWithFallback()?sf_culture=en&sf_provider=OpenAccessDataProvider&sf_fallback_prop_names=*&$select=*`)
                        .then((response) => response.json())
                );
                const data = await Promise.all(videoRequests);
                setVideos(data);
            } catch (error) {
                console.error('Error fetching videos:', error);
            }
        };
        fetchVideos();
    }, []);

    return (
        <>
            <div {...dataAttributes}>
                {videos.map((video, index) => {
                    const url = video.Url;

                    return (
                        <video id="video" key={video.Id} style={{ width: "100%", height: "100%" }} controls>
                            <source src={url} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    );
                })}
            </div>
        </>
    );
}
