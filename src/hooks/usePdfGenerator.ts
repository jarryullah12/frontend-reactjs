import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export function usePdfGenerator() {
  const downloadAsPdf = async (elementId: string, fileName: string = 'document.pdf') => {
    const element = document.getElementById(elementId);
    if (!element) {
      console.error('Element not found for PDF generation');
      return;
    }

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        width: element.offsetWidth,
        height: element.offsetHeight,
        onclone: (clonedDoc) => {
          const clonedElement = clonedDoc.getElementById(elementId);
          if (clonedElement) {
            clonedElement.style.animation = 'none';
            clonedElement.style.transition = 'none';
          }
        }
      });
      
      if (canvas.width === 0 || canvas.height === 0) {
        console.error('Canvas dimensions are 0. Cannot generate PDF.');
        return;
      }

      const imgData = canvas.toDataURL('image/png');
      
      // Use the canvas dimensions as the format to avoid cutting off content
      const customPdf = new jsPDF({
        orientation: canvas.width > canvas.height ? 'landscape' : 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height],
      });

      customPdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      customPdf.save(fileName);
    } catch (error) {
      console.error('Error generating PDF from element:', error);
    }
  };

  const downloadTextAsPdf = (text: string, fileName: string = 'document.pdf') => {
    if (!text) {
      console.error('No text provided for PDF generation');
      return;
    }

    try {
      const pdf = new jsPDF();
      const margin = 10;
      const pageHeight = pdf.internal.pageSize.height;
      const lineHeight = 7; // Approximate line height
      
      const splitText = pdf.splitTextToSize(text, 180);
      let y = margin;
      
      for (let i = 0; i < splitText.length; i++) {
        if (y + lineHeight > pageHeight - margin) {
          pdf.addPage();
          y = margin + lineHeight; // Add some margin at the top of the new page
        }
        pdf.text(splitText[i] || '', margin, y);
        y += lineHeight;
      }
      
      pdf.save(fileName);
    } catch (error) {
      console.error('Error generating PDF from text:', error);
    }
  };

  return { downloadAsPdf, downloadTextAsPdf };
}
