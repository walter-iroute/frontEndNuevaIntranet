import parse from 'html-react-parser';
import DOMPurify from 'isomorphic-dompurify';
import { ReactNode } from 'react';


export const sanitizerHTML = (html:string):ReactNode =>{
  if (!html || typeof html !== 'string') return '';
  const sanitizedHtml = DOMPurify.sanitize(html);
  return parse(sanitizedHtml);
}
