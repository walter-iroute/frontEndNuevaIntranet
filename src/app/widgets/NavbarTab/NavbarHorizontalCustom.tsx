'use client';
import { getClass } from '@progress/sitefinity-nextjs-sdk/widgets';
import { combineClassNames, htmlAttributes, WidgetContext } from '@progress/sitefinity-nextjs-sdk';
import { NavigationItem, RestClient } from '@progress/sitefinity-nextjs-sdk/rest-sdk';
import { NavigationExtendsEntity } from './navbarExtends.entity';
import { useEffect, useState } from 'react';
import { Tracer } from '@progress/sitefinity-nextjs-sdk/diagnostics/empty';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useCurrentUser } from '../../hooks/useCurrentUser';

export function NavbarHorizontalCustom(props: WidgetContext<NavigationExtendsEntity>) {
    const { ctx } = Tracer.traceWidget(props, true);
    const [navs, setNavs] = useState<any[]>([]);
    const attributes = htmlAttributes(props);
    const entity = props.model.Properties;

    const { user } = useCurrentUser();

    const validateLogin = user === null ? '' : user?.IsAuthenticated ? ` Cerrar sesión` : 'Iniciar sesión';
    const validateLinkLogin = user === null ? '' : user?.IsAuthenticated ? '/sitefinity/SignOut' : '/login';
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const navItems =
                    (await RestClient.getNavigation({
                        currentPage: props.requestContext.layout.Id,
                        levelsToInclude: entity.LevelsToInclude,
                        selectedPageId:
                            entity.SelectedPage &&
                            entity.SelectedPage.ItemIdsOrdered &&
                            entity.SelectedPage.ItemIdsOrdered.length > 0
                                ? entity.SelectedPage.ItemIdsOrdered[0]
                                : undefined,
                        selectedPages:
                            entity.CustomSelectedPages &&
                            entity.CustomSelectedPages.ItemIdsOrdered &&
                            entity.CustomSelectedPages.ItemIdsOrdered.length > 0
                                ? entity.CustomSelectedPages.ItemIdsOrdered
                                : undefined,
                        selectionMode: entity.SelectionMode,
                        showParentPage: entity.ShowParentPage,
                        culture: props.requestContext.culture,
                        traceContext: ctx,
                    })) || [];

                setNavs(navItems);
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };

        fetchItems();
    }, []);

    const renderRootLevelNode = (node: NavigationItem) => {
        if (node.ChildNodes && node.ChildNodes.length > 0) {
            return (
                <NavDropdown key={node.Key} title={node.Title} id={`navbar-dropdown-${node.Key}`}>
                    {node.ChildNodes.map((childNode) => (
                        <NavDropdown.Item key={childNode.Key} href={childNode.Url} target={childNode.LinkTarget}>
                            {childNode.Title}
                        </NavDropdown.Item>
                    ))}
                </NavDropdown>
            );
        }

        return (
            <Nav.Link
                key={node.Key}
                href={node.Url}
                target={node.LinkTarget}
                className={combineClassNames('dropdown-item', getClass(node))}
            >
                {node.Title}
            </Nav.Link>
        );
    };

    return (
        <Navbar expand='sm' {...attributes}>
            <Container fluid>
                <Navbar.Brand href='/inicio'>
                    <img src='/assets/bm_transparente.png' id='logo' alt='Bootstrap' />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='offcanvasNavbar-expand-sm' />
                <Navbar.Offcanvas
                    className=''
                    id='offcanvasNavbar-expand-sm'
                    aria-labelledby='offcanvasNavbarLabel-expand-sm'
                    placement='start'
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id='offcanvasNavbarLabel-expand-sm'></Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className='justify-content-center flex-grow-1 pe-3 align-items-center menu-container'>
                            {navs.map((node: NavigationItem) => renderRootLevelNode(node))}
                        </Nav>
                        <Form className='d-flex justify-content-end' style={{ width: '260px' }}>
                            <Button style={{ marginRight: '10px' }} className='btn-registro' href='/' type='submit'>
                                Team BM
                            </Button>
                            <Button
                                style={{ width: '131px', marginRight: '10px' }}
                                variant='tertiary'
                                href={`${validateLinkLogin}`}
                                type='button'
                            >
                                {validateLogin}
                            </Button>{' '}
                        </Form>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );
}