'use client';
import { htmlAttributes, WidgetContext } from "@progress/sitefinity-nextjs-sdk";
import { TabsEntity } from "./tabs-section.entity";
import React from "react";
import { Tab, Nav } from "react-bootstrap";

export function Tabs(props: WidgetContext<TabsEntity>) {
    const dataAttributes = htmlAttributes(props);

    return (
        <>
            <h1 {...dataAttributes}>{props.model.Properties.Content}</h1>
            <Tab.Container id="left-tabs-example" defaultActiveKey={props.model?.Properties.Title?.Tabs[0].Key} {...dataAttributes}>
                <Nav variant="pills" className="justify-content-center">
                    {props.model?.Properties.Title?.Tabs.map((item, i) => {
                        return (
                            <Nav.Item id={`nav_${item.Key}`}>
                                <Nav.Link eventKey={`${item.Key}`} style={{ backgroundColor: '#295135', color: "#ffffff" }}>{item.Value}</Nav.Link>
                            </Nav.Item>
                        )
                    })}
                </Nav>
                <br></br>
                <Tab.Content>
                    {props.model?.Properties.Desc?.Tabs.map((item, i) => {
                        return (
                            <Tab.Pane eventKey={`${item.Key}`}>{item.Value}</Tab.Pane>
                        )
                    })}
                </Tab.Content>
            </Tab.Container>
        </>
    );
}