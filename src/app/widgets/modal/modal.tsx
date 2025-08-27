'use client';
import { htmlAttributes, WidgetContext } from "@progress/sitefinity-nextjs-sdk";
import React, { useEffect, useState, useRef } from "react";
import { ModalEntity } from "./modal.entity";
import "./modal.css";

export function ModalWidget(props: WidgetContext<ModalEntity>) {
    let dataAttributes = htmlAttributes(props);
    const [images, setImages] = useState<any[]>([]);
    const [show, setShow] = useState(false);
    const hasInitialized = useRef(false);

    const handleClose = () => setShow(false);

    const link = props.model?.Properties.link.href;
    const content = props.model.Properties.Content;
    const btnActionText = props.model.Properties.BtnActionText;

    const fetchContent = async () => {
        try {
            let imageIds = [];
            imageIds.push(props.model?.Properties.ImgModal?.ItemIdsOrdered || []);

            const imageRequests = imageIds.map((id: string) =>
                fetch(`/api/default/images(${id})/Default.GetItemWithFallback()?sf_culture=en&sf_provider=OpenAccessDataProvider&sf_fallback_prop_names=*&$select=*`)
                    .then((response) => response.json())
            );

            const imagesData = await Promise.all(imageRequests);
            setImages(imagesData);
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };

    useEffect(() => {
        const hasSeenModal = document.cookie.includes("modalShown=true");

        if (!hasSeenModal && !hasInitialized.current) {
            setShow(true);
            document.cookie = "modalShown=true; path=/";
            hasInitialized.current = true;
        }

        fetchContent();
    }, []);

    if (!show) return null;

    return (
        <div className="custom-modal-overlay" {...dataAttributes}>
            <div className="custom-modal-container">
                <button
                    className="custom-modal-close-btn"
                    onClick={handleClose}
                    aria-label="Cerrar modal"
                >
                    <svg width="8" height="8" viewBox="0 0 12 12" fill="none">
                        <path d="M11 1L1 11M1 1L11 11" stroke="white" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </button>

                <div className="custom-modal-content">
                    <div className="custom-modal-image-wrapper">
                        <img
                            src={images[0]?.Url}
                            alt="Modal content"
                            className="custom-modal-image"
                        />
                    </div>

                    <div className="custom-modal-body">
                        <a
                            href={link}
                            className="custom-modal-btn"
                            onClick={handleClose}
                        >
                            {btnActionText || "Ver más"}
                        </a>
                        <p className="custom-modal-text">
                            {content}
                        </p>

                    </div>


                </div>
            </div>
        </div>
    );
}