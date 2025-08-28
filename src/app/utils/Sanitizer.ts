import parse from 'html-react-parser';
import DOMPurify from 'isomorphic-dompurify';
import { ReactNode } from 'react';


export const sanitizerHTML = (html:string):ReactNode =>{
  if (!html || typeof html !== 'string') return '';
  const sanitizedHtml = DOMPurify.sanitize(html);
  return parse(sanitizedHtml);
}


// Metodo que sirver para detectar los saltos en linea y convertirlos en <br/>
export const sanitizerHTMLSaltosLineas = (html: string): ReactNode => {
  if (!html || typeof html !== 'string') return '';

  const sanitizedHtml = DOMPurify.sanitize(html);

  // Caso 1: Si ya viene con etiquetas HTML, parseamos directo
  if (/<[a-z][\s\S]*>/i.test(sanitizedHtml)) {
    return parse(sanitizedHtml);
  }

  // Caso 2: Si es texto plano, convertimos saltos en <br/>
  const withLineBreaks = sanitizedHtml.replace(/\n/g, '<br/>');
  return parse(withLineBreaks);
};
