/**
 * Document Export Engine
 * Downloads document as .doc (Word), .txt, .md, .html or opens native print preview for .pdf export.
 * Controls export dropdown menu.
 */
import { Editor } from './editor.js';

export const Export = {
    init() {
        const dropdownBtn = document.getElementById('export-dropdown-btn');
        const dropdownMenu = document.getElementById('export-dropdown-menu');

        const docBtn = document.getElementById('export-doc-btn');
        const txtBtn = document.getElementById('export-txt-btn');
        const mdBtn = document.getElementById('export-md-btn');
        const htmlBtn = document.getElementById('export-html-btn');
        const pdfBtn = document.getElementById('export-pdf-btn');

        if (dropdownBtn && dropdownMenu) {
            dropdownBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                dropdownMenu.classList.toggle('open');
            });

            document.addEventListener('click', (e) => {
                if (!dropdownMenu.contains(e.target) && e.target !== dropdownBtn) {
                    dropdownMenu.classList.remove('open');
                }
            });
        }

        if (docBtn) docBtn.addEventListener('click', () => { Export.exportDoc(); dropdownMenu.classList.remove('open'); });
        if (txtBtn) txtBtn.addEventListener('click', () => { Export.exportTxt(); dropdownMenu.classList.remove('open'); });
        if (mdBtn) mdBtn.addEventListener('click', () => { Export.exportMarkdown(); dropdownMenu.classList.remove('open'); });
        if (htmlBtn) htmlBtn.addEventListener('click', () => { Export.exportHtml(); dropdownMenu.classList.remove('open'); });
        if (pdfBtn) pdfBtn.addEventListener('click', () => { Export.exportPdf(); dropdownMenu.classList.remove('open'); });
    },

    downloadFile(content, filename, mimeType) {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    },

    exportDoc() {
        const content = Editor.getContent();
        const wordDocument = `<html xmlns:o='urn:schemas-microsoft-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
        <head>
            <meta charset='utf-8'>
            <title>Manuscrito - LofiNotepad</title>
            <style>
                body { font-family: 'Calibri', 'Arial', sans-serif; font-size: 11pt; line-height: 1.5; color: #000; }
                h1 { font-size: 22pt; font-weight: bold; margin-bottom: 12pt; }
                h2 { font-size: 16pt; font-weight: bold; margin-top: 14pt; margin-bottom: 8pt; }
                h3 { font-size: 13pt; font-weight: bold; margin-top: 12pt; margin-bottom: 6pt; }
                p { margin-bottom: 10pt; }
                blockquote { border-left: 3px solid #888; padding-left: 10pt; color: #555; margin: 10pt 0; }
                img { max-width: 100%; height: auto; }
            </style>
        </head>
        <body>
            ${content}
        </body>
        </html>`;

        Export.downloadFile(wordDocument, 'manuscrito.doc', 'application/msword');
    },

    exportTxt() {
        const text = Editor.getTextContent();
        Export.downloadFile(text, 'manuscrito.txt', 'text/plain;charset=utf-8');
    },

    exportMarkdown() {
        let html = Editor.getContent();
        let md = html
            .replace(/<h1>(.*?)<\/h1>/gi, '# $1\n\n')
            .replace(/<h2>(.*?)<\/h2>/gi, '## $1\n\n')
            .replace(/<h3>(.*?)<\/h3>/gi, '### $1\n\n')
            .replace(/<b>(.*?)<\/b>/gi, '**$1**')
            .replace(/<strong>(.*?)<\/strong>/gi, '**$1**')
            .replace(/<i>(.*?)<\/i>/gi, '*$1*')
            .replace(/<em>(.*?)<\/em>/gi, '*$1*')
            .replace(/<u>(.*?)<\/u>/gi, '_$1_')
            .replace(/<p>(.*?)<\/p>/gi, '$1\n\n')
            .replace(/<br\s*[\/]?>/gi, '\n')
            .replace(/<li>(.*?)<\/li>/gi, '- $1\n')
            .replace(/<[^>]+>/g, '');

        Export.downloadFile(md.trim(), 'manuscrito.md', 'text/markdown;charset=utf-8');
    },

    exportHtml() {
        const content = Editor.getContent();
        const fullHtml = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Manuscrito - LofiNotepad</title>
    <style>
        body { font-family: sans-serif; line-height: 1.6; max-width: 800px; margin: 40px auto; padding: 20px; }
        img { max-width: 100%; height: auto; }
    </style>
</head>
<body>
${content}
</body>
</html>`;
        Export.downloadFile(fullHtml, 'manuscrito.html', 'text/html;charset=utf-8');
    },

    exportPdf() {
        window.print();
    }
};
