'use client';
import { htmlAttributes, WidgetContext } from "@progress/sitefinity-nextjs-sdk";
import React, { useEffect, useState, useRef } from "react";
import { ModalEntity } from "./modal.entity";
import { Button, Modal } from 'react-bootstrap';
import "./modal.css";

export function ModalWidget(props: WidgetContext<ModalEntity>) {
    let dataAttributes = htmlAttributes(props);
    const [images, setImages] = useState<any[]>([]);
    const [show, setShow] = useState(false);
    const hasInitialized = useRef(false);

    const handleClose = () => setShow(false);

    const link = props.model?.Properties.link.href;
    const content = props.model.Properties.Content;
    const btnCloseText = props.model.Properties.BtnCancelText;
    const btnActionText = props.model.Properties.BtnActionText;
    const secondaryBtn = props.model.Properties.SecondaryBtn;

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

    return (
        <>
            <div
                className="modal show"
                style={{ display: 'block', position: 'initial'}}
                {...dataAttributes}
            >
                <Modal 
                    show={show} 
                    onHide={handleClose} 
                    animation={false} 
                    dialogClassName="custom-modal-dialog" 
                    contentClassName="custom-modal-content"
                >
                    <Modal.Header className="border-0">
                        <img 
                            src={images[0]?.Url} 
                            alt="Bootstrap" 
                            style={{ width: "100%", height:"539px" }} 
                        />
                        <button type="button" onClick={handleClose}>
                            <img 
                                src="/assets/btn_modal.png" 
                                alt="Bootstrap"
                                style={{ position: "absolute", top: "20px", right: "20px" }} 
                            />
                        </button>
                    </Modal.Header>
                    <Modal.Body className="border-0 text-center" style={{marginTop:"-30px"}}>
                        <Button 
                            variant="secondary" 
                            style={{ display: secondaryBtn ? "block" : "none" }} 
                            onClick={handleClose}
                        >
                            {btnCloseText}
                        </Button>
                        <Button 
                            href={link} 
                            variant="primary"
                            className="custom-modal-btn-call-to-action"  
                            onClick={handleClose}
                        >
                            {btnActionText}
                        </Button>
                    </Modal.Body>
                    <Modal.Footer className="border-0 justify-content-center" style={{marginTop:"-15px"}}>
                        <p className="custom-modal-content_text">
                            {content}
                        </p>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    );
}